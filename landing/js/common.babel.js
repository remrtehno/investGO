"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var overlay = document.querySelector('.overlay');
  var pageHeader = document.querySelector('.page-header');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    pageHeader.classList.toggle('open');
    document.body.classList.toggle('overflow');
    overlay.addEventListener('click', function () {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      pageHeader.classList.remove('open');
      document.body.classList.remove('overflow');
    });
  });

  var Accordion = /*#__PURE__*/function () {
    function Accordion() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Accordion);

      var _options$accordionEl = options.accordionEl,
          accordionEl = _options$accordionEl === void 0 ? '.accordionBtn' : _options$accordionEl;
      this.accordionEl = accordionEl;
      this.init();
    }

    _createClass(Accordion, [{
      key: "init",
      value: function init() {
        var accordionBtn = document.querySelectorAll(this.accordionEl);
        accordionBtn.forEach(function (element, index, arr) {
          element.addEventListener('click', function () {
            element.classList.toggle('open');
          });
        });
      }
    }]);

    return Accordion;
  }();

  new Accordion();

  if (window.innerWidth <= 767) {
    new Accordion({
      accordionEl: '.docBtn'
    });
  }

  var phoneMask = document.querySelectorAll('input[type="tel"');
  phoneMask.forEach(function (element) {
    IMask(element, {
      mask: '+{7} (000) 000-00-00'
    });
  });
});