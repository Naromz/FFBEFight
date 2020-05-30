
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { changeHp } from '../actions/globalActions'
import { serverAddress } from '../sources'
import '../fonts/finalf.ttf'
import Fab from '@material-ui/core/Fab';
import '../index.css'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ConditionList from '../components/ConditionList'
import StatsBox from '../components/StatsBox'
import NotesList from '../components/NotesList'
import ControlsList from '../components/BossControls'
import BossControls from '../components/BossControls';
function LoadData({ sel, mobData, curTurn }) {

  if (sel === 0) {
    return (
      <ConditionList></ConditionList>
    )
  }
  if (sel === 1) {
    return (
      <StatsBox></StatsBox>
    )
  }
  if (sel === 2) {
    return (
      <NotesList></NotesList>
    )
  }
  if (sel === 3) {
    return (
      <BossControls></BossControls>
    )
  }
  return (
    <></>
  )
}


function App(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <EnemyDataCont>
      <EnemyHeadCont>
        <EnemyHeadTextCont>
          <EnemyHeadText>{props.mobData && props.mobData.name}</EnemyHeadText>

        </EnemyHeadTextCont>

        <EnemyImgCont>{props.mobData && <EnemyImg src={serverAddress() + "/images/type/boss/name/" + props.mobData.img}></EnemyImg>}</EnemyImgCont>
      </EnemyHeadCont>
      <EnemyCont>
        <EnemyControlsCont>
          <Paper square>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="Boss Data"
            >
              <Tab label="Conds" />
              <Tab label="Stats" />
              <Tab label="Notes" />
              <Tab label="Controls" />
            </Tabs>

            <LoadData sel={value} ></LoadData>
          </Paper>


        </EnemyControlsCont>

      </EnemyCont>
    </EnemyDataCont>
  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  mobData: state.globalReducer.curMob,
  curTurn: state.globalReducer.curTurn,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  changeHp: (val) => dispatch(changeHp(val)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



var EnemyCont = styled.div`
width:800px;
height:100%;
border:1px solid black;
display:flex;
justify-content:center;
`

var EnemyControlsCont = styled.div`
width:98%;
height:45px;
outline:1px solid black;
margin-top:3px;
`

var EnemyDataCont = styled.div`
width:1000px;
height:350px;
outline:1px solid black;
display:flex;
flex-direction:row;

`
var EnemyHeadCont = styled.div`
width:200px;
height:350px;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:flex-start;
background-color:lightgray;
`
var EnemyHeadTextCont = styled.div`
width:240px;
height:30px;
outline:1px solid black;
display:flex;
flex-flow:wrap;
background-color:lightgray;
`
var EnemyHeadText = styled.div`
width:100%;
height:50%;
font-size:24px;
text-align:center;
font-family:Verdana, Geneva, Tahoma, sans-serif;

`
var EnemyImgCont = styled.div`
 background-image: url(${require('../resources/images/farplane.jpg')});
width:85%;
height:275px;
border:1px solid black;
border-radius:16px;
background-color:white;
display:flex;
justify-content:center;
align-items:center;
`
var EnemyImg = styled.img`
width:95%;
margin-top:10px;

`