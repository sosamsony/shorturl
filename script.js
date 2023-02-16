
//The mobile hamburger menu

let mobileMenu = document.querySelector('.mobile-menu');
mobileMenu.style.display = 'none';

let mobileHamburgerIcon = document.querySelector('.fa-bars');

mobileHamburgerIcon.addEventListener('click', showMobileMenu);

function showMobileMenu() {

    if(mobileMenu.dataset.mobileMenu == "false") {
        mobileMenu.style.display = '';
        mobileMenu.dataset.mobileMenu = "true"
    } else {
        mobileMenu.style.display = 'none';
        mobileMenu.dataset.mobileMenu = "false"
    }
    
}



//The shorten urls section

let shortUrlsWrapper = document.querySelector('.shortened-urls-wrapper');


let errorMessage = document.querySelector('.error');

errorMessage.style.display = 'none';

let userURL = document.querySelector('.url');

let shortenedUrl = document.querySelector('.shortened-url');
shortenedUrl.style.display = 'none';

let shortenBtn = document.querySelector('.shortenBtn');


userURL.addEventListener('focus', hideTheErrorMessage);


function hideTheErrorMessage() {
  errorMessage.style.display = 'none';
}

let urlValidationRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
let originalURL = '';
let shortenURL = '';


shortenBtn.addEventListener('click', shortenTheURL);

function shortenTheURL() {
  if(urlValidationRegex.test(userURL.value)) {
    originalURL = `${userURL.value}`
    fetch(`https://api.shrtco.de/v2/shorten?url=${userURL.value}`, {
    method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
  
     shortenURL = `${data.result.short_link}`;
     if(userURL.value.length > 22) {
      document.querySelector('.original').textContent = `${userURL.value.slice(0, 22)}...`;
     } else {
      document.querySelector('.original').textContent = `${userURL.value}`;
     }
     document.querySelector('.short').textContent = `${data.result.short_link}`;
     userURL.value = '';
     //console.log(data.result.short_link);
   })
   shortenedUrl.style.display = '';

  } else {
    errorMessage.style.display = '';
  }
}

function showErrorMessage() {
  errorMessage.style.display = '';
}


let copybtn = document.querySelector('.copy');

copybtn.addEventListener('click', copyText);

function copyText() {
  
let shorturl = document.querySelector('.short').textContent;
navigator.clipboard.writeText(shorturl);
  copybtn.classList.remove('copy');
  copybtn.classList.add('copied');
  copybtn.textContent = 'Copied!'
  setTimeout(function textcopied() {
    copybtn.classList.add('copy');
    copybtn.classList.remove('copied');
    copybtn.textContent = 'Copy'
  }, 2000)

}

 

