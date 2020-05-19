export function serverAddress() {

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3005'
  } else {
    return 'http://codinghaze.com:3005'
  }
}
