import React from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { Field } from './field'
import { Separator, SeparatorType } from './separator'
import { MiniBoardViewModel } from '../../../viewmodels/mini-board'
import { FieldViewModel } from '../../../viewmodels/field'

interface Props {
  viewModel: MiniBoardViewModel
  style?: StyleProp<ViewStyle>
}

const renderRow = (fieldsViewModels: FieldViewModel[]) => (
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

export const MiniBoard = (props: Props) => (
  <View style={props.style}>
    {/* <Field value={props.data.row} style={styles.backgroundField} /> */}
    {props.viewModel.fieldsViewModels.map((rowFieldsViewModels, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <Separator type={SeparatorType.Horizontal} />
        )}
        {renderRow(rowFieldsViewModels)}
      </React.Fragment>
    ))}
  </View>
)

const styles = StyleSheet.create({
  backgroundField: {
    ...StyleSheet.absoluteFillObject,
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
