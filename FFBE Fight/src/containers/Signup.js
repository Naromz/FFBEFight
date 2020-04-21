
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { alertMessage, sagaStart, modifyCurTurn } from '../actions/globalActions'
import styled from 'styled-components'

var MoveImg = styled.img`
width:100%;
height:100%;
`
function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();
  if (props.data.name != 'None') {
    return (
      <Box>
        <HeaderRow>{props.data.name}<HeaderImgCont><HeaderImg src={require(`../resources/images/Units/${props.data.img}.png`)}></HeaderImg></HeaderImgCont></HeaderRow>
        <MovesBoxCont>{props.data.moves.map((val) => { return (<MovesBox onMouseDown={() => { props.modifyCurTurn(props.spot, val.eff); setSelMove(val.name); }} onMouseOver={() => { setMove(val.name) }}><MoveImgCont><MoveImg src={require(`../resources/images/Moves/${val.icon}.png`)} /> </MoveImgCont></MovesBox>) })}
          <TitleBox>{selMove != undefined ? <div style={{ fontWeight: 'bold' }}>{selMove}</div> : <div>{move}</div>}</TitleBox>
        </MovesBoxCont>

      </Box>
    );
  }

  else {
    return (
      <Box>Empty</Box>
    );
  }

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



