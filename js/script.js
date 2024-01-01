'use strict';



/*add event on element*/

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/*navbar toggle*/

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/*header and back top btn active*/

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});




const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");



let formStepsNum= 0;

nextBtns.forEach((btn) => {
	btn.addEventListener("click",() => {
		formStepsNum++;
		updateFormSteps();
		updateProgressBar();
	});
});
prevBtns.forEach((btn) => {
	btn.addEventListener("click",() => {
		formStepsNum--;
		updateFormSteps();
	});
});

function updateFormSteps(){
	formSteps.forEach(formStep =>{
		formStep.classList.contains("form-step-active")&& 
		formStep.classList.remove("form-step-active");
	});
	formSteps[formStepsNum].classList.add("form-step-active");
}
 function updateProgressBar(){
 	progressSteps.forEach((progressStep ,idx )=> {
 		if(idx < formStepsNum + 1){
 			progressStep.classList.add("progress-step-active");
 		} else{
 			progressStep.classList.remove("progress-step-active");
 		}
 	});
 	
 	const progressActive = document.querySelectorAll(".progress-step-active");
 	progress.style.width =
 	 ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%" ;
 }