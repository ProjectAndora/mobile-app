import { AppRegistry } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { MainNavigator } from 'app/navigators'

AppRegistry.registerComponent('App', () => createAppContainer(MainNavigator))
