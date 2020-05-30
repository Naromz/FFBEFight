
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadEquip } from '../actions/globalActions'
import styled from 'styled-components'
import { serverAddress } from '../sources'

function parseUnitLink(link) {
  return (link.split("#")[1]);

}
function ReturnEquipSlot({ unit, slot, equipData }) {

  // console.log({ data: equipData, slot: unit });
  if (equipData) {
    return (
      <EquipBox>
        {getEquipData(unit, equipData) && <EquipImg src={serverAddress() + `/images/type/item/name/${getEquipData(unit, equipData).items[slot].icon}`} />}

        <EquipDetails>
          <EquipTitle>
            {getEquipData(unit, equipData) && getEquipData(unit, equipData).items[slot].name}
          </EquipTitle>
        </EquipDetails>
      </EquipBox>
    )
  }
  return <></>

}
function getEquipData(slot, equipData) {

  let i = 0;
  let found = false;
  if (equipData) {
    if (equipData.length) {
      for (i = 0; i < equipData.length; i++) {



        if (slot == equipData[i].spot) {
          return equipData[i].data
        }
      }
    }
  }



  return null;
}
function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();
  var [link, setLink] = useState('');


  return (
    <Box>
      <EquipCont>
        <EquipRowCont>
          <ReturnEquipSlot unit={props.curUnit} slot={0} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={1} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={2} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={3} equipData={props.equipData} />
        </EquipRowCont>
        <EquipRowCont>
          <ReturnEquipSlot unit={props.curUnit} slot={4} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={5} equipData={props.equipData} />
        </EquipRowCont>
        <EquipRowCont>

          <ReturnEquipSlot unit={props.curUnit} slot={6} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={7} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={8} equipData={props.equipData} />
          <ReturnEquipSlot unit={props.curUnit} slot={9} equipData={props.equipData} />
        </EquipRowCont>

      </EquipCont>
      <EquipForm>
        <EquipInputCont>
          Enter FFBEEquip Link to Load
          <EquipInput val={link} onChange={(evt) => setLink(evt.target.value)}></EquipInput>
        </EquipInputCont>
        <EquipBtn onClick={() => props.loadEquip(parseUnitLink(link))}>Load</EquipBtn>
      </EquipForm>
    </ Box>

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  curUnit: state.globalReducer.selunitplace,
  unitData: state.globalReducer.selUnitData,
  equipData: state.globalReducer.curEquip,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  loadEquip: (equip) => dispatch(loadEquip({ link: equip })),


});

export default connect(
  mapState,
  mapDispatch
)(App);

var EquipForm = styled.div`
width:680px;
height:50px;
display:flex;
flex-wrap:wrap;
flex-direction:column;
justify-content:center;
align-items:space-around;
`
var EquipInputCont = styled.div`
width:550px;
height:50px;
display:flex;
text-align:center;
flex-flow:column;
`
var EquipBox = styled.div`
width:150px;
height:48px;
outline:1px solid black;
border-radius:5px;
display:flex;
align-items:center;
justify-content:flex-start;

`
var EquipTitle = styled.div`
width:100%;
height:100%;
text-align:center;
font-size:14px;
vertical-align:middle;
display:flex;
flex-flow:wrap;
justify-content:center;
align-items:center;
`

var EquipInput = styled.input`
width:550px;
margin-left:20px;
`
var EquipRowCont = styled.div`
width: 680px;
height: 64px;
outline: 1px solid black;
display:flex;
flex-direction: column;
flex-wrap:wrap;
justify-content:space-evenly;
align-items:center;
`
var EquipDetails = styled.div`
width:96px;
height:100%;
display:flex;
flex-flow:column;
`
var EquipBtn = styled.button`

outline:1px solid black;
width:60px;
height:32px;
display:flex;
background-color:'white';
text-align:center;
justify-content:center;
align-items:center;
vertical-align:center;
`

var EquipImg = styled.img`
width:48px;
height:48px;
margin-left:2px;

`
var EquipCont = styled.div`
width:680px;
height:250px;
border:1px solid black;
`


var Box = styled.div`
width:680px;
height:300px;
outline:1px solid black;
`