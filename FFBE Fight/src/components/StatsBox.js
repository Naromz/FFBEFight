
import React, { useState } from 'react';
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

function Icon({ element, ailment, bossData }) {
  const classes = useStyles();
  if (element) {
    return (
      <div className={classes.test}>
        <ImgIcon src={require(`../resources/images/${jsUcfirst(element)}.png`)} />
        <TextBox>  {bossData.elementalResistances[element]}</TextBox>

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

function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root} elevation={3}>
        Stats
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <StatBox><StatText>HP</StatText><StatText>{numeral(props.bossData?.hp / 100 * props.bossData?.initalhp).format('0,0')}</StatText></StatBox>
          <StatBox><StatText>MP</StatText><StatText>{numeral(props.bossData.mp).format('0,0')}</StatText></StatBox>
          <StatBox><StatText>ATK</StatText><StatText>{props.bossData.atk}</StatText></StatBox>
          <StatBox><StatText>DEF</StatText><StatText>{props.bossData.def}</StatText></StatBox>
          <StatBox><StatText>SPR</StatText><StatText>{props.bossData.spr}</StatText></StatBox>
          <StatBox><StatText>MAG</StatText><StatText>{props.bossData.mag}</StatText></StatBox>
        </div>

      </div>
      <Paper className={classes.root} elevation={3}>
        Elements
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <Icon bossData={props.bossData} ailment="blind" />
          <Icon bossData={props.bossData} ailment="confusion" />
          <Icon bossData={props.bossData} ailment="disease" />

          <Icon bossData={props.bossData} ailment="silence" />
          <Icon bossData={props.bossData} ailment="paralysis" />
          <Icon bossData={props.bossData} ailment="poison" />
          <Icon bossData={props.bossData} ailment="petrification" />
          <Icon bossData={props.bossData} ailment="sleep" />

        </div>

      </div>
      <Paper className={classes.root} elevation={3}>
        Ailments
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <Icon bossData={props.bossData} element="ice" />
          <Icon bossData={props.bossData} element="fire" />
          <Icon bossData={props.bossData} element="wind" />
          <Icon bossData={props.bossData} element="earth" />
          <Icon bossData={props.bossData} element="water" />
          <Icon bossData={props.bossData} element="lightning" />
          <Icon bossData={props.bossData} element="dark" />
          <Icon bossData={props.bossData} element="light" />
          <Icon bossData={props.bossData} element="nonelemental" />
        </div>

      </div>
    </>

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
  bossData: state.globalReducer.curMob,
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



