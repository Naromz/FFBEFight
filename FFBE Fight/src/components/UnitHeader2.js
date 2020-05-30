
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { modifyCurTurn, loadEquip } from '../actions/globalActions'
import { UpdateActions } from '../Services/loadData'
import { serverAddress } from '../sources'
import EquipWindow from './EquipWindow'
import MovesSelectionBox from './MovesSelectionBox'

var UnitHeader = styled.div`
width:100%;
height:300px;
border:2px solid black;
display:flex;
flex-wrap:wrap;
flex-direction:row;
background-color:lightgray;
`

var UnitBox = styled.div`
width:250px;
height:300px;
border:1px solid black;
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
`
var UnitBoxTitle = styled.div`
width:100%;
height:36px;
outline:1px solid black;
justify-self:flex-start;
background-color:'white';
text-align:center;
font-size:32px;
`

var UnitBoxImgCont = styled.div`
background-color:'white';
font-size:24px;
text-align:center;
border:1px solid black;
border-radius:25px;
width:180px;
height:200px;
display:flex;
align-items:center;
justify-content:center;
`

var UnitHeaderNavCont = styled.div`
width:64px;
height:100%;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
align-items:space-evenly;
justify-content:center;
`

var UnitHeaderContentCont = styled.div`
width:680px;
height:300px;
outline:1px solid black;

`
var UnitHeaderNavBtnCont = styled.div`
width:48px;
height:64px;
border:1px solid ${props => props.color};
background-color:${props => props.color};
border-radius:5px;
margin-top:5px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
flex-wrap:wrap;
`

var UnitHeaderNavBtn = styled.div`
width:46px;
height:62px;
background-color:darkgray;
border:1px solid ${props => props.color};
border-radius:5px;
display:flex;
flex-direction:row;
justify-content:center;
flex-wrap:wrap;
`
var UnitHeaderNavBtnImg = styled.img`
width:48px;
height:42px;

`
var UnitHeaderNavBtnTxtCont = styled.div`
width:48px;
height:20px;
text-align:center;
`


var UnitHeaderUnitBoxImg = styled.img`
height:60%;

`
function ReturnSelCont({ cont }) {
  if (cont === 'equip') {
    return (
      <EquipWindow></EquipWindow>
    )
  }
  if (cont === 'moves') {
    return (
      <MovesSelectionBox></MovesSelectionBox>
    )
  }
  return <> </>
}
function ReturnNavBtn({ name, setCont, cont }) {
  let color = 'black';
  if (cont == name) {
    color = "#3f51b5";
  }


  return (
    <UnitHeaderNavBtnCont color={color}>
      <UnitHeaderNavBtn color={color} onClick={() => setCont(name)}>
        <UnitHeaderNavBtnImg src={serverAddress() + `/images/type/misc/name/${name}`} />
        <UnitHeaderNavBtnTxtCont style={{ color: color }} >{name}</UnitHeaderNavBtnTxtCont>
      </UnitHeaderNavBtn>
    </UnitHeaderNavBtnCont>
  )
}

function App(props) {

  var [multicast, setMulticast] = useState(false);
  var [selMove, setSelMove] = useState('');
  var [cont, setCont] = useState('moves');

  useEffect(() => {

  }, [props.curTurn])
  //  onClick={() => console.log(props.unitData[props.selUnit].unitData)}

  if (props.unitData[props.selUnit]?.unitData) {
    return (
      <UnitHeader>
        <UnitBox> <UnitBoxTitle>{props.unitData[props.selUnit]?.unitData.name}</UnitBoxTitle><UnitBoxImgCont><UnitHeaderUnitBoxImg src={serverAddress() + `/images/type/unit/name/${props.unitData[props.selUnit]?.unitData.fullImg}`} /></UnitBoxImgCont></UnitBox>
        <UnitHeaderNavCont>
          <ReturnNavBtn name={'moves'} cont={cont} setCont={setCont} />
          <ReturnNavBtn name={'stats'} cont={cont} setCont={setCont} />
          <ReturnNavBtn name={'equip'} cont={cont} setCont={setCont} />
          <ReturnNavBtn name={'other'} cont={cont} setCont={setCont} />
        </UnitHeaderNavCont>
        <UnitHeaderContentCont>
          <ReturnSelCont cont={cont}></ReturnSelCont>
        </UnitHeaderContentCont>
      </UnitHeader >
    );


  }
  else {
    return (
      <UnitHeader>
        <h3>Please Select a Unit</h3>
      </UnitHeader>
    )

  }

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


// function GetUnitMoves({ unitData, setSelMove, setMoveData, uid }) {
//   if (unitData) {

//     return unitData.map((val, idx) =>

//       <MoveBoxCont onMouseMove={() => setSelMove(val.name)} onClick={() => { setMoveData(val, uid); UpdateActions() }} key={idx}>
//         <MoveImg key={idx} src={serverAddress() + `/images/type/move/name/${val.icon}`} />
//       </MoveBoxCont>);
//   }
// };
