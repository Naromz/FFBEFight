
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { nextTurn } from '../actions/globalActions'
import history from '../history';
import Actions from './Actions'
import Conditions from './Conditions'
import FightControls from './FightControls'
import { parseMoves, parseConditions } from '../Services/loadData';



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
var HoverDisp = styled.div`
display: ${props => props.test};
position: fixed; 
z-index: 1;
left: 0;
top: 0;
width: 100%; 
height: 100%;
overflow: auto; 
background-color: rgb(0,0,0); 
background-color: rgba(0,0,0,0.4); 
justify-content:center;
align-items:center;
`


function ManagementBox(props) {
  var [showProp, setShowProp] = useState('none')
  var [selScreen, setSelScreen] = useState('actions');
  return (

    <ManagementCont>
      <HoverDisp onClick={() => setShowProp('none')} test={showProp}>
        {selScreen == 'actions' && <Actions arr={parseMoves()} />}

        {selScreen == 'conditions' && <Conditions arr={parseConditions()} />}

        {selScreen == 'controls' && <FightControls />}

      </HoverDisp>
      <Btn onClick={() => props.nextTurn()}>Next Turn</Btn>
      <Btn onClick={() => { setShowProp('block'); setSelScreen('actions') }}>Team Actions</Btn>
      <Btn onClick={() => { setShowProp('block'); setSelScreen('conditions') }}>Conditions</Btn>
      <Btn onClick={() => { setShowProp('block'); setSelScreen('thresholds') }}>Thresholds</Btn>
      <Btn onClick={() => { setShowProp('block'); setSelScreen('controls') }}>Fight Controls</Btn>

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


