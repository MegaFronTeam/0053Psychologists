"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	// const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
	// 	// slidesPerView: 5,
	// 	...defaultSl,
	// 	slidesPerView: 'auto',
	// 	freeMode: true,
	// 	loopFillGroupWithBlank: true,
	// 	touchRatio: 0.2,
	// 	slideToClickedSlide: true,
	// 	freeModeMomentum: true,

	// });
	// new Swiper('.mobile-swiper--js', {
	// 	loop: false,
	// 	slidesPerView: 1,
	// 	spaceBetween: 10,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// 	breakpoints: {
	// 		768: {
	// 			spaceBetween: 20,
	// 			slidesPerView: 2,
	// 		},
	// 		992: {
	// 			slidesPerView: 3,
	// 		},
	// 		1200: {
	// 			slidesPerView: 4,
	// 		},
	// 	},
	// })
	const mobileSlider = new Swiper('.mobile-swiper--js', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.sCardsBlock__card-row .swiper-button-next',
			prevEl: '.sCardsBlock__card-row .swiper-button-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	})
	new Swiper('.sHelp__swiper--js', {
		freeMode: true,
		slidesPerView: 'auto',
		spaceBetween: 10,
		breakpoints: {
			960: {
				spaceBetween: 20,
				// slidesPerView: 4,
			},
		},
	})
	
	const reviewSlider = new Swiper('.sReviews__swiper--js', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
			nextEl: '.sReviews__review-row .swiper-button-next',
			prevEl: '.sReviews__review-row .swiper-button-prev',
		},
	})

	new Swiper('.headerBlock__slider--js .swiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})


	$(".custom-select-wrap").each(function () {
    const self = $(this);
    self.find(".custom-select-js").select2({
      allowClear: false,
      dropdownParent: self,
    });
  });


	const dataPickers = document.querySelectorAll('.data-picker-wrap');
	for (const dataPickerEll of dataPickers) {
		const dataPicker = dataPickerEll.querySelector('.data-picker--js');
		const dataPickerIcon = dataPickerEll.querySelector(`.data-picker ~ .icon`);

		new AirDatepicker(dataPicker, {
			autoClose: false,
			// inline: true,
			container: dataPickerEll,
			onShow() {
				dataPickerIcon.classList.add('active');
			},
			onHide() {
				dataPickerIcon.classList.remove('active');
			},
			navTitles: {
				days: 'yyyy <i>MMMM</i>',
			},
		});
	}

	$(".btn-toggle-type-input").click(function(){
		let icon = $(this).find("svg.icon use")
		let iconId = $(this).find("svg.icon use").attr("xlink:href").split("#")[1];

		 const opt = {
			'eye-off':  ['eye','password'],
			'eye':  ['eye-off','text'],
		 }
		 $(this).parent().find("input").attr("type", opt[iconId][1]);
		 icon.attr("xlink:href",`img/svg/sprite.svg#${opt[iconId][0]}`)
	})


	$(document).on("click", '.sCalendar__td--body:not(.sCalendar__td--disabled-day)', function(e){
		const self =$(this); 
		const order = window.getComputedStyle(self.parent()[0]).order
		const activeCLass= 'active';
		const line = $(".sCalendar__tr--line");
		const circle = $(".sCalendar__td .circle");
		if (!e.target.classList.contains('circle')) {
			if(!line.hasClass(activeCLass) && !self.hasClass(activeCLass)) {
				line.toggleClass(activeCLass)
			}
			line.css("order", order) 
			$( '.sCalendar__td--body.active').removeClass(activeCLass)
			$(this).toggleClass(activeCLass)
		}
	})

	let addCardBtn = document.querySelector('.sCabinet-body__add-card');
	if(addCardBtn) {
		addCardBtn.addEventListener('click', (e) => {
			e.preventDefault();
			addCardBtn.classList.toggle('active');
			document.querySelector('.sCabinet-body__new-card').classList.toggle('active');
		});
		document.addEventListener('click', (e) => {
			let modalTarget = e.target.closest('.sCabinet-body__new-card');
			let addBtnTarget = e.target.closest('.sCabinet-body__add-card');
			if(!modalTarget && !addBtnTarget) {
				addCardBtn.classList.remove('active');
				document.querySelector('.sCabinet-body__new-card').classList.remove('active');
			}
		});
	}

	document.querySelectorAll(".time-sliders__col").forEach(el =>{
		
		new Swiper(el.querySelector('.time-sliders__slider--js'), {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 0,
			observer: true,
			mousewheel: {
				invert: true,
			},
			direction: 'vertical',
			speed: 300,
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev'),
			},
		})
	})
	new Swiper('.slider-sert--js', { 
		slidesPerView: 4,
		spaceBetween: 20, 
		virtual: {
      enabled: true,
    },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	let addNote = document.querySelectorAll('.client-item__note');

	if (addNote.length > 0) {
		addNote.forEach((el) => {
			el.addEventListener('click', () => {
				el.classList.add('active');
				el.nextElementSibling.classList.add('active');
			});
		});
	
		document.addEventListener('click', (e) => {
			let addNoteTarget = e.target.closest('.client-item__note');
			let noteTarget = e.target.closest('.client-item__add-note');
	
			let addNote = document.querySelectorAll('.client-item__note');
			let note = document.querySelectorAll('.client-item__add-note');
	
			if (!addNoteTarget && !noteTarget) {
				addNote.forEach((el) => el.classList.remove('active'));
				note.forEach((el) => el.classList.remove('active'));
			}
		});
	}

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }




const btnDelArr = document.querySelectorAll(".photo-file-delete-js")

let loadFile = function(event) {
	let eventElem = event.srcElement.parentElement;

	eventElem.querySelector('.img-preview').src = URL.createObjectURL(event.target.files[0]);

	eventElem.querySelector('.img-preview').classList.add("active");
	eventElem.classList.add("border-0")
	if(eventElem.querySelector(".photo-file-delete-js")) {
		eventElem.querySelector(".photo-file-delete-js").classList.remove("d-none")
	}
}; 

if(btnDelArr.length > 0) {
	btnDelArr.forEach((btnDel) => {
		btnDel.addEventListener("click", function(){
			this.classList.add("d-none");
			
			btnDel.parentElement.querySelector('.img-preview').classList.remove("active")
			btnDel.parentElement.querySelector('.img-preview').src = "";
			btnDel.parentElement.querySelector('[onchange="loadFile(event)"]').value = '';  
			btnDel.parentElement.classList.remove("border-0");
		})
	})
	
}
