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

  class Accordion {
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

  if (window.innerWidth <= 767) {
    new Accordion({accordionEl: '.docBtn'});
  }
  var rangeSlider = document.querySelector(".slider-range");

  if (rangeSlider) {

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

    rangeSlider.noUiSlider.on("update", function (values, handle) {
      rangeSliderValueElement.value = values[handle] + ' ₽';
    });
  }

});

$(document).ready(function () {
  $('.accordionLink').on('click', function () {
    $(this).closest('li').find('.accordion-content').slideToggle();
    $(this).closest('li').find('.accordionBtn').toggleClass('open');
  });

  $('.accordionBtn').on('click', function () {
    $(this).toggleClass('open');
    $(this).next().slideToggle();

    if (!$(this).next().length) {
      $(this).closest('li').find('.accordion-content').slideToggle();
    }
  });

  function openModal(modalSelector = '.modal') {
    const modal = document.querySelector(modalSelector);
    const close = '.modalClose';
    modal.classList.add('modal--open');
    modal.setAttribute('tabindex', '-1');

    modal.addEventListener('animationend', () => {
      modal.firstElementChild.classList.add('modal__content--open');
    });

    modal.addEventListener('click', event => {
      const target = event.target;
      if (target.closest(close) || target.closest(modalSelector) && !target.closest('.modal__content')) {
        modal.firstElementChild.classList.remove('modal__content--open');
        modal.classList.remove('modal--open');
        modal.removeAttribute('tabindex');
      }
    });
  }

  function valLength(count, el) {
    var valid = false
    if ($(el).val().length < count) {
      $(el).addClass('invalid');
    } else {
      $(el).removeClass('invalid');
      valid = true;
    }
    return valid;
  }

  $('.formSend').on('submit', function (e) {
    e.preventDefault();
    var formValid = false
    if (valLength(3, '.formSendName') && valLength(17, '.formSendTel') && valLength(3, '.formSendText')) {
      formValid = true;
    }
    if (!formValid) return;
    
    var action = $(this).attr('action');
    $.post(action, $('.formSend').serialize(), function(data) {
      openModal();
    })
  });

  $('.formSendName').on('keypress', function () {
    valLength(3, '.formSendName');
  });
  $('.formSendTel').on('keypress', function () {
    valLength(17, '.formSendTel');
  });
  $('.formSendText').on('keypress', function () {
    valLength(3, '.formSendText');
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 250) {
      $('.page-header--second').addClass('open');
    } else if ($(window).scrollTop() < 250) {
      $('.page-header--second').removeClass('open');
    }
  });
  $.mask.definitions.q = "[1,2,3,4,5,6,9]";
  $('input[type="tel"]').mask('+7 (q99) 999-99-99');


  $('.card').on('click', function () {
    $(this).toggleClass('open');
    $('.card__back').parent('.card').removeClass('open');
  });

  $('select').niceSelect();


});


$(document).ready(function () {
  function topOffset(x) {
    var scrollTop = $(window).scrollTop(),
      elementOffset = x.offset()?.top,
      distance = (elementOffset - scrollTop);
    return distance;
  };
  var count = ($('.scrollytrigger').length);

  sectionsPadding = $('.scrollytitle').height();
  // $('.scrollysections').css("margin-bottom", sectionsPadding);

  for (step = 0; step < count; step++) {
    $('.scrollytrigger').eq(step).addClass(step + "b");
    $('.scrollytitle').eq(step).addClass(step + "t");
  }
  ;

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
    }
    ;
  });
});

$(document).ready(function () {
  var isMobile = window.innerWidth < 992;


  // JSON to CSV Converter
  function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','
        if(Array.isArray(array[i][index])) {
          for(var obj of array[i][index]) {
            line += Object.values(obj).join(',');
          }
        } else {
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }

    return str;
  }

  var documentsAjaxLoadTable = $('[data-ajax]');
  var documentsAjaxLoadTableResponse = [];
  if (documentsAjaxLoadTable.length) {
    var url = documentsAjaxLoadTable.data('ajax');

    $.get(url, function (data, status) {
      if (status === 'success') {
        if (Array.isArray(data.result)) {
          documentsAjaxLoadTableResponse = data.result.slice(0);
          data.result.forEach(function (value) {
            var datePublish = new Date(value.publish_date);
            var dateAchieve = new Date(value.limit_achievement_date);
            documentsAjaxLoadTable.append(`
             <tr>
                <th scope="row">
                    <div class="mobile">ID</div>
                    ${value.num}
                </th>
                <td>
                    <div class="mobile">
                      Дата публикации инвестиционного предложения
                    </div>
                    ${datePublish.getDate()}.${datePublish.getMonth()}.${datePublish.getFullYear()} / 
                    ${datePublish.getHours() > 10 ? datePublish.getHours() : '0' + datePublish.getHours()}:${datePublish.getMinutes() > 10 ? datePublish.getMinutes() : '0' + datePublish.getMinutes()}</td>
                <td>
                  <div class="mobile">
                    Дата достижения максимальной суммы инвестиционного предложения
                  </div>
                    ${dateAchieve.getDate()}.${dateAchieve.getMonth()}.${dateAchieve.getFullYear()}</td>
                <td>
                  <div class="mobile">Сумма инвестиционного предложения</div>
                  ${value.amount}
                </td>
                <td>
                  <div class="mobile">ОКВЕД лица, привлекающего инвестиции</div>
                  ${value.okved && value.okved[0] && value.okved[0].cod}
                </td>
              </tr>
          `)
          })

          if(isMobile) {
            $('.responsive-js tbody').find('th').on('click', function (){
              $(this).toggleClass('active');
              $(this).parent().find('td').slideToggle();
            })
          }
        }
      }

      $('.download-csv').on('click', function (event) {
        event.preventDefault();
        var fileName = 'data.csv';
        var blob = new Blob([ConvertToCSV(documentsAjaxLoadTableResponse)], {});
        if (window.navigator.appVersion.toString().indexOf('.NET') !== -1) {

          window.navigator.msSaveBlob(blob, fileName);
          return;
        }
        var link = document.createElement('a');

        var href = window.URL.createObjectURL(blob);
        link.href = href;
        link.style.display = 'none';
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(href);
        }, 100);
      });


    })
  }


  $('.tabs__head').on('click', function () {

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

if (player) {
  player.load(player.getAttribute('src'), {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet'
    }
  });
}

