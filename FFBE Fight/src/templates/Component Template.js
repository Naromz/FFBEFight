import React, { Component } from './node_modules/react';
import './App.css';
import { connect } from './node_modules/react-redux';
import { alertMessage, sagaStart } from './Actions/globalActions'

class App extends Component {
  constructor(props) {
    super(props);
    var message;
  }
  render() {
    return (
      <div className="App">
        <h1 onClick={() => this.props.alertMessage(this.props.message)}> Click Default Alert Action</h1>
        <h1 onClick={() => this.props.sagaStart()}> Click Default Saga Action</h1>
        <h1>Result: {this.props.result} </h1>
      </div>
    );
  }
}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  alertMessage: (val) => dispatch(alertMessage(val)),
  sagaStart: () => dispatch(sagaStart())

});

export default connect(
  mapState,
  mapDispatch
)(App);
