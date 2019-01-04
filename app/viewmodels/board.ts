import { Subject, Observable } from 'rxjs'
import { scan, startWith, publishReplay, refCount, map } from 'rxjs/operators'
import { MiniBoardViewModel } from './mini-board'
import { FieldValue } from '../support/entities'
import { trice, replace } from '../utils'

export class BoardViewModel {
  readonly miniBoardsViewModels: MiniBoardViewModel[][]

  private readonly onFieldPress = new Subject<[number[], number[]]>()

  constructor() {
    const initialValues = trice(() =>
      trice(() => 
        trice(() => 
          trice(() => FieldValue.Empty)
        )
      )
    )

    const values$: Observable<number[][][][]> = this.onFieldPress.asObservable().pipe(
      scan((values, [[y, x], [subY, subX]]: [number[], number[]]) => replace(
        values,
        y,
        replace(
          values[y],
          x,
          replace(
            values[y][x],
            subY,
            replace(
              values[y][x][subY],
              subX,
              FieldValue.Cross,
            ),
          ),
        ),
      ), initialValues),
      startWith(initialValues),
      publishReplay(1),
      refCount(),
    )

    this.miniBoardsViewModels = trice(y => 
      trice(x => new MiniBoardViewModel(
        values$.pipe(
          map(values => values[y][x]),
          publishReplay(1),
          refCount(),
        ),
        ([subY, subX]) => this.onFieldPress.next([[y, x], [subY, subX]]),
      ))
    )
  }
}
