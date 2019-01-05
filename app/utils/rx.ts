import { Component } from 'react'
import { Subscription, Observable } from 'rxjs'

export class DisposeBag {
  private subscriptions: Subscription[] = []

  add(sub: Subscription) {
    this.subscriptions.push(sub)
  }

  addMany(subs: Subscription[]) {
    this.subscriptions = [...this.subscriptions, ...subs]
  }

  dispose() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
    this.subscriptions = []
  }
}

const bindRxState = <Props, State, Key extends keyof State>(
  component: Component<Props, State>,
  stateKey: Key,
  value$: Observable<State[Key]>,
) => value$.subscribe(value => component.setState({ [stateKey]: value } as any))

export const Binder = <Props, State>(component: Component<Props, State>, subs: Subscription[] = []) => ({
  bind: <Key extends keyof State>(key: Key, value$: Observable<State[Key]>) => 
    Binder(component, [...subs, bindRxState(component, key, value$)]),
  disposeBy: (disposeBag: DisposeBag) => disposeBag.addMany(subs),
})
