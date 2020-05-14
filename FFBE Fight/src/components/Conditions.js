
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import history from '../history';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'
import { makeStyles } from '@material-ui/core/styles';
import { parseMoves } from '../Services/loadData';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: 'white',
    maxHeight: 500,
    overflow: 'auto',
  },
  tableHead: {
    backgroundColor: 'gray',
    outline: '1px solid black',
    boxShadow: '0 1px 4px 0'
  },
  container: {
    maxHeight: 640,
  },
});

var TableCont = styled.div`
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

function ConditionstoDivs({ arr }) {
  return arr.map((val, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell >{val.uid}</TableCell>
        <TableCell >{val.name}</TableCell>
        <TableCell>{val.trigger}</TableCell>
        <TableCell >{val.moves}</TableCell>
        <TableCell>{val.triggered.toString()}</TableCell>
      </TableRow>
    )
  });
}

function Conditions(props) {

  const classes = useStyles();
  return (
    <TableCont>
      <TableContainer className={classes.container}>


        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell align="left">Caster</TableCell>
              <TableCell align="left">Reason</TableCell>
              <TableCell align="left">Moves</TableCell>
              <TableCell align="left">Triggered</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            <ConditionstoDivs key={'test'} arr={props.arr} />
          </TableBody>
        </Table>
      </TableContainer>
    </TableCont>
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
)(Conditions);



