
export default function getObject(theObject) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = getObject(theObject[i]);
      if (result) {
        break;
      }
    }
  }
  else {
    for (var prop in theObject) {
      console.log(prop + ': ' + theObject[prop]);
      if (prop === 'id') {
        if (theObject[prop] === 1) {
          return theObject;
        }
      }
      if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
        result = getObject(theObject[prop]);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}