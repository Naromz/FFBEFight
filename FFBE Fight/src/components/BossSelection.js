import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { changeActiveBoss, changeActiveMob } from '../actions/globalActions';

var BossHeader = styled.div`
width:1000px;
height:64px;
border:1px solid black;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:flex-start;
align-items:center;

`
var BossBox = styled.div`
width:48px;
height:58px;
border:1px solid black;
background-color: ${props => props.color};
border-radius:2px;
display:flex;
align-items:center;
justify-content:center;

`
var BossSelection = styled.div`
width:35%;
height:64px;
border:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
border-radius:2px;
`

var BossIcon = styled.img`
width:85%;
height:85%;

`
var CreateEnemies = ({ enemies, changeactiveMob }) => {
  return enemies.map((val, idx) => {
    return (
      <BossBox color={val.hp > 0 ? 'white' : 'red'} onClick={() => { val.hp > 0 && (changeactiveMob(val.uid) && console.log(val.uid)) }} key={idx}><BossIcon src={require(`../resources/images/${val.img}.png`)} /></BossBox>)
  });


}
function App(props) {

  return (
    <BossHeader>
      <BossSelection>
        {/* <SelectionInput onChange={(evt) => props.changeActiveBoss(evt.target.value)}><CreateSelection selections={props.options} /></SelectionInput> */}

      </BossSelection>
      {props.waveData && <CreateEnemies changeactiveMob={(val) => props.changeActiveMob(val)} enemies={props.waveData?.mobs} />}

    </BossHeader >

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  waveData: state.globalReducer.curWaveData,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  changeActiveBoss: (val) => dispatch(changeActiveBoss(val)),
  changeActiveMob: (val) => dispatch(changeActiveMob(val)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



