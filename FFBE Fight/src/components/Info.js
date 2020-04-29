
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { alertMessage, sagaStart, modifyCurTurn } from '../actions/globalActions'
import styled from 'styled-components'
import shortid from 'shortid'


var Space = styled.div`
width:800px;
height:250px;
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:flex-start;
outline:1px solid black;
`
var ActionsBox = styled.div`
width:800px;
height:220px;
outline:1px solid black;
`
var HeadingBox = styled.div`
width:100%;
text-align:center;
height:30px;
outline:1px solid black;
font-size:24px;

`
function findMove(data, moveid) {
  if (data) {
    let moves = [];
    let move = data.map((val, idx) => {
      if (val.uid == moveid) {
        moves.push(val.name);
      }
      else {
        return
      }
    })
    return moves;
  }

  else return null;

}

function CalcTurnData(data, turnnum) {
  let moveData = [];
  if (data) {

    data.cond.forEach(element => {
      if (element.trigger.type == 'turn') {

        let curMoveData = [];

        for (let i = 0; i < element.moves.length; i++) {
          if (element.moves.length == 1) {
            curMoveData.push(findMove(data.moves, element.moves[i].uid));
          }
          else {
            curMoveData.push(findMove(data.moves, element.moves[i].uid) + ", ");
          }

        }
        moveData.push(<p key={shortid.generate()}>Turn Condition: {(curMoveData)}</p>)
      }
    });
    // return data.cond.map((val, idx) => {
    //   if (val.trigger.type == 'turn') {
    //     val.moves.forEach(element => {
    //       moveData.push(findMove(data.moves, element.uid))
    //     });
    return moveData;
    //   }
    // })

  }

  else return null;



}


function App(props) {

  return (
    <Space>
      <HeadingBox>Actions Turn {props.turnNum}</HeadingBox>
      <ActionsBox>{CalcTurnData(props.selBoss, props.turnNum)}</ActionsBox>
    </Space>
  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  turnNum: state.globalReducer.turnNum,
  bossData: state.globalReducer.curWaveData,
  selBoss: state.globalReducer.curMob
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({

});

export default connect(
  mapState,
  mapDispatch
)(App);



