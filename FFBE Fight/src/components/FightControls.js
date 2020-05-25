
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: 'white',
    maxHeight: 500,
    overflow: 'auto',
  },
  tableHead: {
    backgroundColor: 'lightGray',
    outline: '1px solid black',
    boxShadow: '0 1px 4px 0'
  },
  container: {
    maxHeight: 640,
  },
});

var Content = styled.div`
width:900px;
height:85%;
outline:1px solid black;
display:flex;
flex-flow:wrap;
margin:auto;
margin-Top:24px;
background-color:lightgray;
height:450px;
overflow: 'auto';
`

var ActionBtn = styled.div`
width:128px;
height:32px;
margin:5px;
outline:1px solid black;
background-color:gray;
`


function Controls(props) {
  ;
  return (

    <Content>
      <ActionBtn>Summon Add</ActionBtn>


      <ActionBtn>Back a turn</ActionBtn>

      <ActionBtn>Reset Wave</ActionBtn>

      <ActionBtn>Modify Boss</ActionBtn>

      <ActionBtn>Apply Buff</ActionBtn>
      <ActionBtn>Remove Buff</ActionBtn>


      <ActionBtn>Export Log</ActionBtn>


      <ActionBtn>Damage Calc</ActionBtn>
      <ActionBtn>Modify Unit</ActionBtn>
      <ActionBtn>Apply Element</ActionBtn>



    </Content>

  );
}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({

});

export default connect(
  mapState,
  mapDispatch
)(Controls);



