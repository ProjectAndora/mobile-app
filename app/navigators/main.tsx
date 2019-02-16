import { createStackNavigator } from 'react-navigation'
import { MainScreen, GameBoardScreen } from 'app/screens'

export const MainNavigator = createStackNavigator({
  main: MainScreen,
  gameBoard: GameBoardScreen,
})
