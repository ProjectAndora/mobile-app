import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Hello',
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text>Hello there</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
