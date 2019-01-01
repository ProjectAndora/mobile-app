import React from 'react'
import { View, StyleSheet } from 'react-native'

export class GameBoardScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.board}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  board: {
    aspectRatio: 1,
  },
})
