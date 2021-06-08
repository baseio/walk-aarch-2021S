const menudata = [
	['ON/OFF', '', null],
	['Architects', 'list:architects', null],
	['Categories', 'categories',
		[
			['New Commons', 'cat:new-commons', null],
			['Building Culture', 'cat:building-culture', null],
			['Urban Development', 'cat:urban-development', null],
			['Sustainable Architecture', 'cat:sustainable-architecture', null],
			['Landscapes in Transition', 'cat:landscapes-in-transition', null],
			['Cultural Heritage', 'cat:cultural-heritage', null],
			['Extreme Architecture', 'cat:extreme-architecture', null],
		]
	],
	['Search', 'search', null],
	['About', 'about',
		[
			['Rector’s Speech', 'page:rectors-speech', null],
			['Curators voice', 'page:curators-voice', null],
			['Prizes', 'page:prizes', null],
			['Credits', 'page:credits', null],
			['Contact', 'page:contact', null],
		]
	]
]


export const buildMenu = (selector = '.menu') => {

	console.log('buildMenu selector', selector);
	
	let html = ''

	menudata.forEach( m => {
		if( m[2] != null ){
			// start menu group
			html += `<div data-menu-action='toggle' data-menu-key='${m[1]}'>${m[0]}</div><div class="grpc" id='${m[1]}'>`
			m[2].forEach( sm => {
				html += `<div class='sml' data-menu-action='go' data-menu-key='${sm[1]}'><span>${sm[0]}</span></div>`
			})
			html += `</div>`
		}else{
			html += `<div data-menu-action='go' data-menu-key='${m[1]}'>${m[0]}</div>`
		}
	})

	document.querySelector(selector).innerHTML = html

	document.querySelectorAll(selector + ` [data-menu-action="go"]`).forEach( el => {
		el.addEventListener('click', () => {

			// unselect others, select self
			document.querySelectorAll(selector +' .selected').forEach(el => el.classList.remove('selected'));
			el.classList.add('selected');

			// select parent if we're a submenu item
			if( el.parentElement.classList.contains('grpc') ){
				el.parentElement.previousElementSibling.classList.add('selected')
			}
			
			if( !el.classList.contains('sml') ){
				// we're not a submenu-item, so collapse others
				document.querySelectorAll(selector +' .grpc.open').forEach(el => el.classList.remove('open'));
			}

			window.location.hash = `#${ el.getAttribute('data-menu-key') }`
		})
	})

	document.querySelectorAll(selector + ` [data-menu-action="toggle"]`).forEach( el => {
		el.addEventListener('click', () => {

			if( el.classList.contains('selected') ){
				el.classList.remove('selected');
				document.querySelector(`#${el.getAttribute('data-menu-key')}`).classList.remove('open');
				return;
			}else{
			
				//unselect others, select self
				document.querySelectorAll(selector +' .selected').forEach(el => el.classList.remove('selected'));
				el.classList.add('selected');

				

				// collapse others, open self
				document.querySelectorAll(selector +' .grpc.open').forEach(el => el.classList.remove('open'));
				document.querySelector(`#${el.getAttribute('data-menu-key')}`).classList.add('open');
			
			}

		})
	})

}