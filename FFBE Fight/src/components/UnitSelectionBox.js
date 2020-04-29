
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { selectUnit, changeSelectUnitPlace } from '../actions/globalActions'
import globalReducers from '../reducers/globalReducers';


var UnitData = styled.div`
width:800px;
height:64px;
border-radius:6px;
border:1px solid black;
background-color:lightgray;
display:flex;
flex-wrap:wrap;
flex-direction:column;
`
var HoverDispCont = styled.div`
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
height:600px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:flex-start;
justify-content: center;
`

var HoverDisp = styled.div`
display: ${props => props.test};
position: fixed; 
z-index: 1;
padding-top: 100px; 
left: 0;
top: 0;
width: 100%; 
height: 100%;
overflow: auto; 
background-color: rgb(0,0,0); 
background-color: rgba(0,0,0,0.4); 
`
var UnitBox = styled.div`
width:128px;
height:64px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:center;
justify-content: center;


`

var UnitSelectionSide = styled.div`
width:200px;
height:100%;
outline:1px solid black;

`
var UnitDetailSelection = styled.div`
width:600px;
height:100%;
outline:1px solid black;
`
var UnitImageCont = styled.div`
width:100%;
height:200px;
outline:1px solid black;

`
var UnitInputCont = styled.div`
width:100%;
height:220px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
`
var UnitBtnCont = styled.div`
width:100%;
height:160px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
`
var UnitInput = styled.select`
width:85%;
height:24px;
font-size:18px;
`
var UnitSelectionExit = styled.div`
width:48px;
height:32px;
font-size:32px;
text-align:center;

`
var UnitExtraSelection = styled.div`
width:48px;
height:400px;

`

var UnitSelectionText = styled.div`
margin-top:20px;
width:48px;
height:32px;
text-align:center;
font-size:18px;
`

var UnitSelectionDetailImgCont = styled.div`
height:85%;
display:flex;
flex-flow:row;
justify-content:center;
align-items:center;
outline:1px solid black;
`
var FullLengthBox = styled.div`
width:100%;
height:24px;
display:flex;
flex-flow:row;
justify-content:center;
align-items:center;
`
var NameBoxCont = styled.div`
width:200px;
height:24px;
font-size:18px;
text-align:center;
outline:1px solid black;
`
var StatsBoxCont = styled.div`
width:200px;
height:24px;
font-size:18px;
text-align:center;
outline:1px solid black;

`

var MovesCont = styled.div`
margin-top:15px;
width:600px;
height:180px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;

`
var MoveBoxCont = styled.div`
width:48px;
height:48px;
outline:1px solid black;
display:flex;
flex-flow:row;
justify-content:center;
align-items:center;

`
var MoveImg = styled.img`
width:32px;
height:32px;

`
var MoveNameDescCont = styled.div`
width:600px;
height:24px;
font-size:18px;
outline:1px solid black;
text-align:center;
`
var MoveDescCont = styled.div`
width:600px;
height:210px;
font-size:18px;
outline:1px solid black;
text-align:center;
`
var UnitSelectionDisplayImg = styled.img`

`
var UnitSelectionImg = styled.img`
width:36px;
height:32px;
outline:1px solid black;

`
function GetUnits({ unitData }) {
  return unitData.map((val, idx) =>
    <option key={idx} value={idx}>
      {val.name}
    </option>);

}

function findUnitData(data, pos) {
  let found = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i].selected == pos) {
      found = data[i].unitData;
    }
  }
  return found;
}

function CheckUnitData(data, pos) {
  let notFound = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].selected == pos) {
      notFound = true;
    }
  }
  return notFound;
}

function GetUnitMoves({ unitData, setname, setdesc }) {
  return unitData.map((val, idx) =>
    <MoveBoxCont key={idx}>
      <MoveImg key={idx} onMouseEnter={() => { setname(val.name); setdesc(val.effects.map((val, idx) => <> {val.desc} <br /></>)) }} src={require(`../resources/images/Moves/${val.icon}`)} />
    </MoveBoxCont>);
};

function App(props) {
  var [showProp, setShowProp] = useState('none')
  var [selUnitSpot, setSelUnitSpot] = useState(0);
  var [selUnitIdx, setSelUnitIdx] = useState(0);
  var [moveName, setMoveName] = useState('');
  var [moveDesc, setMoveDesc] = useState('');
  var [unitName, setUnitName] = useState('none');

  useEffect(() => {

  }, [])
  return (
    <UnitData>
      <UnitBox key={0} onClick={() => { if (!CheckUnitData(props.selUnitData, 0)) { setShowProp('block'); setSelUnitIdx(0); setUnitName('none'); } setSelUnitSpot(0); props.changeSelectUnitPlace(0); }}>{CheckUnitData(props.selUnitData, 0) ? <UnitSelectionImg src={require(`../resources/images/Units/${findUnitData(props.selUnitData, 0).img}.png`)} /> : <h3>Select</h3>}</UnitBox>
      <UnitBox key={1} onClick={() => { if (!CheckUnitData(props.selUnitData, 1)) { setShowProp('block'); setSelUnitIdx(0); setUnitName('none'); } setSelUnitSpot(1); props.changeSelectUnitPlace(1); }}>{CheckUnitData(props.selUnitData, 1) ? <UnitSelectionImg src={require(`../resources/images/Units/${findUnitData(props.selUnitData, 1).img}.png`)} /> : <h3>Select</h3>}</UnitBox>
      <UnitBox key={2} onClick={() => { if (!CheckUnitData(props.selUnitData, 2)) { setShowProp('block'); setSelUnitIdx(0); setUnitName('none'); } setSelUnitSpot(2); props.changeSelectUnitPlace(2); }}>{CheckUnitData(props.selUnitData, 2) ? <UnitSelectionImg src={require(`../resources/images/Units/${findUnitData(props.selUnitData, 2).img}.png`)} /> : <h3>Select</h3>}</UnitBox>
      <UnitBox key={3} onClick={() => { if (!CheckUnitData(props.selUnitData, 3)) { setShowProp('block'); setSelUnitIdx(0); setUnitName('none'); } setSelUnitSpot(3); props.changeSelectUnitPlace(3); }}>{CheckUnitData(props.selUnitData, 3) ? <UnitSelectionImg src={require(`../resources/images/Units/${findUnitData(props.selUnitData, 3).img}.png`)} /> : <h3>Select</h3>}</UnitBox>
      <UnitBox key={4} onClick={() => { if (!CheckUnitData(props.selUnitData, 4)) { setShowProp('block'); setSelUnitIdx(0); setUnitName('none'); } setSelUnitSpot(4); props.changeSelectUnitPlace(4); }}>{CheckUnitData(props.selUnitData, 4) ? <UnitSelectionImg src={require(`../resources/images/Units/${findUnitData(props.selUnitData, 4).img}.png`)} /> : <h3>Select</h3>}</UnitBox>
      <UnitBox key={5} onClick={() => { if (!CheckUnitData(props.selUnitData, 5)) { setShowProp('block'); setSelUnitIdx(0); setUnitName('none'); } setSelUnitSpot(5); props.changeSelectUnitPlace(5); }}>{CheckUnitData(props.selUnitData, 5) ? <UnitSelectionImg src={require(`../resources/images/Units/${findUnitData(props.selUnitData, 5).img}.png`)} /> : <h3>Select</h3>}</UnitBox>


      <HoverDisp test={showProp}>
        <HoverDispCont>
          <UnitSelectionSide>
            <UnitImageCont>
              <UnitSelectionDetailImgCont>{props.unitData?.units[selUnitIdx]?.fullimg && <UnitSelectionDisplayImg src={require(`../resources/images/Units/${props.unitData.units[selUnitIdx].fullimg}.png`)} />}</UnitSelectionDetailImgCont>
            </UnitImageCont>
            <UnitInputCont>
              <UnitInput selectedIndex={selUnitIdx} value={unitName} onChange={(evt) => { setMoveName(''); setMoveDesc(''); setUnitName(evt.target.val); setSelUnitIdx(evt.target.value); }}>
                {props.unitData?.units && <GetUnits unitData={props.unitData?.units} />}
              </UnitInput>

            </UnitInputCont>
            <UnitBtnCont>
              <button onClick={() => { props.selectUnit(props.unitData?.units[selUnitIdx], selUnitSpot); setShowProp('none') }}>Select</button>
            </UnitBtnCont>
          </UnitSelectionSide>
          <UnitDetailSelection>
            <FullLengthBox>
              <NameBoxCont>{props.unitData?.units[selUnitIdx]?.name && props.unitData?.units[selUnitIdx]?.name}</NameBoxCont>

            </FullLengthBox>
            <FullLengthBox>
              <StatsBoxCont>HP : {props.unitData?.units[selUnitIdx]?.stats && JSON.stringify(props.unitData?.units[selUnitIdx]?.stats[0]?.maxStats?.hp)}</StatsBoxCont>
              <StatsBoxCont>MP : {props.unitData?.units[selUnitIdx]?.stats && JSON.stringify(props.unitData?.units[selUnitIdx]?.stats[0]?.maxStats?.mp)}</StatsBoxCont>
              <StatsBoxCont>ATK : {props.unitData?.units[selUnitIdx]?.stats && JSON.stringify(props.unitData?.units[selUnitIdx]?.stats[0]?.maxStats?.atk)}</StatsBoxCont>
            </FullLengthBox>
            <FullLengthBox>
              <StatsBoxCont>DEF : {props.unitData?.units[selUnitIdx]?.stats && JSON.stringify(props.unitData?.units[selUnitIdx]?.stats[0]?.maxStats?.def)}</StatsBoxCont>
              <StatsBoxCont>SPR : {props.unitData?.units[selUnitIdx]?.stats && JSON.stringify(props.unitData?.units[selUnitIdx]?.stats[0]?.maxStats?.spr)}</StatsBoxCont>
              <StatsBoxCont>MAG : {props.unitData?.units[selUnitIdx]?.stats && JSON.stringify(props.unitData?.units[selUnitIdx]?.stats[0]?.maxStats?.mag)}</StatsBoxCont>
            </FullLengthBox>
            <FullLengthBox style={{ height: '48px', }}>
              EQUIP: COMING SOON
            </FullLengthBox>
            <FullLengthBox>
              <NameBoxCont>Moves</NameBoxCont>
            </FullLengthBox>
            <MovesCont>
              {props.unitData?.units[selUnitIdx]?.stats && <GetUnitMoves setdesc={(val) => setMoveDesc(val)} setname={(val) => setMoveName(val)} unitData={props.unitData?.units[selUnitIdx]?.moves} />}
            </MovesCont>
            <MoveNameDescCont>{moveName}</MoveNameDescCont>
            <MoveDescCont>{moveDesc}</MoveDescCont>
          </UnitDetailSelection>
          <UnitExtraSelection>
            <UnitSelectionExit onClick={() => { setShowProp('none'); setMoveName(''); setMoveDesc(''); }}>X</UnitSelectionExit>
            <UnitSelectionText>Unit: {selUnitSpot + 1}</UnitSelectionText>

          </UnitExtraSelection>

        </HoverDispCont>
      </HoverDisp>
    </UnitData>
  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  unitData: state.globalReducer.unitData,
  selUnitData: state.globalReducer.selUnitData,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  selectUnit: (unit, spot) => dispatch(selectUnit(unit, spot)),
  changeSelectUnitPlace: (val) => dispatch(changeSelectUnitPlace(val)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



