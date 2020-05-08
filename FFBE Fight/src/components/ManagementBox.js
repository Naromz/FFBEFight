
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { nextTurn } from '../actions/globalActions'
import history from '../history';


var ManagementCont = styled.div`
width:800px;
height:35px;
background-color:lightgrey;
display:flex;
border: 1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:flex-start;
justify-content:flex-start;

`

var Btn = styled.div`
width:85px;
height:35px;
border:1px solid black;
align-items:center;
justify-content:center;
text-align:center;
display:flex;
`
var TurnBox = styled.div`
width:85px;
height:35px;
text-align:center;
font-size:18px;
display:flex;
align-items:center;
margin-left: auto;
`

function ManagementBox(props) {

  return (
    <ManagementCont>
      <Btn onClick={() => props.nextTurn()}>Next Turn</Btn>
      <Btn>Actions</Btn>
      <Btn>Conditions</Btn>
      <Btn>Thresholds</Btn>


      <TurnBox>Turn: {props.turnNum}</TurnBox>
    </ManagementCont>
  );
}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
  turnNum: state.globalReducer.turnNum,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  nextTurn: () => dispatch(nextTurn()),
});

export default connect(
  mapState,
  mapDispatch
)(ManagementBox);


