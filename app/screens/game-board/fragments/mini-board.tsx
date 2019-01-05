import React from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { Field } from './field'
import { Separator, SeparatorType } from './separator'
import { MiniBoardViewModel } from '../../../view-models/mini-board'
import { FieldViewModel } from '../../../view-models/field'
import { Binder, DisposeBag } from '../../../utils'

interface Props {
  viewModel: MiniBoardViewModel
  style?: StyleProp<ViewStyle>
}

interface State {
  active: boolean
}

export class MiniBoard extends React.Component<Props, State> {
  private readonly disposeBag = new DisposeBag()

  constructor(props: Props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  componentDidMount() {
    Binder(this)
      .bind('active', this.props.viewModel.active$)
      .disposeBy(this.disposeBag)
  }

  componentWillUnmount() {
    this.disposeBag.dispose()
  }

  private renderRow = (fieldsViewModels: FieldViewModel[]) => (
    <View style={styles.row}>
      {fieldsViewModels.map((viewModel, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Separator type={SeparatorType.Vertical} />
          )}
          <Field viewModel={viewModel} style={styles.field} />
        </React.Fragment>
      ))}
    </View>
  )

  render() {
    return (
      <View style={[ this.state.active && styles.activeContainer, this.props.style ]}>
        <View style={styles.innerContainer} pointerEvents={this.state.active ? 'auto' : 'none'}>
          <View pointerEvents='none' style={StyleSheet.absoluteFill}>
            <Field viewModel={this.props.viewModel.rowFieldViewModel} style={styles.rowField} />
          </View>
          {this.props.viewModel.fieldsViewModels.map((rowFieldsViewModels, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Separator type={SeparatorType.Horizontal} />
              )}
              {this.renderRow(rowFieldsViewModels)}
            </React.Fragment>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  activeContainer: {
    backgroundColor: 'green',
  },
  innerContainer: {
    flex: 1,
    margin: 10,
  },
  rowField: {
    flex: 1,
    opacity: 0.5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  field: {
    flex: 1,
  },
})
