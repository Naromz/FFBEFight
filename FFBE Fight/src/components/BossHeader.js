
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { changeHp } from '../actions/globalActions'


var BossHeader = styled.div`
width:800px;
height:128px;
border-radius:6px;
border:1px solid black;
background-color:lightgray;
display:flex;
flex-wrap:wrap;
flex-direction:column;
`

var BossImgCont = styled.div`
width:200px;
height:128px;
border-right:1px solid black;
display:flex;
border-radius:6px;
flex-wrap:wrap;
justify-content:center;
align-items:center;
margin-top:3px;
`

var BossImg = styled.img`
height:100%;
`

var BossData = styled.div`
width:600px;
height:128px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:flex-start;
`

var BossName = styled.div`
width:100px;
height:32px;
font-size:18px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
outline:1px solid black;
`

var BossHp = styled.div`
width:200px;
height:32px;
font-size:18px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
outline:1px solid black;
`

var BossStat = styled.div`
width:64px;
height:32px;
font-size:12px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
outline:1px solid black;
`

var BossStats = styled.div`
width:600px;
height:32px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
`
var BossMoveInfoCont = styled.div`
width:580px;
height:18px;
font-size:14px;
outline:1px solid black;
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

var HoverDispCont = styled.div`
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
height:420px;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:flex-start;
justify-content: center;
`
var ResItem = styled.div`
width:64px;
height:64px;
outline:1px solid black;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:flex-start;
justify-content: center;

`
var ElementalCont = styled.div`
width:512px;
display:flex;
flex-wrap:wrap;
flex-direction:row;

`
var HoverDispElementalCont = styled.div`
width:512px;
height:128px;
outline:1px solid black;
background-color:lightgray;
`

var ResImg = styled.img`
margin-top:2px;
width:36px;
height:36px;

`
var ResTxt = styled.div`
width:100%;
height:24px;
font-size:18px;
align-items:center;
text-align:center;
`

var BossStatTxt = styled.div`
width:64px;
text-align:center;
outline:1px solid black;
height:100%;

`

var BossHpCont = styled.div`
width:128px;
height:128px;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:center;

`

var BossHpTxtEntry = styled.input`
width:60%;
height:22px;
margin-top:4px;
text-align:center;
`

function App(props) {
  var [showRes, setShowRes] = useState('none');
  var [hp, setHp] = useState(100);

  useEffect(() => {
    setHp(100);
  }, [props.bossData?.uid])
  return (
    <BossHeader>
      <HoverDisp test={showRes}>
        <HoverDispCont>
          <BossHpCont>
            <BossHpTxtEntry onChange={(evt) => { props.changeHp(evt.target.value); setHp(evt.target.value); }} value={hp}></BossHpTxtEntry>
          </BossHpCont>
          <HoverDispElementalCont onClick={() => setShowRes('none')}>
            <ElementalCont>
              <ResItem><ResImg src={require('../resources/images/Ice.png')} /><ResTxt>{props.bossData?.elementalResistances?.ice}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Fire.png')} /><ResTxt>{props.bossData?.elementalResistances?.fire}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Earth.png')} /><ResTxt>{props.bossData?.elementalResistances?.earth}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Wind.png')} /><ResTxt>{props.bossData?.elementalResistances?.wind}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Lightning.png')} /><ResTxt>{props.bossData?.elementalResistances?.lightning}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Water.png')} /><ResTxt>{props.bossData?.elementalResistances?.water}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Dark.png')} /><ResTxt>{props.bossData?.elementalResistances?.dark}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Light.png')} /><ResTxt>{props.bossData?.elementalResistances?.light}</ResTxt></ResItem>
            </ElementalCont>

            <ElementalCont>
              <ResItem><ResImg src={require('../resources/images/Poison.png')} /><ResTxt>{props.bossData?.ailmentResistances?.poison}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Blind.png')} /><ResTxt>{props.bossData?.ailmentResistances?.blind}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Sleep.png')} /><ResTxt>{props.bossData?.ailmentResistances?.sleep}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Silence.png')} /><ResTxt>{props.bossData?.ailmentResistances?.silence}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Paralysis.png')} /><ResTxt>{props.bossData?.ailmentResistances?.paralysis}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Confusion.png')} /><ResTxt>{props.bossData?.ailmentResistances?.confusion}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Disease.png')} /><ResTxt>{props.bossData?.ailmentResistances?.disease}</ResTxt></ResItem>
              <ResItem><ResImg src={require('../resources/images/Petrification.png')} /><ResTxt>{props.bossData?.ailmentResistances?.petrification}</ResTxt></ResItem>
            </ElementalCont>


          </HoverDispElementalCont>
        </HoverDispCont>
      </HoverDisp>
      <BossImgCont>{props.bossData?.img && <BossImg src={require(`../resources/images/${props.bossData.img}.png`)}></BossImg>}</BossImgCont>
      <BossData>
        <BossStats>
          <BossName onClick={() => setShowRes('block')}>{props.bossData?.name}</BossName>
          <BossHp>HP: {numeral(props.bossData?.hp / 100 * props.bossData?.initalhp).format('0,0')}</BossHp>
          <BossStat>ATK: {numeral(props.bossData?.atk).format('0,0')}</BossStat>
          <BossStat>DEF: {numeral(props.bossData?.def).format('0,0')}</BossStat>
          <BossStat>SPR: {numeral(props.bossData?.spr).format('0,0')}</BossStat>
          <BossStat>MAG: {numeral(props.bossData?.mag).format('0,0')}</BossStat>
        </BossStats>

        <BossMoveInfoCont>
          <BossStatTxt>Ailments</BossStatTxt>
        </BossMoveInfoCont>
        <BossMoveInfoCont>
          <BossStatTxt>Buffs</BossStatTxt>
        </BossMoveInfoCont>
        <BossMoveInfoCont>
          <BossStatTxt>Debuffs</BossStatTxt>
        </BossMoveInfoCont>
      </BossData>
    </BossHeader >

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({

});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  changeHp: (val) => dispatch(changeHp(val)),
});

export default connect(
  mapState,
  mapDispatch
)(App);



