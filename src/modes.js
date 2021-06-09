export const modeToClass = () => {
  let className = ''
  if( MODE.onoff === false && MODE.gridline === false ){
    className = 'offline'
  }
  if( MODE.onoff === true && MODE.gridline === false ){
    className = 'online'
  }
  if( MODE.onoff === true && MODE.gridline === true ){
    className = 'ongrid'
  }
  if( MODE.onoff === false && MODE.gridline === true ){
    className = 'offgrid'
  }
  return className
}

export const classToMode = (className) => {

  if( className === 'offline' ){
    MODE.onoff = false
    MODE.gridline = false
  }
  if( className === 'online' ){
    MODE.onoff = true
    MODE.gridline = false
  }
  if( className === 'ongrid' ){
    MODE.onoff = true
    MODE.gridline = true
  }
  if( className === 'offgrid' ){
    MODE.onoff = false
    MODE.gridline = true
  }
}


const MODES = ['ongrid', 'offgrid', 'online', 'offline']

export const nextMode = () => {
  const curr = MODES.indexOf( modeToClass() )
  const next = (curr + 1) % MODES.length
  classToMode( MODES[next] )
}