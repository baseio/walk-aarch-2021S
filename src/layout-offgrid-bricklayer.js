import Macy from 'macy'

var masonry = null;

export const renderMasonry = async (container) => {


	var list = document.querySelector(container), i;
for (i = list.children.length; i >= 0; i--) {
    list.appendChild(list.children[Math.random() * i | 0]);
}

	let w = Math.floor(document.querySelector(container).getBoundingClientRect().width / 100);

  masonry = await new Macy({
	container,
	// trueOrder: true,
	useContainerForBreakpoints: true,
	debug: true,
	// mobileFirst: true,
	columns: w,
	// margin: {
	//     y: 20,
	//     x: 10,
	// },
	// breakAt: {
	//     1200: 6,
	//     940: 5,
	//     520: 3,
	//     400: 2
	// },
  })

  console.log('M done', w)
  document.querySelectorAll('.projects .project').forEach( el => {
		el.style.width = '100px'
	})

}

export const removeMasonry = () => {
	if( masonry ){
		masonry.remove()
		document.querySelectorAll('.projects .project').forEach( el => {
			el.style.height = el.getAttribute('data-height')
    	})
	}
}