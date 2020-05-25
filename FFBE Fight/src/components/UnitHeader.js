
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { modifyCurTurn } from '../actions/globalActions'
import { UpdateActions } from '../Services/loadData'
import { serverAddress } from '../sources'

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
width:790px;
height:48px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;

`

var MoveImg = styled.img`
width:36px;
height:36px;
`

var UnitData = styled.div`
width:1000px;
height:128px;
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
width:800px;
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
width:250px;
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
width:85px;
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
function GetUnitMoves({ unitData, setSelMove, setMoveData, uid }) {


  if (unitData) {

    return unitData.map((val, idx) =>

      <MoveBoxCont onMouseMove={() => setSelMove(val.name)} onClick={() => { setMoveData(val, uid); UpdateActions() }} key={idx}>
        <MoveImg key={idx} src={serverAddress() + `/images/type/move/name/${val.icon}`} />
      </MoveBoxCont>);
  }
};

function App(props) {

  var [multicast, setMulticast] = useState(false);
  var [selMove, setSelMove] = useState('');

  useEffect(() => {

  }, [])
  return (
    <UnitData>
      <UnitImageCont>{findUnitData(props.unitData, props.selUnit) && <img src={serverAddress() + `/images/type/unit/name/${findUnitData(props.unitData, props.selUnit).fullImg}`}></img>} </UnitImageCont>
      <UnitStuffCont>
        <FullRow ><NameBox>{findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).name}</NameBox>
          <StatBox>HP {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats.maxStats.hp}</StatBox>
          <StatBox>ATK {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats.maxStats.atk}</StatBox>
          <StatBox>DEF {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats.maxStats.def}</StatBox>
          <StatBox>SPR {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats.maxStats.spr}</StatBox>
          <StatBox>MAG {findUnitData(props.unitData, props.selUnit) && findUnitData(props.unitData, props.selUnit).stats.maxStats.mag}</StatBox>
        </FullRow>
        <MovesCont>{findUnitMoves(props.curTurn, props.selUnit) ? findUnitMoves(props.curTurn, props.selUnit) : selMove} </MovesCont>
        <MovesCont>{findUnitData(props.unitData, props.selUnit) && <GetUnitMoves setSelMove={(val) => setSelMove(val)} uid={findUnitData(props.unitData, props.selUnit).uuid} setMoveData={(val, uid) => props.modifyCurTurn(props.selUnit, val, uid)} unitData={findUnitData(props.unitData, props.selUnit).moves} />}</MovesCont>
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
  modifyCurTurn: (spot, data, uid) => dispatch(modifyCurTurn(spot, data, uid)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



