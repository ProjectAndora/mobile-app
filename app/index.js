import { KeepAwake, registerRootComponent } from 'expo'
import { MainScreen } from './screens/main'

if (__DEV__) {
  KeepAwake.activate()
}

registerRootComponent(MainScreen)
