
import PAGES from './pages.js'
import DATA from '../tools/students.json';
// console.log('students', DATA);

import {nl2br} from './utils.js';
import {buildMenu} from './menu.js';
import {renderOffgrid, cleanupOffgrid} from './layout-offgrid.js'

const MODE = {onoff:true, gridline:false};
const PROJECTS_ELM = document.querySelector('.projects');
let MOUSE_PRESSED = false;
let SEARCH_STRING = '';
let PROJECTS_ELM_SCROLLWIDTH = 0;


const onHashChanged = () => {
  const h = window.location.hash
  console.log('onHashChanged', h);

  cleanupOffgrid('.projects')
  
  if( h.indexOf('#page:') === 0 ){
    SEARCH_STRING = ''
    render_projects(false);
    render_page(h.split('#page:')[1])

  }else if( h.indexOf('#search') === 0 ){
    SEARCH_STRING = h.split('#search:')[1]
    MODE.onoff = true
    MODE.gridline = true
    render_projects();
    render_search();

  }else if( h.indexOf('#list') === 0 ){
    render_projects(false);
    render_list( h.split('#list:')[1] )
  
  }else{
    SEARCH_STRING = ''
    render_projects();

    render_page( modeToClass() )
  }
}

const setup = () => {

  onHashChanged()
  buildMenu()
  render_toggle()

  window.addEventListener('hashchange', onHashChanged );
  window.addEventListener('mousedown', () => { MOUSE_PRESSED = true }, false);
  window.addEventListener('mouseup', () => { MOUSE_PRESSED = false }, false);

  document.querySelector('.modetoggle > .onoff').addEventListener('click', (e) => {
    MODE.onoff = !MODE.onoff
    render_toggle();
    render_page( modeToClass() )
    render()
  })
  document.querySelector('.modetoggle > .gridline').addEventListener('click', (e) => {
    MODE.gridline = !MODE.gridline
    render_toggle();
    render_page( modeToClass() )
    render();
  })
  
  update()
  render()

  // open submenu by url
  const h = window.location.hash
  if( h.indexOf('#page:') === 0 ){
    document.querySelector('div[data-menu-key="about"]').click()
  }
  if( h.indexOf('#cat:') === 0 ){
    document.querySelector('div[data-menu-key="categories"]').click()
  }
}

const render_list = (list) => {
  let listHeadline = list
  let listContent = ''

  if( list === 'architects' ){
    listHeadline = 'Architects'
    listContent = ''
    DATA.forEach( s => {
      listContent += `<a href="" style="width:45%;display:inline-block;">${s.name}</a>`
    })
  }
  
  
  let html = `
    <h2>${listHeadline}</h2>
    ${listContent}
  `
  document.querySelector('.copy').setAttribute('data-page', list)
  document.querySelector('.copy').innerHTML = html
}

const render_page = (page) => {

  let html = `
    <h2>404</h2>
    <p>Page "${page}" not declared in pages.js</p>
  `

  if( Object.keys(PAGES).includes(page) ){
    html = PAGES[page]
    html = html.trim()
    html = nl2br(html)
  }

  document.querySelector('.copy').setAttribute('data-page', page)
  document.querySelector('.copy').innerHTML = html
}

const render_search = () => {
  document.querySelector('.copy').setAttribute('data-page', 'search')
  document.querySelector('.copy').innerHTML = `
    <h2>Search</h2>
    <div>
      <input class="searchfield" type="text" value="${SEARCH_STRING || ''}" placeholder="Search for an Architect here">
    </div>
  `
  document.querySelector('.searchfield').addEventListener("input", (el) => {
    console.log('input', el.target.value);
    SEARCH_STRING = el.target.value.toLowerCase()
    render_projects()
  })

  document.querySelector('.searchfield').addEventListener("change", (el) => {
    console.log('change', el.target.value);
    window.location.hash = 'search:'+ el.target.value.toLowerCase()
  })
}

const render_projects = (show=true) => {

  if( show === false ){
    PROJECTS_ELM.innerHTML = ''
    return;
  }

  let themefilter = window.location.hash.indexOf('#cat:') === 0
    ? window.location.hash.split('#cat:')[1]
    : null;

  console.log('themefilter:', themefilter);  

  
  let html = ''

  if( themefilter ){
    html += `<div class="themefilter"><span></span> ${themefilter}</div>`
    PROJECTS_ELM.style.marginTop = '30px'
  }else{
    PROJECTS_ELM.style.marginTop = '0'
  }

  DATA.forEach( (s,i) => {
    if( themefilter && s.theme != themefilter ){
      // filter out
    }else if( SEARCH_STRING != '' ){

      const search = `${s.name}`.toLowerCase()
      const match = search.indexOf(SEARCH_STRING) > -1

      if( match ){
        html += `<div class="project">
          <img class="project-image" src="images/${s.id}.jpg" />
          <div class="project-meta">${s.name}<br /><br />
            <div class="project-title">${s.title}</div>
          </div>
        </div>`
      }
    
    }else{

      html += `<div class="project" data-url="${s.slug}">
        <img class="project-image" src="images/${s.id}.jpg" alt="${s.title}"/>
        <div class="project-meta">${s.name}<br /><br />
          <!-- <div class="project-title">${s.title}</div> -->
        </div>
      </div>`

    }
  })
  PROJECTS_ELM.innerHTML = html

  document.querySelectorAll('.project').forEach( el => {
    el.addEventListener('click', () => {
      console.log( el.getAttribute('data-url') )
      document.location.href = el.getAttribute('data-url')
    })
  })

  if( themefilter ){
    document.querySelector('.themefilter').addEventListener('click', () => {
      window.location.hash = ''
      // clear selection from menu
      document.querySelectorAll('.menu .selected').forEach(el => el.classList.remove('selected'));
    })
  }
}

const render_toggle = () => {
  document.querySelector('.modetoggle > span.onoff').innerHTML = MODE.onoff ? 'ON' : 'OFF';
  document.querySelector('.modetoggle > span.gridline').innerHTML = MODE.gridline ? 'GRID' : 'LINE';
}

const render = () => {
  
  // removeMasonry()
  cleanupOffgrid('.projects')

  const className = modeToClass()

  PROJECTS_ELM.classList = 'projects '+ className

  if( className === 'offgrid' ){
    renderOffgrid('.projects')
  }

  if( className === 'online' ){
    // console.log('render scrollWidth #1:', PROJECTS_ELM.scrollWidth);
    PROJECTS_ELM_SCROLLWIDTH = PROJECTS_ELM.scrollWidth
    // duplicate fist nodes
    for(let i=0; i<20; i++){
      PROJECTS_ELM.appendChild( PROJECTS_ELM.childNodes[i].cloneNode(true) )
    }

    // const s = window.getComputedStyle(PROJECTS_ELM.firstChild)
    // console.log(s);
    // console.log(s['margin-right'], s['width']);
    PROJECTS_ELM_SCROLLWIDTH -= 150 // 150 is a magic number :( 
    // el is 200px wide, and has a margin of 40px
      

    // console.log('render scrollWidth #2:', PROJECTS_ELM_SCROLLWIDTH);
  }
  
  // console.log('render mode:', className);
}

const update = () => {

  // if( MOUSE_PRESSED && MODE.onoff && !MODE.gridline ){
  //   console.log(PROJECTS_ELM.scrollLeft, PROJECTS_ELM_SCROLLWIDTH )
  // }


  if( !MOUSE_PRESSED && MODE.onoff && !MODE.gridline ){
    PROJECTS_ELM.scrollBy(1,0)

    // console.log(PROJECTS_ELM.scrollLeft, PROJECTS_ELM_SCROLLWIDTH )
    // if( PROJECTS_ELM.scrollLeft === (PROJECTS_ELM.scrollWidth - PROJECTS_ELM.offsetWidth)){
    if( PROJECTS_ELM.scrollLeft > PROJECTS_ELM_SCROLLWIDTH){
      PROJECTS_ELM.scrollTo(0,0)
    }
  }
  requestAnimationFrame( update )
}

const modeToClass = () => {
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

setup()