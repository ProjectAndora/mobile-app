import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  ImageRequireSource,
} from 'react-native'
import { Subscription } from 'rxjs'
import { FieldValue } from '../../../support/entities'
import { FieldViewModel } from '../../../view-models/field'

interface Props {
  viewModel: FieldViewModel
  style?: StyleProp<ViewStyle>
}

interface State {
  value: FieldValue
}

export class Field extends React.Component<Props, State> {
  private valueSub?: Subscription

  constructor(props: Props) {
    super(props)

    this.state = {
      value: FieldValue.Empty,
    }
  }

  componentDidMount() {
    this.valueSub = this.props.viewModel.value$.subscribe(value => this.setState({ value }))
  }

  componentWillUnmount() {
    this.valueSub && this.valueSub.unsubscribe()
  }

  render() {
    let image: ImageRequireSource | null = null
    const { value } = this.state
    if (value === FieldValue.Cross) {
      image = require('../../../../assets/cross.png')
    } else if (value === FieldValue.Nought) {
      image = require('../../../../assets/nought.png')
    }

    return image !== null
      ? (
        <View style={this.props.style}>
          <Image
            source={image}
            resizeMode='cover'
            fadeDuration={0}
            style={styles.image}
          />
        </View>
      )
      : (
        <TouchableHighlight
          underlayColor='grey'
          onPress={this.props.viewModel.onPress}
          style={this.props.style}
        >
          <View style={styles.placeholder} />
        </TouchableHighlight>
      )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    margin: 5,
  },
  placeholder: {
    flex: 1,
  },
})
