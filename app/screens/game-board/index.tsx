import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MiniBoard } from './fragments/mini-board'
import { Separator, SeparatorType } from './fragments/separator'
import { BoardViewModel } from '../../viewmodels/board'
import { MiniBoardViewModel } from '../../viewmodels/mini-board'

interface Props {
}

interface State {
  viewModel: BoardViewModel
}

export class GameBoardScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      viewModel: new BoardViewModel(),
    }
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
    const { viewModel } = this.state

    return (
      <View style={styles.screen}>
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
