
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

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { checkCondition } from '../Services/loadData'
const useStyles = makeStyles({
  table: {
    minWidth: 550,
    backgroundColor: 'white',
    minHeight: 40,

    overflow: 'scroll'
  },
  tableHead: {
    backgroundColor: 'lightGray',
    outline: '1px solid black',
    boxShadow: '0 1px 4px 0'
  },
  container: {
    maxHeight: 250,
    minHeight: 250,
  },
});

var TableCont = styled.div`
width:590px;
outline:1px solid black;
margin:auto;
margin-Top:24px;
background-color:lightgray; 
max-height:250px;
`

function ActionsToDivs({ arr, mob }) {
  return arr.map((val, idx) => {
    return (
      <TabRow key={idx} val={val} mob={mob}></TabRow>
    );
  })
}

function TabRow({ val, mob }) {
  // console.log(checkCondition(val.uid, mob.uid))
  const [open, setOpen] = React.useState(false);
  return (
    <TableRow>
      <TableCell align="left" >
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell align="left">{val.desc}</TableCell>
      <TableCell align="left">{val.cond}</TableCell>
      <TableCell align="right">{checkCondition(val.uid).toString()}</TableCell>

    </TableRow>



  )
}


function App(props) {

  useEffect(() => {
    console.log(props.actions);
  }, [props.actions]);

  const classes = useStyles();
  return (
    <TableCont>
      <TableContainer className={classes.container}>


        <Table stickyheader className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Desc</TableCell>
              <TableCell align="left">Condition</TableCell>
              <TableCell align="right">Triggered</TableCell>
            </TableRow>

          </TableHead>
          {props.arr && <ActionsToDivs arr={props.arr} mob={props.mob} />}

        </Table>
      </TableContainer>
    </TableCont>
  );


}

const mapState = state => ({
  arr: state.globalReducer.curMob?.cond,
  mob: state.globalReducer.curMob,
  actions: state.globalReducer.curActions,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  loadFixes: () => dispatch(startUpdatesLoad())

});

export default connect(
  mapState,
  mapDispatch
)(App);



