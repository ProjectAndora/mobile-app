import { KeepAwake, registerRootComponent } from 'expo'
import { createAppContainer } from 'react-navigation'
import { MainNavigator } from './navigators/main'

if (__DEV__) {
  KeepAwake.activate()
}

registerRootComponent(createAppContainer(MainNavigator))
