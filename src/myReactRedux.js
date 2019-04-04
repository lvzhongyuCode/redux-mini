import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './myredux';

const connect = (mapStateToPorps,mapDispatchToProps) => (WrapComponent) => {
  return class ConnectComponent extends Component{
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { store } = this.context
      store.subscribe(this.update.bind(this))
      this.update()
    }
    update() {
      const {store} = this.context
      const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
      const stateProps = mapStateToPorps(store.getState())
      this.setState({
        props: {
          ...dispatchProps,
          ...this.state.props,
          ...stateProps
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

class Provider extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  constructor(props, context) {
    super(props,context)
    this.store = props.store
  }
  getChildContext() {
    return {store: this.store}
  }
  render() {
    return this.props.children
  }
}
export { Provider, connect }