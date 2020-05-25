
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startUpdatesLoad } from '../actions/globalActions'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

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



function ActionsToDivs({ arr, mob }) {
  return arr.map((val, idx) => {
    return (
      <TabRow key={idx} val={val} mob={mob}></TabRow>
    );
  })
}

function TabRow({ val }) {

  return (
    <TableRow>
      <TableCell align="left">{val.note}</TableCell>
    </TableRow>



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
              <TableCell align="left">Notes</TableCell>
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
  arr: state.globalReducer.curMob?.notes,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  loadFixes: () => dispatch(startUpdatesLoad())

});

export default connect(
  mapState,
  mapDispatch
)(App);



