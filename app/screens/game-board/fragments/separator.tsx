import React from 'react'
import { StyleSheet, View } from 'react-native'

export enum SeparatorType {
  Horizontal,
  Vertical,
}

interface Props {
  type: SeparatorType
}

export const Separator = (props: Props) => (
  <View
    style={[
      styles.separator,
      props.type === SeparatorType.Horizontal && styles.separatorHorizontal,
      props.type === SeparatorType.Vertical && styles.separatorVertical,
    ]}
  />
)

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'black',
  },
  separatorHorizontal: {
    height: 1,
  },
  separatorVertical: {
    width: 1,
  },
})
