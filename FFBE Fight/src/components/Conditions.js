
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import history from '../history';

var Table = styled.div`
width:900px;
height:85%;
outline:1px solid black;
display:flex;
flex-flow:wrap;
margin:auto;
margin-Top:24px;
background-color:lightgray;
`

function Header(props) {

  return (
    <Table>


    </Table>
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
)(Header);



