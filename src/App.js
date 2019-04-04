import React, { Component } from 'react';
// import { connect } from './myReactRedux';
import { connect } from 'react-redux';
import {addGun, removeGun, addGunSync} from './myReducer';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          现在有机关枪{this.props.num}把
        </div>
        <button onClick={this.props.addGun}>加一把</button>  
        <button onClick={this.props.removeGun}>减一把</button> 
        <button onClick={this.props.addGunSync}>等会加一把</button>  
      </div>
    )
  }
}
App = connect(state => {
  return {num: state}
}, { addGun, removeGun, addGunSync })(App)

export default App;
