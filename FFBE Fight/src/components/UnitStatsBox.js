
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { alertMessage, sagaStart, modifyCurTurn } from '../actions/globalActions'
import styled from 'styled-components'


var Box = styled.div`
width:100%;
height:100%;
border:1px solid black;
border-radius:5px;
display:flex;
flex-wrap:wrap;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`
var HeaderRow = styled.div`
width:95%;
height:18px;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
flex-direction:column;
justify-content:center;
align-items:center;

`
var Row = styled.div`
width:95%;
height:${props => props.height}px;
display:flex;
outline:1px solid black;
flex-wrap:wrap;
flex-direction:column;
justify-content:center;
align-items:center;
`
var BaseStatBox = styled.div`
width:100px;
height:32px;
outline:1px solid black;

`
var HeaderImgCont = styled.div`
height:28px;
`
var HeaderImg = styled.img`
width:100%;
height:100%;
`


function LoadBaseStats(props) {
  var StatsArr = ['HP', "MP", "ATK", "DEF", "MAG", "SPR"]

  return StatsArr.map((val, idx) => {
    <BaseStatBox>{val}</BaseStatBox>
  })
}

function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();



  return (
    <Box>
      <Row height={28} >

        <HeaderRow>Stats</HeaderRow>

      </Row>
      <Row height={48}>
        <LoadBaseStats></LoadBaseStats>

      </Row>

    </Box>
  );


}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
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



