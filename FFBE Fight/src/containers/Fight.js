import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBosses, loadUnits, selectUnit, loadEffectStart, modifyCurTurn } from '../actions/globalActions';
import styled, { keyframes } from 'styled-components';
import UnitTurnBox from '../components/UnitTurnBox'

var Content = styled.div`
width:100%;
outline:1px;
justify-content:center;
align-items:center;
flex-wrap:wrap;
display:flex;
flex-direction:row;
`




var Banner = styled.div`
width:100%;
height:80px;
background-color:lightgrey;
margin-top:10px;
box-shadow: 0 1px 5px 0;
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;
padding:4px;
border-radius:10px;
`
var BannerInt = styled.div`
width:100%;
height:100%;
background-color:white;
border:1px solid black;
border-radius:10px;
display:flex;
flex-wrap:wrap;
direction:row;
`
var BannerFormCont = styled.div`
display:flex;
flex-wrap:wrap;
direction:row;
width:350px;
height:100%;
border-right:1px solid black;
border-radius:10px;
background-color:#999999;
`
var BannerFormBtnCont = styled.div`
width:40%;
height:100%;
display:flex;
flex-wrap:column;
justify-content:center;
align-items:center;
`
var LoadBossBtn = styled.div`
width:85px;
height:45px;
display:flex;
flex-direction:row;
vertical-align:center;
align-items:center;
background-color:gray;
border: 2px solid black;
flex-wrap: wrap;
border-radius:10px;
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; 

  &:hover {
    background: #555;
  }
  &:active {
    background: #a55;
  }

`
var ResBox = styled.div`
width:35px;
height:100%;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:flex-start;
font-size:14px;
outline:1px solid black;
padding: 0px 1px; 
`
var ResBoxImgCont = styled.div`
width:35px;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:center;
align-items:center;
`
var ResBoxImg = styled.img`
margin-top:1px;
width:24px;
height:24px;
`
var ResText = styled.div`
width:35px;
font-size:14px;
align-items:center;
text-align:center;
`
var LoadBossTxt = styled.div`
font-size:24px;
width:100%;
text-align:center;
`
var BannerFormSelectsCont = styled.div`
width:60%;
display:flex;
flex-direction:column;
justify-content:space-evenly;
height:90%;
`
var BannerFormSelect = styled.select`
width:80%;
height:22px;
margin-right:5px;
margin-top:10px;
`

var BossDataCont = styled.div`
width:300px;
height:100%;
outline: 1px solid black;
display:flex;
flex-wrap:wrap;
direction:column;
`

var BossDataRowCont = styled.div`
width:220px;
height:100%;
outline: 1px solid black;
display:flex;
flex-wrap:wrap;
direction:row;
`
var BossDataRow = styled.div`
height:40px;
width:100%;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
direction:row;
align-items:center;
justify-content:space-between;
`
var BossDataImgCont = styled.div`
width:80px;
height:100%;
`
var BossDataImg = styled.img`
height:100%;
`
var WaveCont = styled.div`
width:85px;
height:100%;
font-size:24px;
display:flex;
flex-direction:row;
flex-wrap:wrap;

`
var WaveHeader = styled.div`
width:100%;
height:32px;
font-size:24px;
text-align:center;
`
var BossDataNotesCont = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
flex-direction:row;
border: 2px solid gray;
margin-top:10px;
align-items:center;
justify-content:center;

`
var BossDataNoteCont = styled.div`
width:95%;
height:24px;
outline: 1px solid black;

`
var UnitSuggestionCont = styled.div`
width:100%;
height:20px;
background-color:#7A7A7A;
margin-top:10px;
box-shadow: 0 1px 5px 0;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
align-items:space-between;
padding:4px;
border-radius:10px;
`
var UnitBorderCont = styled.div`
width:100%;
height:32px;
background-color:#7A7A7A;
margin-top:10px;
box-shadow: 0 1px 5px 0;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
align-items:space-between;
padding:4px;
border-radius:10px;
`

var UnitSelect = styled.div`
width:15%;
height:32px;
border:1px solid black;
border-radius:5px;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:center;
`
var UnitSelection = styled.select`
width:85%;
height:22px;
margin-Top:5px;
`
var UnitSelectionIcon = styled.div`
width:32px;
height:32px;
outline:1px solid black;
`
var UnitSuggestionText = styled.div`
width:15%;
border:1px solid black;
font-size:14px;
text-align:center;
`
var HeadingNote = styled.div`
width:8px;
height:8px;
border:1px solid black;
background-color:white;
`
var DivLabel = styled.label`
margin-top:12px;
font-size:12px;
`

var TurnRow = styled.div`
width:100%;
min-height:128px;
background-color:#707070;
margin-top:10px;
box-shadow: 0 1px 5px 0;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
align-items:space-between;
padding:4px;
border-radius:10px;
`
var StuffGoingOn = styled.div`
height:24px;
margin-bottom:auto;
outline:1px solid black;
width: 100%;
display:flex;
flex-flow:flex-start;
`
var AilmentImgCont = styled.div`
height:24px;
width:24px;

`
var AilmentImg = styled.img`
width:100%;

`
var EnemyContainer = styled.div`
width:8%;
height:110px;
margin-left:5px;
margin-top:5px;
background-color:lightGray;
border-radius:4px;

`
var EnemyTurnContent = styled.div`
width:85%;
height:110px;
border: 1px solid black;
display:flex;
flex-wrap:wrap;
flex-direction:row;
border-radius:4px;
`

var TurnCounterCont = styled.div`
width:5%;
word-wrap:wrap;
font-size:24px;
vertical-align:center;
text-align:center;

`


function getUnitData(unitdata, name) {
  var selunit;
  unitdata.forEach(element => {
    if (element.name == name) {
      selunit = element;
    }
  }

  )
  return selunit;
}

function calcTurnEffects(turnData) {
  let eeffects = [];

  turnData.moves.forEach((val) => {
    val.data.forEach((eff) => {
      switch (eff.type) {
        case 'whitemagic':

          break;
        case 'blackmagic':

          break;
        case 'silence':
          break;
        case 'confuse':
          break;
        case 'blind':
          break;
        case 'paralyze':
          break;
        case 'stone':
          break;
        case 'atkbreak':
          break;
        case 'defbreak':
          break;
        case 'sprbreak':
          break;
        case 'magbreak':
          break;
        case 'fullbreak':
          break;

        case 'defboost':
          break;

        case 'sprboost':
          break;

        case 'atkboost':
          break;

        case 'magboost':
          break;
        case 'lance':
          break;

        case 'lancemp':
          break;

        case 'lancehp':
          break;


        default:
          if (eff.target) {
            if (eff.target == 'saoe' || eff.target == 'sone') {

            }

            if (eeffects.includes(eff.type) == false) {
              eeffects.push(eff.type);
            }
          }
          else {
            eeffects.push(eff.type);
          }

          break;
      }

    })
  })

  return eeffects.map((val, idx) => (<AilmentImgCont><AilmentImg key={idx} src={require(`../resources/images/${val}.png`)}></AilmentImg></AilmentImgCont>));
}


function loadEffectTypes(effect, effectData) {

  for (let curEffect = 0; curEffect < effectData.length; curEffect++) {
    if (effectData[curEffect].type === effect) {

    }
  }


}

function calcWhatsGoingOn(turnData) {
  let ailments = [];
  let boosts = [];
  let actions = [];
  let debuffs = [];

  for (let unit = 0; unit < turnData.length; unit++) {

    for (let move = 0; move < turnData[unit].data.length; move++) {

      let moveEffect = { type: turnData[unit].data[move].type, strength: turnData[unit].data[move].strength, turns: turnData[unit].data[move].duration }
      switch (turnData[unit].data[move].type) {
        case 'whitemagic':
          actions.push(moveEffect);
          break;

        case 'heal':
          actions.push(moveEffect);
          break;

        case 'dmg':

          actions.push(moveEffect);
          break;

      }


      console.log('Unit ' + turnData[unit].spot + " Move effect " + turnData[unit].data[move].type)
    }


  }
  console.log(ailments, boosts, actions, debuffs);
};



function App(props) {

  const [chamber, setChamber] = useState('');
  const [boss, setBoss] = useState('');
  const [bossData, setBossData] = useState('');
  const [chamberBosses, setChamberBosses] = useState('');
  const [wave, setWave] = useState(0);
  const [ailments, setAilments] = useState();

  const downHandler = (e) => {
    if (e.keyCode == 112) {
      e.preventDefault();
    }
  }

  const upHandler = (e) => {
    if (e.keyCode == 112) {
      alert('NextTurn')
    }
    if (e.key === 'a') {
      calcWhatsGoingOn(props.curTurn);
    }
  };


  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keyup', upHandler);

      window.removeEventListener('keydown', downHandler);
    };
  });

  useEffect(() => {

    if (!props.bosses) {
      props.loadBosses();
      props.loadUnits();
      props.loadEffectStart();
    }
    else {
      setBoss(props.bossLoaded);
      setChamberBosses(props.bosses.Category[0].Group.bosses);
      setChamber(props.bosses.Category[0].Group.name)

    }

  }, [props.bosses]);

  useEffect(() => {
    console.log(chamber);
    if (props.bosses) {
      props.bosses.Category.forEach(element => {
        if (element.Group.name == chamber) {
          setChamberBosses(element.Group.bosses);
          setBoss(element.Group.bosses[0].name);
        }
      });
    }
  }, [chamber]);

  useEffect(() => {
    if (props.bosses) {
      props.bosses.Category.forEach(element => {
        if (element.Group.name == chamber) {
          element.Group.bosses.forEach(bossElement => {
            if (bossElement.name == boss) {
              setBossData(bossElement);
            }
          });
        }
      });
    }
  }, [boss]);

  return (
    <Content>
      <Banner>
        <BannerInt>
          <BannerFormCont>
            <BannerFormBtnCont>
              <LoadBossBtn onClick={() => { alert(JSON.stringify(bossData)) }}><LoadBossTxt>Load</LoadBossTxt></LoadBossBtn>
            </BannerFormBtnCont>
            <BannerFormSelectsCont>
              <BannerFormSelect onChange={(evt) => { setChamber(evt.target.value); }} value={chamber} >
                {props.bosses ? props.bosses.Category.map((val, idx) => <option key={idx} value={val.Group.name}>{val.Group.name}</option>) : <></>}
              </BannerFormSelect>
              <BannerFormSelect onChange={(evt) => { setBoss(evt.target.value); }} value={boss}>
                {chamberBosses ? chamberBosses.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>}
              </BannerFormSelect>
            </BannerFormSelectsCont>
          </BannerFormCont>

          {bossData && (
            <>
              <BossDataCont>
                <BossDataImgCont>  {bossData.waves[wave].img ? <BossDataImg src={require(`../resources/images/${bossData.waves[wave].img}.png`)} /> : <></>}  </BossDataImgCont>
                <BossDataRowCont>

                  <BossDataRow>{bossData.waves[wave].name ? <p>{bossData.waves[wave].name}</p> : <></>}</BossDataRow>
                  <BossDataRow>{bossData.waves[wave].HP ? <p>HP: {bossData.waves[wave].HP}</p> : <></>}</BossDataRow>
                </BossDataRowCont>
              </BossDataCont>

              <BossDataCont>
                {/* Element */}
                <BossDataRow>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Fire.png`)} /> </ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.fire} </ResText> : <></>} </ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Ice.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.ice} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Lightning.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.lightning} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Water.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.water} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Wind.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.wind} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Earth.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.earth} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Light.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.light} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Dark.png`)} /></ResBoxImgCont>{bossData.waves[wave].elementalResistances ? <ResText> {bossData.waves[wave].elementalResistances.dark} </ResText> : <></>}</ResBox>
                </BossDataRow>
                {/* Ailment */}
                <BossDataRow>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Poison.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText>  {bossData.waves[wave].ailmentResistances.poison} </ResText> : <></>} </ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Blind.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText>  {bossData.waves[wave].ailmentResistances.blind} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Sleep.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText> {bossData.waves[wave].ailmentResistances.sleep} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Silence.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText> {bossData.waves[wave].ailmentResistances.silence} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Paralysis.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText>  {bossData.waves[wave].ailmentResistances.paralysis} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Confusion.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText> {bossData.waves[wave].ailmentResistances.confusion} </ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Disease.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText>  {bossData.waves[wave].ailmentResistances.disease}</ResText> : <></>}</ResBox>
                  <ResBox><ResBoxImgCont><ResBoxImg src={require(`../resources/images/Petrification.png`)} /></ResBoxImgCont>{bossData.waves[wave].ailmentResistances ? <ResText>  {bossData.waves[wave].ailmentResistances.petrification} </ResText> : <></>}</ResBox>
                </BossDataRow>

              </BossDataCont>
              {/* <WaveCont>
                <WaveHeader>Wave</WaveHeader>
                <WaveHeader>{wave + 1}</WaveHeader>
              </WaveCont> */}

            </>
          )}

        </BannerInt>

      </Banner>
      {bossData ?
        <>
          <DivLabel>Notes</DivLabel>
          <BossDataNotesCont>

            {bossData.waves[wave].notes ? <>{bossData.waves[wave].notes.map((val, idx) => <BossDataNoteCont key={idx}>{val.note} </BossDataNoteCont>)} </> : <></>}
          </BossDataNotesCont>
        </>

        : <> </>}

      <DivLabel>Unit Suggestions</DivLabel>
      <UnitSuggestionCont>
        {bossData ? <>
          {bossData.waves[wave].units ? <> {bossData.waves[wave].units.map((val, idx) => <> <UnitSuggestionText key={idx}>{val} </UnitSuggestionText></>)} </> : <></>}
        </> : <></>}

      </UnitSuggestionCont>
      <DivLabel> <input
        name="isGoing"
        type="checkbox"
        checked={true} /> Only Display Current Turn</DivLabel>
      <UnitBorderCont>
        <UnitSelect><UnitSelection onChange={(evt) => props.selectUnit(getUnitData(props.units.units, evt.target.value), 0)}>{props.units ? props.units.units.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>}  </UnitSelection></UnitSelect>
        <UnitSelect><UnitSelection onChange={(evt) => props.selectUnit(getUnitData(props.units.units, evt.target.value), 1)}>{props.units ? props.units.units.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>} </UnitSelection></UnitSelect>
        <UnitSelect><UnitSelection onChange={(evt) => props.selectUnit(getUnitData(props.units.units, evt.target.value), 2)}>{props.units ? props.units.units.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>} </UnitSelection></UnitSelect>
        <UnitSelect><UnitSelection onChange={(evt) => props.selectUnit(getUnitData(props.units.units, evt.target.value), 3)}>{props.units ? props.units.units.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>} </UnitSelection></UnitSelect>
        <UnitSelect><UnitSelection onChange={(evt) => props.selectUnit(getUnitData(props.units.units, evt.target.value), 4)}>{props.units ? props.units.units.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>} </UnitSelection></UnitSelect>
        <UnitSelect><UnitSelection onChange={(evt) => props.selectUnit(getUnitData(props.units.units, evt.target.value), 5)}>{props.units ? props.units.units.map((val, idx) => <option key={idx} value={val.name}>{val.name}</option>) : <></>} </UnitSelection></UnitSelect>
      </UnitBorderCont>


      {
        //Cur Turn Data
        props.selectedUnits.length > 0 && <>
          <TurnRow>

            <UnitTurnBox spot={0} data={props.selectedUnits[0].unitData}></UnitTurnBox>
            <UnitTurnBox spot={1} data={props.selectedUnits[1].unitData}></UnitTurnBox>
            <UnitTurnBox spot={2} data={props.selectedUnits[2].unitData}></UnitTurnBox>
            <UnitTurnBox spot={3} data={props.selectedUnits[3].unitData}></UnitTurnBox>
            <UnitTurnBox spot={4} data={props.selectedUnits[4].unitData}></UnitTurnBox>
            <UnitTurnBox spot={5} data={props.selectedUnits[5].unitData}></UnitTurnBox>
            <StuffGoingOn>{calcTurnEffects(props.curTurn)}</StuffGoingOn>

          </TurnRow ></>}
      {
        props.bossLoaded &&
        <TurnRow>
          {bossData &&
            <>
              <EnemyContainer>
                <BossDataImgCont>  {bossData.waves[wave].img ? <BossDataImg src={require(`../resources/images/${bossData.waves[wave].img}.png`)} /> : <></>}  </BossDataImgCont>

              </EnemyContainer>

            </>
          }

          <EnemyTurnContent><div style={{ width: '10%', height: '24px', outline: '1px solid black' }}>HP %:</div><div style={{ width: '85%', height: '24px', outline: '1px solid black' }}>Ailments: {ailments}</div><div style={{ width: '85%', height: '24px', outline: '1px solid black' }}>Thresholds: None</div><div style={{ width: '85%', height: '24px', outline: '1px solid black' }}>Conditional Moves: None</div><div style={{ width: '85%', height: '24px', outline: '1px solid black' }}>Possible Moves: Drifting Off</div></EnemyTurnContent>

        </TurnRow>
      }
    </Content>
  );
}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
  bosses: state.globalReducer.bossData,
  bossLoaded: state.globalReducer.bossLoaded,
  units: state.globalReducer.unitData,
  selectedUnits: state.globalReducer.selUnitData,
  curTurn: state.globalReducer.curTurn,

});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  loadBosses: () => dispatch(loadBosses()),
  loadUnits: () => dispatch(loadUnits()),
  selectUnit: (data, pos) => dispatch(selectUnit(data, pos)),
  loadEffectStart: () => dispatch(loadEffectStart())
});

export default connect(
  mapState,
  mapDispatch
)(App);
