
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
import { changeActiveBoss, addActions } from '../actions/globalActions';
import yaml from 'js-yaml'
import ManagementBox from '../components/ManagementBox'
import searchdeep from '../Services/searchDeep';


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
  function findUnitbyUID(UID, units) {
    let found = false;
    let unit;
    for (let i = 0; i < units.length; i++) {
      if (units[i].unitData.uuid == UID) {
        unit = units[i];
      }

    }
    return unit;
  }

  function filterMoves(curTurn) {
    var arr = [];
    let i = 0;
    for (i = 0; i < curTurn.length; i++) {

      arr = arr.concat(filterUnitMoves(curTurn[i]));
    }

    setArray(arr);
  }


  function filterUnitMoves(move) {
    if (move?.data) {
      let newArr = [];

      for (let i = 0; i < move.data.length; i++) {
        move.data[i].effects.forEach(element => {
          if (element.effect?.multicast) {
            newArr.push({
              note: 'Activate Multicast Skills', tar: 'NA', caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'Multicast'
            })

          }

          if (element.effect?.imperil) {
            let imperillvl;


            let imperil = 0;

            for (imperil = 0; imperil < Object.entries(element.effect?.imperil).length; imperil++) {
              let [key, val] = Object.entries(element.effect?.imperil)[imperil];
              newArr.push({
                note: key + " " + val, tar: 'ENEMY', caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'Imperil'
              })
            }


          }

          //Handle Damage Effects
          if (element.effect?.damage) {
            if (element.effect?.area == "ST") {
              if (element?.effect?.damage?.elements) {
                newArr.push({ note: (element?.effect?.damage?.mecanism + " " + element?.effect?.damage?.coef), caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'ST Damage Elemental ' + element?.effect?.damage?.elements[0].charAt(0).toUpperCase() + element?.effect?.damage?.elements[0].slice(1), tar: props.curMobData?.name })
              }
              else {
                newArr.push({ note: (element?.effect?.damage?.mecanism + " " + element?.effect?.damage?.coef), caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'ST Damage Non-Elemental', tar: props.curMobData?.name })
              }

            }
            if (element.effect?.area == "AOE") {
              if (element?.effect?.damage?.elements) {
                newArr.push({ note: (element?.effect?.damage?.mecanism + " " + element?.effect?.damage?.coef), caster: findUnitbyUID(move?.uid, props.selUnits).unitData?.name, eff: 'AOE Damage Elemental ' + element?.effect?.damage?.elements[0].charAt(0).toUpperCase() + element?.effect?.damage?.elements[0].slice(1), tar: 'aoe' })
              }
              else {
                newArr.push({ note: (element?.effect?.damage?.mecanism + " " + element?.effect?.damage?.coef), caster: findUnitbyUID(move?.uid, props.selUnits).unitData?.name, eff: 'AOE Damage Non-Elemental', tar: 'aoe' })
              }

            }
          }

          //Handle Resist Effects
          if (element.effect?.resist) {
            if (element.effect?.area == "AOE") {
              newArr.push({ note: (element?.effect?.resist[0].percent), caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'AOE Resistance ' + element?.effect?.resist[0].name.charAt(0).toUpperCase() + element?.effect?.resist[0].name.slice(1), tar: 'Allies', turns: element?.effect?.turns })
            }
            else {
              //newArr.push({ caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'ST Damage Non-Elemental', tar: props.curMobData?.name })
            }

          }

        });
      }

      return newArr;
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
      filterMoves(props.turnData);

      // console.log(searchdeep(props.turnData));
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
            <BossSelection options={props.bossData.map((val, idx) => { return val })} waveData={props.waveData} ></BossSelection>
            <BossHeader bossData={props.curMobData}></BossHeader>
            <Info></Info>
            <UnitHeader></UnitHeader>
            <UnitSelection></UnitSelection>
          </>
        }
        <ManagementBox></ManagementBox>

        {/* <ExportString value={stateyaml}></ExportString> */}
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



