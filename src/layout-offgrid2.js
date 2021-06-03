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

  // return

    const root = document.querySelector(`${selector}`) 
    const els = document.querySelectorAll(`${selector} .project`);

    els.forEach( (el,i) => {
      
      el.style.marginRight = `${10 + Math.round( Math.random()* 200)}px` 
      // el.style.marginBottom = `${10 + Math.round( Math.random()*400)}px` 
      
    })

    

    // els.forEach( (el,i) => {
    //   const n = document.createElement('div')
    //   n.classList = 'project offgrid-spacer'
    //   n.innerHTML = `S${i}`
    //   n.style.width = `${Math.round( Math.random()*50)}px` 
    //   n.style.height = `${Math.round( Math.random()*100)}px` 
    //   root.insertBefore(n, el)
    // })
    els.forEach( (el,i) => {
      const H = i === 0 ? 100 : 400;

      const n = document.createElement('div')
      n.classList = 'offgrid-spacer'
      // n.innerHTML = `S${i}`
    
      n.style.height = `${Math.round( Math.random()*H)}px` 
      el.insertBefore(n, el.firstChild)
      // el.appendChild(n)
    })


      // const a = {
    //   x1: 0,
    //   y1: 0,
    //   x2: 100,
    //   y2: 100
    // }
    // const b = {
    //   x1: 90,
    //   y1: 10,
    //   x2: 90,
    //   y2: 90
    // }
    // console.log('touches:', touches(a,b), touches(b,a));
    // console.log('overlaps:', overlaps(a,b), overlaps(b,a));

    // const els = document.querySelectorAll(`${selector} .project`);
    // els.forEach( (el,i) => {
    //   const p = newPoint()
    //   setPosition(el, p.x, p.y)
    // })




    // MINV = 0
    // rects = []
    // W = document.querySelector(selector).getBoundingClientRect().width;
    
    // const els = document.querySelectorAll(`${selector} .project`);

    // els.forEach( (el,i) => {
    //   if( rects.length ){
    //     console.log('#', i);
    //     const useRect = getPos( el )
    //     console.log('> ', useRect);
    //     if( useRect ){
    //       rects.push( useRect )
    //       setPosition(el, useRect.x1, useRect.y1 ) 
    //     }

    //   }else{
    //     // first
    //     setPosition(el, 0, 0)
    //     rects.push( boundsToRect( el.getBoundingClientRect() ))
    //   }
    // })
    // console.log('renderOffGrid', rects);
}

const getPos = (el) => {
  const rect = getRect(el)

  let ok = false
  let attempts = 0
  let res = undefined

  while( !ok && attempts < 100 ){
    const p = newPoint()
    const movedRect = moveRect(rect, p.x, p.y)
    
    rects.forEach( r => {
      if( !ok ){
        console.log(r, movedRect, rect);
        console.log('overlaps:', (overlaps(movedRect, r)), 'touches:', (touches(r, movedRect)), 'touches:', (touches(movedRect, r)) );
        if( !touches(r, movedRect) ){
          console.log('getPos ok! ', attempts, rects.length);
          ok = true
          res = movedRect
        }
      }
    })
    attempts++;    
  }
  if( !ok ){
    console.log('getPos NOT OK', attempts, el);
  }

  return res
}

const newPoint = () => {
  return {
    x: Math.round( Math.random() * W ),
    y: Math.round(  MINV + Math.random() * 100)
  }
}

const moveRect = (r, x, y) => {
  return {
    x1:r.x1+x, 
    y1:r.y1+y,
    x2:r.x2+x,
    y2:r.y2+y
  }
}

const setPosition = (el, x, y) => {
  el.style.left = `${x}px`
  el.style.top  = `${y}}px`
}

const getRect = (el) => {
  return boundsToRect( el.getBoundingClientRect() )
}

const boundsToRect = (b) => {
  return {
    x1: Math.round(b.left),
    y1: Math.round(b.top),
    x2: Math.round(b.right),
    y2: Math.round(b.bottom)
  }
}


// Check if rectangle a contains rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
function contains(a, b) {
	return !(
		b.x1 < a.x1 ||
		b.y1 < a.y1 ||
		b.x2 > a.x2 ||
		b.y2 > a.y2
	);
}

// Check if rectangle a overlaps rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
function overlaps(a, b) {
	// no horizontal overlap
	if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;

	// no vertical overlap
	if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;

	return true;
}

// Check if rectangle a touches rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
function touches(a, b) {
	// has horizontal gap
	if (a.x1 > b.x2 || b.x1 > a.x2) return false;

	// has vertical gap
	if (a.y1 > b.y2 || b.y1 > a.y2) return false;

	return true;
}

export {
  cleanupOffgrid,
  renderOffgrid
}