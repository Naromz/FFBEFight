
import React, { useState, useEffect, isValidElement } from 'react';
import { connect } from 'react-redux';
import { alertMessage, sagaStart, modifyCurTurn } from '../actions/globalActions'
import styled from 'styled-components'
import paper, { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral'

var Box = styled.div`
width:15%;
height:100%;
border:1px solid black;
border-radius:5px;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:center;
align-items:flex-end;
`
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#5f6d70',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px',
    color: 'white',
    height: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 30px',
  },
  bar: {
    backgroundColor: 'white',
    width: '100%',
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBar: {
    backgroundColor: 'gray',
    width: '100%',
    height: '72px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  test: {
    width: '48px',
    height: '64px',
    outline: '1px solid black',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
}));


var ImgIcon = styled.img`
width:32px;
height:32px;
outline:1px solid black;
`
var TextBox = styled.div`
width:100%;
justify-content:center;
color:white;
align-items:center;
text-align:center;
`
var StatBox = styled.div`
width:125px;
height:64px;
outline:1px solid black;
color:white;
display:flex;
flex-direction:row;
flex-wrap:wrap;
`
var StatText = styled.div`
width:125px;
height:28px;
outline:1px solid black;
font-size:24px;
text-align:center;
`
function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Icon({ element, ailment, bossData, modStats }) {
  if (!modStats) {
    modStats = 0;
  }
  const classes = useStyles();
  if (element) {
    return (
      <div className={classes.test}>
        <ImgIcon src={require(`../resources/images/${jsUcfirst(element)}.png`)} />

        <TextBox>  {bossData.elementalResistances[element] + modStats}</TextBox>

      </div>
    )
  }
  if (ailment) {
    return (
      <div className={classes.test}>
        <ImgIcon src={require(`../resources/images/${jsUcfirst(ailment)}.png`)} />
        <TextBox>  {bossData.ailmentResistances[ailment]}</TextBox>
      </div>
    )
  }

}

function testStats(bossData, Actions, oldActions) {
  var newBossData = Object.assign({}, bossData);
  if (Actions && bossData && oldActions) {
    var stats = bossData;
    let allfects = [];
    let actionIdx = 0;
    for (actionIdx = 0; actionIdx < Actions.length; actionIdx++) {
      let moveIdx = 0;
      let moves = [];
      if (Actions[actionIdx]) {
        moves = Actions[actionIdx].data;
        for (moveIdx = 0; moveIdx < moves.length; moveIdx++) {
          let effectIdx = 0;
          let effects = moves[moveIdx].effects;
          for (effectIdx = 0; effectIdx < effects.length; effectIdx++) {
            let effect = effects[effectIdx].effect;

            if (effect.cooldownSkill) {
              let cooldownSkill = effect.cooldownSkill.effects;
              let coolDownIdx = 0;
              for (coolDownIdx = 0; coolDownIdx < cooldownSkill.length; coolDownIdx++) {
                if (cooldownSkill[coolDownIdx]?.effect?.area == "ST") {

                  allfects.push({ ...cooldownSkill[coolDownIdx].effect, mob: bossData.uid });
                }
                else {
                  allfects.push({ ...cooldownSkill[coolDownIdx].effect });
                }
              }
            }
            else {
              if (effects[effectIdx].effect.area == "ST") {

                allfects.push({ ...effects[effectIdx].effect, mob: bossData.uid });
              }
              else {

                allfects.push({ ...effects[effectIdx].effect });
              }
            }
          }
        }
      }
    }
    var allAffects = allfects.concat(oldActions)
    var imperils = [];
    var elementTypes = { fire: 0, water: 0, ice: 0, lightning: 0, wind: 0, earth: 0, dark: 0, light: 0, nonelemental: 0 };

    allAffects.forEach((val) => {
      if (val.area == "AOE") {
        if (val.imperil) {
          imperils.push({ type: Object.entries(val.imperil)[0][0], val: Object.entries(val.imperil)[0][1] });
        }
      }
      if (val.area == "ST") {
        if (val.mob == newBossData.uid) {
          if (val.imperil) {
            imperils.push({ type: Object.entries(val.imperil)[0][0], val: Object.entries(val.imperil)[0][1] });
          }
        }
      }


    })

    Object.entries(elementTypes).forEach((val) => {

      let imperilIdx = 0;
      let imperilVal = 0;

      for (imperilIdx = 0; imperilIdx < imperils.length; imperilIdx++) {
        if (imperils[imperilIdx].type == val[0]) {
          if (imperilVal < imperils[imperilIdx].val) {
            imperilVal = imperils[imperilIdx].val;
          }
        }
      }


      elementTypes[val[0]] = elementTypes[val[0]] - imperilVal;

    })
    return ({ elements: elementTypes });
  }

}
function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();
  const classes = useStyles();
  useEffect((val, idx) => {
    testStats(props.bossData, props.curTurn, props.oldTurnEffects);
  }, [props.bossData, props.curTurn, props.oldTurnEffects])

  var test = props.bossData;


  return (
    <>
      <Paper className={classes.root} elevation={3}>
        Stats
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <StatBox><StatText>HP</StatText><StatText>{numeral(test?.hp / 100 * test?.initalhp).format('0,0')}</StatText></StatBox>
          <StatBox><StatText>MP</StatText><StatText>{numeral(test.mp).format('0,0')}</StatText></StatBox>
          <StatBox><StatText>ATK</StatText><StatText>{test.atk}</StatText></StatBox>
          <StatBox><StatText>DEF</StatText><StatText>{test.def}</StatText></StatBox>
          <StatBox><StatText>SPR</StatText><StatText>{test.spr}</StatText></StatBox>
          <StatBox><StatText>MAG</StatText><StatText>{test.mag}</StatText></StatBox>
        </div>

      </div>
      <Paper className={classes.root} elevation={3}>
        Elements
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <Icon bossData={test} ailment="blind" />
          <Icon bossData={test} ailment="confusion" />
          <Icon bossData={test} ailment="disease" />

          <Icon bossData={test} ailment="silence" />
          <Icon bossData={test} ailment="paralysis" />
          <Icon bossData={test} ailment="poison" />
          <Icon bossData={test} ailment="petrification" />
          <Icon bossData={test} ailment="sleep" />

        </div>

      </div>
      <Paper className={classes.root} elevation={3}>
        Ailments
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <Icon bossData={test} element="ice" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.ice} />
          <Icon bossData={test} element="fire" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.fire} />
          <Icon bossData={test} element="wind" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.wind} />
          <Icon bossData={test} element="earth" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.earth} />
          <Icon bossData={test} element="water" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.water} />
          <Icon bossData={test} element="lightning" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.lightning} />
          <Icon bossData={test} element="dark" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.dark} />
          <Icon bossData={test} element="light" modStats={testStats(props.bossData, props.curTurn, props.oldTurnEffects).elements.light} />
          <Icon bossData={test} element="nonelemental" />
        </div>

      </div>
    </>

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
  bossData: state.globalReducer.curMob,
  curTurn: state.globalReducer.curTurn,
  oldTurnEffects: state.globalReducer.oldTurnEffects,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  alertMessage: (val) => dispatch(alertMessage(val)),
  sagaStart: () => dispatch(sagaStart()),
  modifyCurTurn: (spot, data) => dispatch(modifyCurTurn(spot, data))

});

export default connect(
  mapState,
  mapDispatch
)(App);



