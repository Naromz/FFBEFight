
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
import yaml from 'js-yaml'
import searchdeep from '../Services/searchDeep';

var ContainAllCont = styled.div`
width:800px;

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
flex-flow:wrap;
justify-content:center;
`
var Space = styled.div`
width:800px;
height:250px;

`
var ExportString = styled.textarea`
width:800px;
height:150px;
`
var InfoBox = styled.div`
width:300px;
height:800px;
outline:1px solid black;

`


function App(props) {

  var [showInfo, setShowInfo] = useState(false);
  var [stateyaml, setStateYaml] = useState('');
  useEffect(() => {

    loadStuff();
  }, [])

  var getKeys = function (obj) {
    var keys = [];
    var keyList = [];
    keys = Object.keys(obj);

    keys.forEach(element => {
      keyList.push(element);

    });
    return keyList;

  }
  const downHandler = (e) => {
    if (e.keyCode == 112) {
      e.preventDefault();
    }
  }

  const upHandler = (e) => {
    if (e.keyCode == 112) {
      e.preventDefault();
      console.log(searchdeep(props.turnData));
      // var keyList = getKeys(props.turnData[0].data);
      // var data = [];
      // for (let i = 0; i < keyList.length; i++) {
      //   data.push({ uid: i, data: getKeys(props.turnData[0].data[keyList[i]]) });

      // }
      // setStateYaml(yaml.dump(data));
    }
    if (e.key === 'a') {
      setStateYaml(yaml.dump(props.state));
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
        <ExportString value={stateyaml}></ExportString>
      </ContainAllCont>
    </Content >
  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  loading: state.globalReducer.loading,
  bossData: state.globalReducer.bossData,
  curMobData: state.globalReducer.curMob,
  waveData: state.globalReducer.curWaveData,
  turnData: state.globalReducer.curTurn,
  state: state
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  changeActiveBoss: (val) => dispatch(changeActiveBoss(val)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



