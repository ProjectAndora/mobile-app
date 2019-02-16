import { KeepAwake, registerRootComponent } from 'expo'
import { createAppContainer } from 'react-navigation'
import { MainNavigator } from 'app/navigators'

if (__DEV__) {
  KeepAwake.activate()
}

registerRootComponent(createAppContainer(MainNavigator))
