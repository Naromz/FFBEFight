
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { startFixesLoad } from '../actions/globalActions'
import history from '../history';


var HeaderContainer = styled.div`
width:100%;
height:95px;
background-color:lightgrey;
display:flex;
flex-direction:column;
box-shadow: 0 1px 5px 0;
border-radius:10px;


`
var HeaderLogo = styled.div`
width:100%;
height:55px;
text-align:center;
font-size:48px;

`
var HeaderLinkContainer = styled.div`
width:100%;
height:45px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-evenly;

`
var HeaderLink = styled.div`
height:25px;
font-size:24px;
`
function Header(props) {

  return (
    <HeaderContainer>
      <HeaderLogo><div>FFBE Fight</div></HeaderLogo>
      <HeaderLinkContainer>
        <HeaderLink onClick={() => history.push('/fight')}>Fight</HeaderLink>

        <HeaderLink onClick={() => { history.push('/fixes'); props.loadFixes() }}>TO DO</HeaderLink>

        <HeaderLink onClick={() => history.push('/issues')}>Submit Issue</HeaderLink>
      </HeaderLinkContainer>
    </HeaderContainer>
  );
}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  loadFixes: () => dispatch(startFixesLoad()),
});

export default connect(
  mapState,
  mapDispatch
)(Header);



