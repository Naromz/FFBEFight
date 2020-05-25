
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startUpdatesLoad } from '../actions/globalActions'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'

import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography'
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
width:780px;
outline:1px solid black;
margin:auto;
margin-Top:24px;
background-color:lightgray; 
max-height:250px;
`


var CondBox = styled.div`
width:85%;
height:32px;
outline:1px solid black;

`

function findMove(moveid, mobdata) {

  let i = 0;
  for (i = 0; i < mobdata.moves.length; i++) {
    if (mobdata.moves[i].uid == moveid) {
      return mobdata.moves[i];
    }
  }

  return null;

}

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
    <>
      <TableRow>
        <TableCell align="left" >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{val.desc}</TableCell>
        <TableCell align="left">{val.cond}</TableCell>
        {checkCondition(val.uid) ? <TableCell style={{ color: 'red' }} align="left">{checkCondition(val.uid).toString()}</TableCell> : <TableCell style={{ color: 'black' }} align="left">{checkCondition(val.uid).toString()}</TableCell>}

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} style={{ backgroundColor: '#e1e6ed' }}>
              <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom component="div">
                Moves
              </Typography>
              <Table size="small">
                <TableHead style={{ backgroundColor: '#b0b3b8' }}>
                  <TableRow>
                    <TableCell align="left">Move</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Chance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {val.moves && val.moves.map((val2, idx) => {

                    return (
                      <TableRow>

                        <TableCell>{findMove(val2.uid, mob) && findMove(val2.uid, mob).name}</TableCell>
                        <TableCell>{findMove(val2.uid, mob) && findMove(val2.uid, mob).desc}</TableCell>

                        <TableCell>{val2.percent}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom component="div">
                Trigger String
              </Typography>
              <Box style={{ textAlign: 'center' }}>
                {JSON.stringify(val.trigger)}
              </Box>
            </Box>


          </Collapse>
        </TableCell>
      </TableRow>
    </>


  )
}


function App(props) {

  useEffect(() => {
  }, [props.actions]);

  const classes = useStyles();
  return (
    <TableCont>
      <TableContainer className={classes.container}>


        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Desc</TableCell>
              <TableCell align="left">Condition</TableCell>
              <TableCell align="left">Triggered</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>

            {props.arr && <ActionsToDivs arr={props.arr} mob={props.mob} />}
          </TableBody>

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



