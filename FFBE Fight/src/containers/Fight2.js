
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BossHeader from '../components/BossHeader';
import BossSelection from '../components/BossSelection';
import Info from '../components/Info'
import UnitHeader from '../components/UnitHeader';
import UnitSelection from '../components/UnitSelectionBox';
import loadStuff from '../Services/loadData';
import globalReducers from '../reducers/globalReducers';
import { changeActiveBoss } from '../actions/globalActions';

var ContainAllCont = styled.div`
width:1300px;

display:flex;
flex-wrap:wrap;
flex-direction:row;
align-items:center;
justify-content:center;
`

var Content = styled.div`
width:100%;
height:100%;
display:flex;
flex-wrap:wrap;
flex-direction:row;
align-items:center;
justify-content:center;
`
var Space = styled.div`
width:800px;
height:250px;

`

function App(props) {
  useEffect(() => {

    loadStuff();
  }, [])

  useEffect(() => {
    if (!props.loading) {
      props.changeActiveBoss(props.bossData[0].uid);
    }
  }, [props.loading])
  return (
    <Content>
      <ContainAllCont>

        {!props.loading &&


          <>
            <BossSelection options={props.bossData.map((val, idx) => { return val })} waveData={props.waveData} ></BossSelection>
            <BossHeader bossData={props.curMobData}></BossHeader>
            <Info></Info>
            <UnitHeader></UnitHeader>
            <UnitSelection></UnitSelection>
          </>
        }

      </ContainAllCont>
    </Content >
  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  loading: state.globalReducer.loading,
  bossData: state.globalReducer.bossData,
  curMobData: state.globalReducer.curMob,
  waveData: state.globalReducer.curWaveData
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  changeActiveBoss: (val) => dispatch(changeActiveBoss(val)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



