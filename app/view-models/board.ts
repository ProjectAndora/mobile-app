import { Subject, Observable } from 'rxjs'
import { scan, startWith, publishReplay, refCount, map, distinctUntilChanged } from 'rxjs/operators'
import { MiniBoardViewModel } from './mini-board'
import { FieldValue, BoardState } from '../support/entities'
import { trice, replace, array3HasRow } from '../utils'

export class BoardViewModel {
  readonly miniBoardsViewModels: MiniBoardViewModel[][]
  readonly turn$: Observable<FieldValue>

  private readonly onFieldPress = new Subject<number[][]>()

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
      lastTurn: null,
      miniFieldsRows: trice(() => trice(() => FieldValue.Empty)),
      row: FieldValue.Empty,
    }

    const state$: Observable<BoardState> = this.onFieldPress.asObservable().pipe(
      scan((state: BoardState, [[y, x], [subY, subX]]: number[][]) => {
        const newValues = replace(
          state.values,
          y,
          replace(
            state.values[y],
            x,
            replace(
              state.values[y][x],
              subY,
              replace(
                state.values[y][x][subY],
                subX,
                state.turn,
              ),
            ),
          ),
        )

        let newMiniFieldsRows = state.miniFieldsRows
        if (state.miniFieldsRows[y][x] === FieldValue.Empty) {
          let newRowValue = FieldValue.Empty
          if (array3HasRow(newValues[y][x], FieldValue.Cross)) {
            newRowValue = FieldValue.Cross
          } else if (array3HasRow(newValues[y][x], FieldValue.Nought)) {
            newRowValue = FieldValue.Nought
          }

          if (newRowValue !== FieldValue.Empty) {
            newMiniFieldsRows = replace(state.miniFieldsRows, y, replace(state.miniFieldsRows[y], x, newRowValue))
          }
        }

        return {
          turn: state.turn === FieldValue.Cross ? FieldValue.Nought : FieldValue.Cross,
          values: newValues,
          lastTurn: [[y, x], [subY, subX]],
          miniFieldsRows: newMiniFieldsRows,
          row: state.row,
        }
      }, initialState),
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
          map(state => state.values[y][x]),
          publishReplay(1),
          refCount(),
        ),
        state$.pipe(
          map(({ lastTurn }) => lastTurn === null 
            ? true 
            : lastTurn[1][0] === y && lastTurn[1][1] === x
          ),
          distinctUntilChanged(),
          publishReplay(1),
          refCount(),
        ),
        state$.pipe(
          map(state => state.miniFieldsRows[y][x]),
          distinctUntilChanged(),
          publishReplay(1),
          refCount(),
        ),
        ([subY, subX]) => this.onFieldPress.next([[y, x], [subY, subX]]),
      ))
    )
  }
}
