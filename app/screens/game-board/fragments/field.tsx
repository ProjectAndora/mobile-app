import React from 'react'
import { StyleSheet, View, Image, StyleProp, ViewStyle, ImageRequireSource } from 'react-native'
import { FieldValue } from '../../../support/entities'

interface Props {
  value: FieldValue
  style?: StyleProp<ViewStyle>
}

export const Field = (props: Props) => {
  const { value, style } = props

  let image: ImageRequireSource | null = null
  if (value === FieldValue.Cross) {
    image = require('../../../../assets/cross.png')
  } else if (value === FieldValue.Nought) {
    image = require('../../../../assets/nought.png')
  }

  return (
    <View style={style}>
      {image !== null && (
        <Image
          source={image}
          resizeMode='cover'
          style={[styles.image]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 'auto',
    height: 'auto',
  },
})
