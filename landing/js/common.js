document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.overlay');
  const pageHeader = document.querySelector('.page-header');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    pageHeader.classList.toggle('open');
    document.body.classList.toggle('overflow');

    overlay.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      pageHeader.classList.remove('open');
      document.body.classList.remove('overflow');
    });
  });

  class Accordion  {
    constructor(options = {}) {
      const {
        accordionEl = '.accordionBtn',
      } = options;
      this.accordionEl = accordionEl;
      this.init();
    }
    init() {
      const accordionBtn = document.querySelectorAll(this.accordionEl);
      accordionBtn.forEach((element, index, arr) => {
        element.addEventListener('click', () => {
          element.classList.toggle('open');
        });
      });
    }
  }

  if(window.innerWidth <= 767) {
    new Accordion({accordionEl:'.docBtn'});
  }
  const phoneMask = document.querySelectorAll('input[type="tel"]');
  phoneMask.forEach(element => {
    IMask(element, {
      mask: '+{7} (000) 000-00-00'
    });
  });
  phoneMask[0].addEventListener('click', function() {
    if(this.value.length === 0) {
      this.value = '+7'
    }
  })
});
$(document).ready(function () {
  $('.accordionBtn').on('click', function() {
    $(this).toggleClass('open');
    $(this).next().slideToggle();
  });

  function valLength(count, el) {
    if($(el).val().length < count) {
      $(el).addClass('invalid');
    } else {
      $(el).removeClass('invalid');
    }
  }
  $('.formSend').on('submit', function(e) {
    // e.preventDefault();
    valLength(3, '.formSendName');
    valLength(17, '.formSendTel');


  });

  $('.formSendName').on('keypress', function() {
    valLength(3, '.formSendName');
  });
  $('.formSendTel').on('keypress', function() {
    valLength(17, '.formSendTel');
  });

    $(window).scroll(function() {
      if ($(window).scrollTop() > 250) {
        $('.page-header--second').addClass('open');
      } else if($(window).scrollTop() < 250) {
        $('.page-header--second').removeClass('open');
      }
  });
});