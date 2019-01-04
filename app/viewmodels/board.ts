import { Subject, Observable } from 'rxjs'
import { scan, startWith, publishReplay, refCount, map } from 'rxjs/operators'
import { MiniBoardViewModel } from './mini-board'
import { FieldValue, BoardState } from '../support/entities'
import { trice, replace } from '../utils'

export class BoardViewModel {
  readonly miniBoardsViewModels: MiniBoardViewModel[][]
  readonly turn$: Observable<FieldValue>

  private readonly onFieldPress = new Subject<[number[], number[]]>()

  constructor() {
    const initialValues = trice(() =>
      trice(() => 
        trice(() => 
          trice(() => FieldValue.Empty)
        )
      )
    )

    const initialState: BoardState = {
      turn: FieldValue.Cross,
      values: initialValues,
    }

    const state$ = this.onFieldPress.asObservable().pipe(
      scan(({ turn, values }: BoardState, [[y, x], [subY, subX]]: [number[], number[]] ) => ({
        turn: turn === FieldValue.Cross ? FieldValue.Nought : FieldValue.Cross,
        values: replace(
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
                turn,
              ),
            ),
          ),
        )
      }), initialState),
      startWith(initialState),
      publishReplay(1),
      refCount(),
    )

    this.turn$ = state$.pipe(
      map(state => state.turn),
      publishReplay(1),
      refCount(),
    )

    this.miniBoardsViewModels = trice(y => 
      trice(x => new MiniBoardViewModel(
        state$.pipe(
          map(state => state.values),
          map(values => values[y][x]),
          publishReplay(1),
          refCount(),
        ),
        ([subY, subX]) => this.onFieldPress.next([[y, x], [subY, subX]]),
      ))
    )
  }
}
