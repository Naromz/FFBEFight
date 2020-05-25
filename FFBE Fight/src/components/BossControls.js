
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { alertMessage, sagaStart, modifyCurTurn } from '../actions/globalActions'
import styled from 'styled-components'
import paper, { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral'

import Chip from '@material-ui/core/Chip';


var Box = styled.div`
width:15%;
height:100%;
border:1px solid black;
border-radius:5px;
display:flex;
flex-wrap:wrap;
flex-direction:row;
justify-content:center;
align-items:flex-end;
`
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    backgroundColor: '#5f6d70',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px',
    color: 'white',
    height: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 30px',
  },
  bar: {
    backgroundColor: 'white',
    width: '100%',
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBar: {
    backgroundColor: 'gray',
    width: '100%',
    height: '72px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  test: {
    width: '48px',
    height: '64px',
    outline: '1px solid black',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
}));

function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root} elevation={3}>
        Standard Controls
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Modify HP"
            color="primary"
          />
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Kill Mob"
            color="primary"
          />
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Apply Move"
            color="primary"
          />
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Activate Trigger"
            color="primary"
          />

          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Damage Calc"
            color="primary"
          />
        </div>

      </div>


      <Paper className={classes.root} elevation={3}>
        Advanced Controls *can ruin fight if used incorrectly
      </Paper>
      <div className={classes.bar}>

        <div className={classes.statBar}>
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Modify JSON"
            color="primary"
          />
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Change Mob"
            color="primary"
          />
          <Chip
            onClick={() => alert('Feature Not Implimented Yet')}
            label="Special Controls"
            color="primary"
          />
        </div>

      </div>
    </>

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  result: state.globalReducer.result,
  bossData: state.globalReducer.curMob,
});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  alertMessage: (val) => dispatch(alertMessage(val)),
  sagaStart: () => dispatch(sagaStart()),
  modifyCurTurn: (spot, data) => dispatch(modifyCurTurn(spot, data))

});

export default connect(
  mapState,
  mapDispatch
)(App);



