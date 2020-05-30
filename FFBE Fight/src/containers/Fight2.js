
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BossHeader from '../components/BossHeader';
import BossSelection from '../components/BossSelection';
import Info from '../components/Info'
import UnitHeader from '../components/UnitHeader2';
import UnitSelection from '../components/UnitSelectionBox';
import loadStuff, { parseMoves } from '../Services/loadData';
import globalReducers from '../reducers/globalReducers';
import { changeActiveBoss, addActions } from '../actions/globalActions';
import yaml from 'js-yaml'
import ManagementBox from '../components/ManagementBox'
import searchdeep from '../Services/searchDeep';
import BossHeader2 from '../components/BossHeader2'


var HoverDisp = styled.div`
display: ${props => props.test};
position: fixed; 
z-index: 1;
left: 0;
top: 0;
width: 100%; 
height: 100%;
overflow: auto; 
background-color: rgb(0,0,0); 
background-color: rgba(0,0,0,0.4); 

flex-flow:wrap;
justify-content:center;
align-items:center;
`

var ContainAllCont = styled.div`
width:1000px;

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
var Actions = styled.div`
width:900px;
height:85%;
outline:1px solid black;
display:flex;
flex-flow:wrap;
justify-content:center;
background-color:lightgray;
`
var ActionsHeader = styled.div`
margin-top:10px;
width:70%;
height:28px;
font-size:24px;
text-align:center;
`
var ActionsBox = styled.div`
width:850px;
height:90%;
border:2px solid black;
background-color:white;
border-radius:15px;
display: flex;
flex-direction: column;
align-items:center;
justify-content: flex-start;
`
var ActionDetail = styled.div`
width:95%;
height:22px;
outline:1px solid black;
display: flex;
flex-direction: row;
align-items:center;
`
var ActionDetailText = styled.div`
outline:1px solid black;
flex:1;
padding: 0px 5px;
height:100%;
`
function App(props) {
  var [array, setArray] = useState([]);
  var [showInfo, setShowInfo] = useState(false);
  var [stateyaml, setStateYaml] = useState('');
  var [showActions, setShowActions] = useState('none');
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
      if (showActions == 'none') {
        setShowActions('flex');
      }
      else {

        setShowActions('none');
      }
      setArray(parseMoves());
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
        <HoverDisp test={showActions}>
          <Actions>
            <ActionsHeader>
              Actions
            </ActionsHeader>
            <ActionsBox>
              <ActionDetail style={{ outline: '1px solid red' }}><ActionDetailText> Effects </ActionDetailText><ActionDetailText> Target </ActionDetailText><ActionDetailText> Caster </ActionDetailText><ActionDetailText> Note </ActionDetailText></ActionDetail>
              {Array.isArray(array) && array.map((val, idx) => {
                return (<ActionDetail key={idx}><ActionDetailText>{val.eff}</ActionDetailText><ActionDetailText>{val.tar}</ActionDetailText> <ActionDetailText>{val.caster}</ActionDetailText>  <ActionDetailText>{val.note}</ActionDetailText> </ActionDetail>)
              })}
            </ActionsBox>
          </Actions>
        </HoverDisp>
        {!props.loading &&


          <>
            <BossSelection></BossSelection>
            <BossHeader2 bossData={props.curMobData}></BossHeader2>
            {/* <BossHeader bossData={props.curMobData}></BossHeader>
            <Info></Info> */}
            <UnitHeader></UnitHeader>
            <UnitSelection></UnitSelection>
          </>
        }
        <ManagementBox></ManagementBox>

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
  selUnits: state.globalReducer.selUnitData,
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



