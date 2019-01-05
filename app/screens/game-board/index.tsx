import React from 'react'
import { Subscription } from 'rxjs'
import { View, Text, StyleSheet } from 'react-native'
import { MiniBoard } from './fragments/mini-board'
import { Separator, SeparatorType } from './fragments/separator'
import { BoardViewModel } from '../../view-models/board'
import { MiniBoardViewModel } from '../../view-models/mini-board'
import { FieldValue } from '../../support/entities'

interface Props {
}

interface State {
  viewModel: BoardViewModel
  turn: FieldValue
}

export class GameBoardScreen extends React.Component<Props, State> {
  private turnSub?: Subscription

  constructor(props: Props) {
    super(props)

    this.state = {
      viewModel: new BoardViewModel(),
      turn: FieldValue.Cross,
    }
  }

  componentDidMount() {
    this.turnSub = this.state.viewModel.turn$.subscribe(turn => this.setState({ turn }))
  }

  componentWillUnmount() {
    this.turnSub && this.turnSub.unsubscribe()
  }

  private renderRow = (viewModels: MiniBoardViewModel[]) => (
    <View style={styles.row}>
      {viewModels.map((viewModel, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Separator type={SeparatorType.Vertical} />      
          )}
          <MiniBoard viewModel={viewModel} style={styles.miniBoard} />
        </React.Fragment>
      ))}
    </View>
  )

  render() {
    const { viewModel, turn } = this.state

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>It's {turn === FieldValue.Cross ? 'X' : 'O'}'s turn</Text>
        <View style={styles.board}>
          <Separator type={SeparatorType.Horizontal} />
          {viewModel.miniBoardsViewModels.map((miniBoardsViewModelsRow, index) => (
            <React.Fragment key={index}>
              {this.renderRow(miniBoardsViewModelsRow)}
              <Separator type={SeparatorType.Horizontal} />
            </React.Fragment>
          ))}
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
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  board: {
    marginTop: 20,
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
