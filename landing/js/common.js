document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelectorAll('.hamburger');
  const overlay = document.querySelector('.overlay');
  const pageHeader = document.querySelector('.page-header');

  hamburger.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('open');
      overlay.classList.toggle('open');
      pageHeader.classList.toggle('open');
      document.body.classList.toggle('overflow');
  
      overlay.addEventListener('click', () => {
        el.classList.remove('open');
        overlay.classList.remove('open');
        pageHeader.classList.remove('open');
        document.body.classList.remove('overflow');
      });
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
  var rangeSlider = document.querySelector(".slider-range");

  if(rangeSlider) {

    noUiSlider.create(rangeSlider, {
      start: [50],
      connect: [true, false],
      step: 1,
      range: {
        min: [1000],
        max: [10000000]
      }
    });

    var rangeSliderValueElement = document.querySelector(".slider-range-value");

    rangeSlider.noUiSlider.on("update", function(values, handle) {
      rangeSliderValueElement.value = values[handle] + ' ₽';
    });
  }
  class Mmodal {
    constructor(options = {}) {
      const {
        open = '.contacts__btn',
        modal = '.modal',
        close = '.modalClose',
      } = options;

      this.open = open;
      this.modal = modal;
      this.close = close;
      this.init();
    }
    
    toggleModal() {  
      const modal = document.querySelector(this.modal);
      const open = document.querySelectorAll(this.open);
      
      open.forEach(elem => {
        elem.addEventListener('click', (e) => {
          e.preventDefault();
          modal.classList.add('modal--open');
          modal.setAttribute('tabindex', '-1');

          modal.addEventListener('animationend', () => {
            modal.firstElementChild.classList.add('modal__content--open');
          });

          modal.addEventListener('click', event => {
            const target = event.target;
            if(target.closest(this.close) || target.closest(this.modal) && !target.closest('.modal__content')) {
              modal.firstElementChild.classList.remove('modal__content--open');
              modal.classList.remove('modal--open');
              modal.removeAttribute('tabindex');
            }
          });

        });

      });
    }

    init() {
      this.toggleModal();
    }
  }

  new Mmodal();

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
  $.mask.definitions.q = "[1,2,3,4,5,6,9]";
  $('input[type="tel"]').mask('+7 (q99) 999-99-99');



  $('.card').on('click', function() {
    $(this).toggleClass('open');
    $('.card__back').parent('.card').removeClass('open');
  });

  $('select').niceSelect();


});


$(document).ready(function () {
  function topOffset(x) {
    var scrollTop = $(window).scrollTop(),
      elementOffset = x.offset().top,
      distance = (elementOffset - scrollTop);
    return distance;
  };
  var count = ($('.scrollytrigger').length);

  sectionsPadding = $('.scrollytitle').height();
  // $('.scrollysections').css("margin-bottom", sectionsPadding);

  for (step = 0; step < count; step++) {
    $('.scrollytrigger').eq(step).addClass(step + "b");
    $('.scrollytitle').eq(step).addClass(step + "t");
  };

  $(window).on('scroll', function () {
    for (step = 0; step < count; step++) {
      var trigger = $('.' + step + 'b'),
        title = $('.' + step + 't'),
        scrollTop = $(window).scrollTop(),
        elementOffset = trigger.offset().top,
        distance = (elementOffset - scrollTop);
      var offset = 98 + title.height() + 16;
      if (distance < (topOffset(title) + 16)) {
        $('.scrollytrigger').removeClass('scrollyactive');
        trigger.addClass('scrollyactive');
        $('.scrollytitle').removeClass('scrollyactive');
        title.addClass('scrollyactive');
      }
      offset = title.height();
    };
  });
});

$(document).ready(function () {
  $('.tabs__head').on('click', function() {
    
    let target = $(this).data('target');
    let tabs = $(this).closest('.tabs');
    let items = tabs.find('.tabs__item').not(target);
    let heads = tabs.find('.tabs__head');
    let content = tabs.find('.tabs__content');
    let activeTab = items.filter('.active');
    let activeTabHeight = activeTab.height();
    let targetHeight = $(target).height();

    content.css({'height': activeTabHeight});
    
    heads.removeClass("active")
    $(this).addClass('active');
    items.removeClass('active').fadeOut()
    $(target).addClass('active').fadeIn();
    setTimeout(() => {
      content.css({'height': targetHeight});  
    }, 40);
    setTimeout(() => {
      content.css({'height': 'auto'});  
    }, 320);
  });

  if (window.location.pathname === '/documents/disclosure') {
    let tabs = $('.tabs');
    let disclosureTab = tabs.find('.tabs-item-1');
    let activeTab = tabs.find('.tabs__item.active');
    let activeTabHead = tabs.find('.tabs__head.active');
    let dTabHead = tabs.find('.tabs__head').not('.active');
    activeTab.removeClass('active').css({display: 'none'});
    disclosureTab.addClass('active').css({display: 'block'});
    activeTabHead.removeClass('active');
    dTabHead.addClass('active');
  }
});


const player = document.querySelector("lottie-player");
player.load(player.getAttribute('src'));