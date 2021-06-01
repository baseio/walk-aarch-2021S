
import _DATA from '../tools/students.json';
console.log('students', _DATA);

// make all themes lower-case and replace spaces
const DATA = _DATA.map( s => {
  let t = s.theme.toLowerCase().replace(/ /g, '-')
  return {...s, theme:t}
})
console.log('students DATA', DATA);

import {buildMenu} from './menu.js'

// import {setRandomPos} from './layout-offgrid.js'
import {renderMasonry, removeMasonry} from './layout-offgrid-bricklayer.js'

const MODE = {onoff:true, gridline:false}

const PROJECTS_ELM = document.querySelector('.projects')

let MOUSE_PRESSED = false;

const onHashChanged = () => {
  const h = window.location.hash
  console.log('onHashChanged', h);
  
  // TODO: Pages or Projects?
  render_projects()
}

const setup = () => {

  buildMenu('.menu')
  render_toggle()

  window.addEventListener('hashchange', onHashChanged );
  window.addEventListener('mousedown', () => { MOUSE_PRESSED = true }, false);
  window.addEventListener('mouseup', () => { MOUSE_PRESSED = false }, false);

  document.querySelector('.modetoggle > .onoff').addEventListener('click', (e) => {
    MODE.onoff = !MODE.onoff
    render_toggle();
    render()
  })
  document.querySelector('.modetoggle > .gridline').addEventListener('click', (e) => {
    MODE.gridline = !MODE.gridline
    render_toggle();
    render();
  })
  render_projects()
  update()
}

const render_projects = () => {

  let themefilter = window.location.hash.indexOf('#cat:') === 0
    ? window.location.hash.split('#cat:')[1]
    : null;

    
  let html = ''
   DATA.forEach( (s,i) => {

      if( themefilter && s.theme != themefilter ){
      // filter out
      }else{

        html += `<div class="project" style="width:200px;">
          <img class="project-image" src="images/${s.id}.jpg" />
          <div class="project-meta">${s.firstname} ${s.surname}<br /><br />
          ${s.title}<br />
          [${i},${s.id}, ${s.theme}]</div>
        </div>`

      }
  })
  PROJECTS_ELM.innerHTML = html
}

const render_toggle = () => {
  document.querySelector('.modetoggle > span.onoff').innerHTML = MODE.onoff ? 'ON' : 'OFF';
  document.querySelector('.modetoggle > span.gridline').innerHTML = MODE.gridline ? 'GRID' : 'LINE';
}

const render = () => {
  
  removeMasonry()

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
    // document.querySelectorAll('.projects .project').forEach( el => {
    //   el.style.top  = Math.random() * 1000 + 'px'
    //   el.style.left = Math.random() * 1000 + 'px'
    // })
    // setRandomPos( document.querySelectorAll('.projects .project') )
    renderMasonry( '.projects' );

  }
  console.log('mode:', className);
  document.querySelector('.copy > h2').innerHTML = className
  PROJECTS_ELM.classList = 'projects '+ className
}

const update = () => {
  if( !MOUSE_PRESSED && MODE.onoff && !MODE.gridline ){
    // console.log('updating!');
    PROJECTS_ELM.scrollBy(1,0)
  }

  requestAnimationFrame( update )
}

setup()
render()