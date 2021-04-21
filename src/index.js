
const MODE = {onoff:true, gridline:true}

const PROJECTS_ELM = document.querySelector('.projects')

const setup = () => {
  document.querySelector('.modetoggle > .onoff').addEventListener('click', (e) => {
    MODE.onoff = !MODE.onoff
    e.target.innerHTML = MODE.onoff ? 'ON' : 'OFF'
    render()
  })
  document.querySelector('.modetoggle > .gridline').addEventListener('click', (e) => {
    MODE.gridline = !MODE.gridline
    e.target.innerHTML = MODE.gridline ? 'GRID' : 'LINE'
    render()
  })
  render_projects()
}

const render_projects = () => {
  let html = ''
  for(let i=0; i<50; i++){
    html += `<div class="project">P-${i}</div>`
  }
  PROJECTS_ELM.innerHTML = html
}

const render = () => {
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
    document.querySelectorAll('.projects .project').forEach( el => {
      console.log(el);
      el.style.top  = Math.random() * 1000 + 'px'
      el.style.left = Math.random() * 1000 + 'px'
    })
  }
  console.log('mode:', className);
  document.querySelector('.copy > h2').innerHTML = className
  PROJECTS_ELM.classList = 'projects '+ className
}

setup()
render()