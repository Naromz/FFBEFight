
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { alertMessage, sagaStart, modifyCurTurn } from '../actions/globalActions'
import styled from 'styled-components'


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
var HeaderRow = styled.div`
width:95%;
height:28px;
display:flex;
flex-wrap:wrap;
flex-direction:column;
justify-content:center;
align-items:center;
`
var HeaderImgCont = styled.div`
height:28px;
`
var HeaderImg = styled.img`
width:100%;
height:100%;
`
var MovesBox = styled.div`
width:28px;
height:28px;
outline:1px solid black;
margin:2px;
`
var MovesBoxCont = styled.div`
width:95%;
display:flex;
flex-wrap:wrap;
justify-content:center;
padding:3px;
align-items:center;
`
var TitleBox = styled.div`
width:95%;
height:24px;
outline:1px solid black;
`
var MoveImgCont = styled.div`
height:24px;
`
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



