
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { modifyCurTurn } from '../actions/globalActions'


var MoveBoxCont = styled.div`
width:28px;
height:28px;
outline:1px solid black;
display:flex;
flex-flow:row;
justify-content:center;
align-items:center;

`
var MovesCont = styled.div`
width:800px;
height:48px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;

`

var MoveImg = styled.img`
width:24px;
height:24px;
`

var UnitData = styled.div`
width:800px;
height:128px;
border-radius:6px;
border:1px solid black;
background-color:lightgray;
display:flex;
flex-wrap:wrap;
flex-direction:column;
`
var UnitImageCont = styled.div`
width:150px;
height:100%;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:center;
align-items:center;
`
var UnitStuffCont = styled.div`
width:650px;
height:100%;
display:flex;
flex-flow:wrap;
outline:1px solid black;
`
var FullRow = styled.div`
width:100%;
height:35px;
outline:1px solid black;

display:flex;
flex-flow:wrap;
outline:1px solid black;
`
var NameBox = styled.div`
width:150px;
height:35px;
outline:1px solid black;
font-size:18px;
text-align:center;
vertical-align:middle;
align-items:center;
justify-content:center;
display:flex;
`
var StatBox = styled.div`
width:100px;
height:35px;
outline:1px solid black;
font-size:18px;
text-align:center;
vertical-align:middle;
align-items:center;
justify-content:center;
display:flex;
`

function findUnitData(data, pos) {

  let found;
  for (let i = 0; i < data.length; i++) {
    if (data[i].selected == pos) {
      found = data[i].unitData;
    }
  }
  return found;
}

function findUnitMoves(data, pos) {
  console.log(data);
  let found;
  for (let i = 0; i < data.length; i++) {
    if (data[i].spot == pos) {
      if (data[i].data.length == 1) {
        found = data[i].data[0].name;
      }
      else {
        found = data[i].data.map((val) => { return val.name + "  : " });
      }
    }
  }
  return found;
}
function GetUnitMoves({ unitData, setMoveData, }) {



  if (unitData) {

    return unitData.map((val, idx) =>
      <MoveBoxCont onClick={() => setMoveData(val)} key={idx}>
        <MoveImg key={idx} src={require(`../resources/images/Moves/${val.icon}`)} />
      </MoveBoxCont>);
  }
};

function App(props) {

  var [multicast, setMulticast] = useState(false);

  useEffect(() => {

  }, [])
  return (
    <UnitData>
      <UnitImageCont>{findUnitData(props.unitData, props.selUnit) && <img src={require(`../resources/images/Units/${findUnitData(props.unitData, props.selUnit).fullimg}.png`)}></img>} </UnitImageCont>
      <UnitStuffCont>
        <FullRow ><NameBox>{findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).name}</NameBox>
          <StatBox>HP {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats[0].maxStats.hp}</StatBox>
          <StatBox>ATK {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats[0].maxStats.atk}</StatBox>
          <StatBox>DEF {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats[0].maxStats.def}</StatBox>
          <StatBox>SPR {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats[0].maxStats.spr}</StatBox>
          <StatBox>MAG {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats[0].maxStats.mag}</StatBox>
        </FullRow>
        <MovesCont>{findUnitMoves(props.curTurn, props.selUnit) && findUnitMoves(props.curTurn, props.selUnit)} </MovesCont>
        <MovesCont>{findUnitData(props.unitData, props.selUnit) && <GetUnitMoves setMoveData={(val) => props.modifyCurTurn(props.selUnit, val)} unitData={findUnitData(props.unitData, props.selUnit).moves} />}</MovesCont>
      </UnitStuffCont>
    </UnitData>
  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  unitData: state.globalReducer.selUnitData,
  selUnit: state.globalReducer.selunitplace,
  curTurn: state.globalReducer.curTurn,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  modifyCurTurn: (spot, data) => dispatch(modifyCurTurn(spot, data)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



