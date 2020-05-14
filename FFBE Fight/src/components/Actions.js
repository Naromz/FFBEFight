
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

function ActionsToDivs({ arr }) {
  return arr.map((val, idx) => {
    return <>
      <TableRow>
        <TableCell>{val.eff}</TableCell>
        <TableCell>{val.type}</TableCell>
        <TableCell>{val.strength}</TableCell>
        <TableCell>{val.caster}</TableCell>
        <TableCell>{val.tar}</TableCell>
        <TableCell>{val.note}</TableCell>
      </TableRow>
    </>
  });
}

function Actions(props) {

  const classes = useStyles();
  return (
    <TableCont>
      <TableContainer className={classes.container}>


        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="right">Strength</TableCell>
              <TableCell align="right">Caster</TableCell>
              <TableCell align="right">Target</TableCell>
              <TableCell align="right">Note</TableCell>
            </TableRow>

          </TableHead>
          <ActionsToDivs arr={props.arr} />

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
)(Actions);



