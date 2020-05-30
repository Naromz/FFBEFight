
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { modifyCurTurn, updateCurActions } from '../actions/globalActions'
import styled from 'styled-components'
import { serverAddress } from '../sources'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { CalcPhysicalDamage } from '../Services/loadData'

import { UpdateActions } from '../Services/loadData'

const useStyles = makeStyles({
  table: {
    minWidth: 550,
    backgroundColor: 'white',
    minHeight: 40,
    overflow: 'scroll'
  },
  tableRow: {
    WebkitUserSelect: 'none',
    '&:hover': {
      backgroundColor: 'gray'
    },
    '&:active': {
      backgroundColor: 'lightgray'
    }
  },
  tableHead: {
    backgroundColor: 'lightGray',
    outline: '1px solid black',
    boxShadow: '0 1px 4px 0'
  },
  container: {
    maxHeight: '204px',
    minHeight: 204,
  },
});


function LoadMoveArr({ data, pos }) {
  let moves = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].spot == pos) {
      if (data[i].data.length == 1) {
        moves = [data[i].data[0]];
      }
      else {
        moves = data[i].data.map((val) => { return val });
      }
    }
  }
  return moves.map((val, idx) => {
    return (
      <img key={idx} style={{ border: '1px solid black', borderRadius: '4px', width: '48px', height: '48px' }} src={serverAddress() + `/images/type/move/name/${val.icon}`} />
    )
  })

}

function findUnitMoves(data, pos) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].spot == pos) {
      return data[i].data;
    }
  }
}

function findEquip(data, pos) {
  if (data?.length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].spot == pos) {
        return data[i].data;
      }
    }
  }

  return null;
}
function FindPhysDamage(move, equip, mob) {

  let raceCalc = 1;

  if (equip) {
    let races = [];
    mob.race.forEach((val) => {
      if (equip.calculatedValues.killers[val]) {
        races.push(equip.calculatedValues.killers[val].physical + 100);
      }

    });

    raceCalc = 0;
    races.forEach((val) => {
      raceCalc = raceCalc + val;
    })

    raceCalc = raceCalc / races.length;
    raceCalc *= .01;
  }
  let effects = move[0].effects;
  let effIdx = 0;
  let modifier = 0;
  for (effIdx = 0; effIdx < effects.length; effIdx++) {
    if (effects[effIdx]?.effect?.damage) {
      modifier = modifier + effects[effIdx]?.effect?.damage.coef
    }

  }

  let atk = equip.calculatedValues.atk.value;
  let def = mob.def;
  let level = equip.level;
  let breakVal = 1;
  let buffVal = 1;
  let defIgn = 0;
  console.log(atk, def, level, modifier, 1, 1, raceCalc, defIgn);


  return CalcPhysicalDamage(atk, def, level, modifier, 1, 1, raceCalc, defIgn);
}


function GetMoves(props) {
  const classes = useStyles();
  let i = 0;
  let found = false;
  var moves;
  var unitUid;
  for (i = 0; i < props.unitData.length; i++) {
    if (props.selUnit === props.unitData[i].selected) {
      found = true;
      moves = props.unitData[i].unitData.moves;
      unitUid = props.unitData[i].unitData.uuid
    }

  }


  return moves.map((val, idx) => {
    var moveDesc = val?.effects[0]?.desc;
    if (val?.effects[0]?.effect?.multicast) {
      moveDesc = "Multicast";
    }

    return (
      <TableRow onClick={() => { props.setMoveData(val, unitUid); UpdateActions(); }} className={classes.tableRow} key={idx}>
        <TableCell><img style={{ width: '48px', height: '48px' }} src={serverAddress() + `/images/type/move/name/${val.icon}`} /></TableCell>
        <TableCell>{val.name}</TableCell>
        <TableCell>{moveDesc}</TableCell>
      </TableRow>

    )
  })



}



function App(props) {
  var [move, setMove] = useState();
  var [selMove, setSelMove] = useState();
  var [link, setLink] = useState('');
  const classes = useStyles();

  useEffect((val) => {
    console.log('updated');
  }, [props.curTurn])
  function CalcDamage() {
    return FindPhysDamage(findUnitMoves(props.turnData, props.curUnit), findEquip(props.curEquip, props.curUnit), props.curMob)
  }
  return (
    <Box>
      <MoveSelectionDetail>{findUnitMoves(props.turnData, props.curUnit) && findEquip(props.curEquip, props.curUnit) && <>{`Damage For Unit: ${CalcDamage()} Total HP %: ${CalcDamage() / props.curMob.initalhp * 100} `}</>}</MoveSelectionDetail>
      <MoveSelectionDetail><LoadMoveArr data={props.turnData} pos={props.curUnit} /> </MoveSelectionDetail>
      <UnitMoveTableCont>
        <TableContainer className={classes.container}>


          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Move</TableCell>
                <TableCell>Effects</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <GetMoves setMoveData={(val, uid) => props.modifyCurTurn(props.curUnit, val, uid)} selUnit={props.curUnit} unitData={props.unitData} />
            </TableBody>
          </Table>
        </TableContainer>

      </UnitMoveTableCont>


    </ Box>

  );

}
//THIS FUNCTION MAPS STORE TO STATE
const mapState = state => ({
  curUnit: state.globalReducer.selunitplace,
  unitData: state.globalReducer.selUnitData,
  turnData: state.globalReducer.curTurn,
  curMob: state.globalReducer.curMob,
  curEquip: state.globalReducer.curEquip,

});


//THIS FUNCTION IS USED TO MAP ACTIONS TO FUNCTIONS
const mapDispatch = dispatch => ({
  modifyCurTurn: (spot, data, uid) => dispatch(modifyCurTurn(spot, data, uid)),


});

export default connect(
  mapState,
  mapDispatch
)(App);


var Box = styled.div`
width:680px;
height:300px;
outline:2px solid black;
display:flex;
flex-direction:column;
align-items:flex-start;
`
var MoveSelectionDetail = styled.div`
width:680px;
height:48px;
outline:1px solid black;
display:flex;
align-items:center;
justify-content:center;
`
var UnitMoveTableCont = styled.div`
width:680px;
height:204px;
outline:1px solid black;
`