import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export class MainScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: 'Hello',
  }

  private onStartPress = () => {
    this.props.navigation.navigate('gameBoard')
  }

  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress={this.onStartPress}>
          <Text style={styles.start}>Start</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    fontSize: 30,
    color: 'green',
  },
})
