import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FieldValue, MiniBoardData, BoardData } from '../../support/entities'
import { MiniBoard } from './fragments/mini-board'
import { Separator, SeparatorType } from './fragments/separator'

export class GameBoardScreen extends React.Component {
  private trice = <T extends any> (makeValue: (index: number) => T) => {
    const values: T[] = []
    for (let i = 0; i < 3; i++) {
      values.push(makeValue(i))
    }

    return values
  }

  private randomFieldValue = () => {
    const intValue = Math.floor(Math.random() * 3)
    if (intValue === 0) {
      return FieldValue.Empty
    } else if (intValue === 1) {
      return FieldValue.Cross
    } else {
      return FieldValue.Nought
    }
  }

  private generateRandomMiniBoardData = () => {
    const data: MiniBoardData = {
      row: this.randomFieldValue(),
      fields: this.trice(
        () => this.trice(
          () => this.randomFieldValue()
        )
      ),
    }

    return data
  }

  private generateRandomBoardData = () => {
    const data: BoardData = {
      row: this.randomFieldValue(),
      miniBoards: this.trice(
        () => this.trice(
          () => this.generateRandomMiniBoardData()
        )
      ),
    }

    return data
  }

  private renderRow = (row: MiniBoardData[]) => (
    <View style={styles.row}>
      {row.map((miniBoard, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Separator type={SeparatorType.Vertical} />      
          )}
          <MiniBoard data={miniBoard} style={styles.miniBoard} />
        </React.Fragment>
      ))}
    </View>
  )

  private renderBoard = (data: BoardData) => (
    <View style={styles.board}>
      <Separator type={SeparatorType.Horizontal} />
      {data.miniBoards.map((miniBoardRow, index) => (
        <React.Fragment key={index}>
          {this.renderRow(miniBoardRow)}
          <Separator type={SeparatorType.Horizontal} />
        </React.Fragment>
      ))}
    </View>
  )

  render() {
    const boardData = this.generateRandomBoardData()

    return (
      <View style={styles.screen}>
        {this.renderBoard(boardData)}
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  miniBoard: {
    flex: 1,
    margin: 10,
  },
})
