import React from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { FieldValue, MiniBoardData } from '../../../support/entities'
import { Field } from './field'
import { Separator, SeparatorType } from './separator'

interface Props {
  data: MiniBoardData
  style?: StyleProp<ViewStyle>
}

const renderRow = (values: FieldValue[]) => (
  <View style={styles.row}>
    {values.map((value, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <Separator type={SeparatorType.Vertical} />
        )}
        <Field value={value} style={styles.field} />
      </React.Fragment>
    ))}
  </View>
)

export const MiniBoard = (props: Props) => (
  <View style={props.style}>
    <Field value={props.data.row} style={styles.backgroundField} />
    {props.data.fields.map((rowFields, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <Separator type={SeparatorType.Horizontal} />
        )}
        {renderRow(rowFields)}
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
    margin: 5,
  },
})
