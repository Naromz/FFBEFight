
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

display:flex;
flex-direction:row;
justify-content:space-evenly;
align-items:center;
`
var HeadingBox = styled.div`
width:100%;
text-align:center;
height:30px;
outline:1px solid black;
font-size:24px;

`
var ActionList = styled.div`
width:25%;
height:100%;
outline:1px solid black;
`
var ActionDetails = styled.div`
width:70%;
height:100%;
outline:1px solid black;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`
var ActionDiv = styled.div`
width:100%;
height:22px;
outline:1px solid black;
color: ${props => props.color};
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
`
var ActionDetailHeading = styled.div`
outline:1px solid black;
width:100%;
background-color:white;
height:32px;
display:flex;
align-items:center;
justify-content:center;
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

function CalcTurnData(data, turnnum, selMove, setSelMove) {
  let moveData = [];


  if (data) {
    for (let move = 0; move < data.cond.length; move++) {
      let color = 'black';
      if (selMove == move) {
        console.log(selMove);
        color = 'red';
      }
      let element = data.cond[move];
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
        moveData.push(<ActionDiv onClick={() => setSelMove(move)} color={color} key={element.uid}>{(curMoveData)}</ActionDiv>)
      }
    }

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
  const [selMove, setSelMove] = useState(0);
  return (
    <Space>
      <HeadingBox>Actions Turn {props.turnNum}</HeadingBox>
      {/* <ActionsBox>{CalcTurnData(props.selBoss, props.turnNum)}</ActionsBox> */}
      <ActionsBox>
        <ActionList>
          {CalcTurnData(props.selBoss, props.turnNum, selMove, setSelMove)}
        </ActionList>
        <ActionDetails>
          <ActionDetailHeading>test</ActionDetailHeading>
        </ActionDetails>

      </ActionsBox>
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



