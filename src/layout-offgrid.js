const cleanupOffgrid = (selector) => {

  document.querySelectorAll(`${selector} .offgrid-spacer`).forEach( s => s.remove() )

  const els = document.querySelectorAll(`${selector} .project`);

  els.forEach( (el,i) => {
    // el.style.marginRight = 'unset'    
    el.style.marginRight = ''    
  })

}

let rects = []
let W = 500;
let MINV = 0;

const renderOffgrid = (selector, data) => {

  console.log('renderOffgrid');
// return

  const root = document.querySelector(`${selector}`) 
  const els = document.querySelectorAll(`${selector} .project`);

  els.forEach( (el,i) => {
    const MAX = window.innerWidth / 4;
    el.style.marginRight = `${10 + Math.round( Math.random()* MAX)}px` 
    // el.style.marginBottom = `${10 + Math.round( Math.random()*400)}px` 
    
  })

  els.forEach( (el,i) => {
    const MAX = i === 0 ? 100 : 400;

    const rh = Math.round( Math.random()*Math.random()*MAX)
    
    const n = document.createElement('div')
    n.classList = 'offgrid-spacer'
    n.innerHTML = `S${i} ${rh}`
    n.style.height = `${rh}px` 
    
    el.insertBefore(n, el.firstChild)
  })
}

export {
  cleanupOffgrid,
  renderOffgrid
}