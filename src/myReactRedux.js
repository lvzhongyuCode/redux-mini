

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from './myredux';

export class Provider extends Component{
  constructor(props) {
    super(props)
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return this.props.children
  }
}

export const connect = (mapStateToProps, mapDispatchToProps) => (WrapComponent) => {
  return class ConnectComponent extends Component{
    constructor(props) {
      super(props)
      this.state = {
        props: {}
      }
    }
    componentDidMount(){
      const { store } = this.context
      this.update()
      store.subscribe(() => {this.update()})
    }
    update(){
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      let dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...dispatchProps,
          ...stateProps
        }
      })
    }
    static contextTypes = {
      store: PropTypes.object
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}