import { FieldValue } from '../support/entities'
import { Observable } from 'rxjs'

export class FieldViewModel {
  constructor(
    public readonly value$: Observable<FieldValue>,
    public readonly onPress: () => void,
  ) {
  }
}
