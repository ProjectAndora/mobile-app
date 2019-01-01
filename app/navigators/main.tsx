import { createStackNavigator } from 'react-navigation'
import { MainScreen, GameBoardScreen } from '../screens'

export const MainNavigator = createStackNavigator({
  main: MainScreen,
  gameBoard: GameBoardScreen,
})
