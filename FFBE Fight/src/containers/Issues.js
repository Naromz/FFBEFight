
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { writeIssue } from '../actions/globalActions'
import styled from 'styled-components'

var Box = styled.div`
width:100%;
height:500px;
outline:1px solid black;
display:flex;
flex-wrap:wrap;
align-items:center;
justify-content:center;
flex-direction:column;
`
var NameBox = styled.div`
width:350px;
height:32px;
outline:1px solid black;
margin-top:10px;
display:flex;
align-items:center;
justify-content:center;
`
var NameInput = styled.input`
width:85%;
height:24px;
`
var DescBox = styled.div`
width:500px;
height:320px;
flex:1;
outline:1px solid black;
margin-top:10px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
var DescInput = styled.input`
margin-top:15px;
width:85%;
height:85%;
`
function App(props) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <Box>
      <NameBox>Reddit Name or Put NA<NameInput val={name} onChange={(evt) => setName(evt.target.value)}></NameInput></NameBox>
      <DescBox>Please Describe the issue occuring or the enhancement you're interested in!<DescInput val={desc} onChange={(evt) => setDesc(evt.target.value)} ></DescInput></DescBox>
      <button style={{ marginTop: '15px' }} onClick={() => { props.writeIssue({ name: name, desc: desc }); alert('Submitted!'); setName(''); setDesc(''); }}> Submit</button>
    </Box>
  );


}

const mapState = state => ({

});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  writeIssue: (msg) => dispatch(writeIssue(msg))

});

export default connect(
  mapState,
  mapDispatch
)(App);



