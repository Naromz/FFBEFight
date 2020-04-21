
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { alertMessage, sagaStart } from './actions/globalActions'
import styled from 'styled-components'

import history from './history';


var Box = styled.div`
width:200px;
height:200px;
outline:1px solid black;

`

function App(props) {

  return (
    <Box onClick={() => history.push('about')}>
      test
    </Box>
  );
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



