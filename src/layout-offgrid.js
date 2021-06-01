var boxDims = new Array();

const boxpad = 20

export const layout = (elements,x=0,dx=0) => {

	// const elements = [].concat(_elements)


	let indexes = []
	elements.forEach( (e,i) => { indexes.push(i) })
	indexes = shuffle(indexes)
	console.log(indexes);

	let minx = 0
	let miny = 0

	let availx = 10
	let availy = 10
	
	indexes.forEach( i => {


		const e = elements[i]

		console.log(e);
		
		let conflict = true;
		let box = null;

		let attempts = 0

		while (conflict && attempts < 10) {
	    const fixLeft = Math.floor(Math.random()*availx) + minx;
	    const fixTop  = Math.floor(Math.random()*availy) + miny;
	    e.style.left = `${fixLeft}px`
	    e.style.top  = `${fixTop}px`
	    
	    box = {
        top: parseInt(window.getComputedStyle(e).top) || 0,
        left: parseInt(window.getComputedStyle(e).left) || 0,
        width: parseInt(window.getComputedStyle(e).width) || 0,
        height: parseInt(window.getComputedStyle(e).height) || 0
    	}
	    
	    conflict = false;
	    // for(let j=0; j < boxDims.length; j++){
     //    if( overlap(box,boxDims[j]) ){
     //      conflict = true;
     //      break;
     //    } else {
     //      conflict = false;
     //    }                   
	    // }

	    attempts++;
		}

		minx += box.width + boxpad
		// miny += box.
		
		// boxDims.push(box)
		boxDims[i] = box

	});
}

function overlap(box1,box2) {
	var x1 = box1.left
	var y1 = box1.top;
	var h1 = box1.height;
	var w1 = box1.width;
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = box2.left;
	var y2 = box2.top;
	var h2 = box2.height;
	var w2 = box2.width;
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	var buf = 50;

	if (b1 + buf < y2 || y1 > b2 + buf || r1 + buf < x2 || x1 > r2 + buf) return false;
	return true;
}

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}