
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startUpdatesLoad } from '../actions/globalActions'
import styled from 'styled-components'

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'

import TableContainer from '@material-ui/core/TableContainer';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: 'white',
    maxHeight: 400,
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

var Box = styled.div`
width:100%;
outline:1px solid black;

display:flex;
flex-flow:wrap;
margin:auto;
margin-Top:24px;
background-color:lightgray;
overflow: 'auto';
`


function ActionsToDivs({ arr }) {
  return arr.map((val, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell>{val.update}</TableCell>
        <TableCell>{val.fixnum}</TableCell>
        <TableCell>{val.desc}</TableCell>
        <TableCell>{val.compdate}</TableCell>
      </TableRow>

    );
  })
}



function App(props) {

  useEffect(() => {
    props.loadFixes();
    console.log('test');
  }, []);

  const classes = useStyles();
  return (
    <Box>
      <TableContainer className={classes.container}>


        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Update</TableCell>
              <TableCell align="left">Fix Num</TableCell>
              <TableCell align="left">Desc</TableCell>
              <TableCell align="left">Completed</TableCell>
            </TableRow>

          </TableHead>
          {props.arr && <ActionsToDivs arr={props.arr} />}

        </Table>
      </TableContainer>
    </Box>
  );


}

const mapState = state => ({
  arr: state.globalReducer.updates,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  loadFixes: () => dispatch(startUpdatesLoad())

});

export default connect(
  mapState,
  mapDispatch
)(App);



