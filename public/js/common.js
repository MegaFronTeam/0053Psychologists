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

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	new Swiper('.mobile-swiper--js', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
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
	new Swiper('.sReviews__swiper--js', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 20,
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


	$(document).on("click", '.sCalendar__td--body', function(){
		const self =$(this); 
		const order = window.getComputedStyle(self.parent()[0]).order
		const activeCLass= 'active';
		const line = $(".sCalendar__tr--line");
		if(!line.hasClass(activeCLass) && !self.hasClass(activeCLass)) {
			line.toggleClass(activeCLass)
		}

		line.css("order", order) 
		$( '.sCalendar__td--body.active').removeClass(activeCLass)
		$(this).toggleClass(activeCLass)
	})

	let addCardBtn = document.querySelector('.sCabinet-body__add-card');
	if(addCardBtn) {
		addCardBtn.addEventListener('click', (e) => {
			e.preventDefault();
			addCardBtn.classList.toggle('active');
			document.querySelector('.sCabinet-body__new-card').classList.toggle('active');
		});
	}
	document.addEventListener('click', (e) => {
		let modalTarget = e.target.closest('.sCabinet-body__new-card');
		let addBtnTarget = e.target.closest('.sCabinet-body__add-card');
		if(!modalTarget && !addBtnTarget) {
			addCardBtn.classList.remove('active');
			document.querySelector('.sCabinet-body__new-card').classList.remove('active');
		}
	});
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
