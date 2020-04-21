import store from '../store'
import { loadBosses, changeActiveBoss } from '../actions/globalActions'


export default function LoadStuff() {
  store.dispatch(loadBosses());
}