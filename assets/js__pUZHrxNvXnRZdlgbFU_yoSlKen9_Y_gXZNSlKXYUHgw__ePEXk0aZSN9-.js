/*!
 * Validator v0.10.2 for Bootstrap 3, by @1000hz
 * Copyright 2016 Cina Saffary
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 */

+function(a){"use strict";function b(b){return b.is('[type="checkbox"]')?b.prop("checked"):b.is('[type="radio"]')?!!a('[name="'+b.attr("name")+'"]:checked').length:a.trim(b.val())}function c(b){return this.each(function(){var c=a(this),e=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b),f=c.data("bs.validator");(f||"destroy"!=b)&&(f||c.data("bs.validator",f=new d(this,e)),"string"==typeof b&&f[b]())})}var d=function(c,e){this.options=e,this.$element=a(c),this.$inputs=this.$element.find(d.INPUT_SELECTOR),this.$btn=a('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')),e.errors=a.extend({},d.DEFAULTS.errors,e.errors);for(var f in e.custom)if(!e.errors[f])throw new Error("Missing default error message for custom validator: "+f);a.extend(d.VALIDATORS,e.custom),this.$element.attr("novalidate",!0),this.toggleSubmit(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",d.INPUT_SELECTOR,a.proxy(this.onInput,this)),this.$element.on("submit.bs.validator",a.proxy(this.onSubmit,this)),this.$element.find("[data-match]").each(function(){var c=a(this),d=c.data("match");a(d).on("input.bs.validator",function(){b(c)&&c.trigger("input.bs.validator")})})};d.INPUT_SELECTOR=':input:not([type="submit"], button):enabled:visible',d.FOCUS_OFFSET=20,d.DEFAULTS={delay:500,html:!1,disable:!0,focus:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},d.VALIDATORS={"native":function(a){var b=a[0];return b.checkValidity?b.checkValidity():!0},match:function(b){var c=b.data("match");return!b.val()||b.val()===a(c).val()},minlength:function(a){var b=a.data("minlength");return!a.val()||a.val().length>=b}},d.prototype.onInput=function(b){var c=this,d=a(b.target),e="focusout"!==b.type;this.validateInput(d,e).done(function(){c.toggleSubmit()})},d.prototype.validateInput=function(c,d){var e=b(c),f=c.data("bs.validator.previous"),g=c.data("bs.validator.errors");if(f===e)return a.Deferred().resolve();c.data("bs.validator.previous",e),c.is('[type="radio"]')&&(c=this.$element.find('input[name="'+c.attr("name")+'"]'));var h=a.Event("validate.bs.validator",{relatedTarget:c[0]});if(this.$element.trigger(h),!h.isDefaultPrevented()){var i=this;return this.runValidators(c).done(function(b){c.data("bs.validator.errors",b),b.length?d?i.defer(c,i.showErrors):i.showErrors(c):i.clearErrors(c),g&&b.toString()===g.toString()||(h=b.length?a.Event("invalid.bs.validator",{relatedTarget:c[0],detail:b}):a.Event("valid.bs.validator",{relatedTarget:c[0],detail:g}),i.$element.trigger(h)),i.toggleSubmit(),i.$element.trigger(a.Event("validated.bs.validator",{relatedTarget:c[0]}))})}},d.prototype.runValidators=function(c){function e(a){return c.data(a+"-error")||c.data("error")||"native"==a&&c[0].validationMessage||h.errors[a]}var f=[],g=a.Deferred(),h=this.options;return c.data("bs.validator.deferred")&&c.data("bs.validator.deferred").reject(),c.data("bs.validator.deferred",g),a.each(d.VALIDATORS,a.proxy(function(a,d){if((b(c)||c.attr("required"))&&(c.data(a)||"native"==a)&&!d.call(this,c)){var g=e(a);!~f.indexOf(g)&&f.push(g)}},this)),!f.length&&b(c)&&c.data("remote")?this.defer(c,function(){var d={};d[c.attr("name")]=b(c),a.get(c.data("remote"),d).fail(function(a,b,c){f.push(e("remote")||c)}).always(function(){g.resolve(f)})}):g.resolve(f),g.promise()},d.prototype.validate=function(){var b=this;return a.when(this.$inputs.map(function(){return b.validateInput(a(this),!1)})).then(function(){b.toggleSubmit(),b.focusError()}),this},d.prototype.focusError=function(){if(this.options.focus){var b=a(".has-error:first :input");0!==b.length&&(a(document.body).animate({scrollTop:b.offset().top-d.FOCUS_OFFSET},250),b.focus())}},d.prototype.showErrors=function(b){var c=this.options.html?"html":"text",d=b.data("bs.validator.errors"),e=b.closest(".form-group"),f=e.find(".help-block.with-errors"),g=e.find(".form-control-feedback");d.length&&(d=a("<ul/>").addClass("list-unstyled").append(a.map(d,function(b){return a("<li/>")[c](b)})),void 0===f.data("bs.validator.originalContent")&&f.data("bs.validator.originalContent",f.html()),f.empty().append(d),e.addClass("has-error has-danger"),e.hasClass("has-feedback")&&g.removeClass(this.options.feedback.success)&&g.addClass(this.options.feedback.error)&&e.removeClass("has-success"))},d.prototype.clearErrors=function(a){var c=a.closest(".form-group"),d=c.find(".help-block.with-errors"),e=c.find(".form-control-feedback");d.html(d.data("bs.validator.originalContent")),c.removeClass("has-error has-danger"),c.hasClass("has-feedback")&&e.removeClass(this.options.feedback.error)&&b(a)&&e.addClass(this.options.feedback.success)&&c.addClass("has-success")},d.prototype.hasErrors=function(){function b(){return!!(a(this).data("bs.validator.errors")||[]).length}return!!this.$inputs.filter(b).length},d.prototype.isIncomplete=function(){function c(){return!b(a(this))}return!!this.$inputs.filter("[required]").filter(c).length},d.prototype.onSubmit=function(a){this.validate(),(this.isIncomplete()||this.hasErrors())&&a.preventDefault()},d.prototype.toggleSubmit=function(){this.options.disable&&this.$btn.toggleClass("disabled",this.isIncomplete()||this.hasErrors())},d.prototype.defer=function(b,c){return c=a.proxy(c,this,b),this.options.delay?(window.clearTimeout(b.data("bs.validator.timeout")),void b.data("bs.validator.timeout",window.setTimeout(c,this.options.delay))):c()},d.prototype.destroy=function(){return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator").find(".form-control-feedback").removeClass([this.options.feedback.error,this.options.feedback.success].join(" ")),this.$inputs.off(".bs.validator").removeData(["bs.validator.errors","bs.validator.deferred","bs.validator.previous"]).each(function(){var b=a(this),c=b.data("bs.validator.timeout");window.clearTimeout(c)&&b.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var b=a(this),c=b.data("bs.validator.originalContent");b.removeData("bs.validator.originalContent").html(c)}),this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"),this.$element.find(".has-error, .has-danger").removeClass("has-error has-danger"),this};var e=a.fn.validator;a.fn.validator=c,a.fn.validator.Constructor=d,a.fn.validator.noConflict=function(){return a.fn.validator=e,this},a(window).on("load",function(){a('form[data-toggle="validator"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery);;/**/
(function($) {
  Drupal.behaviors.tabbedCarousel = {
    attach: function(context, settings) {
      $.each(settings.tabbedCarousel, function(selector) {
        $('#' + selector, context).once('tabbed-slider', function() {

        // Make tabs overlay prev element
        var p = document.getElementById(settings.tabbedCarousel[selector].tabOverlayId);
        if (p != null) {

          var t = document.getElementById(selector + '-tabs'),
          f = function() {
            t.style.marginTop = -(t.offsetHeight) + "px";
            p.style.marginBottom =  t.offsetHeight + "px";
          };
          f();
          window.addEventListener("resize",f);
        }

          var _super = $.fn.carousel,
            stillMoving = false,
            start;


          var Carousel = function() {
            _super.Constructor.apply(this, arguments);
            this.$indicators = this.$element.find('.tabbed-carousel-tabs');
          };
          Carousel.DEFAULTS  = _super.Constructor.DEFAULTS;
          Carousel.TRANSITION_DURATION = 0;
          Carousel.prototype = _super.Constructor.prototype;


          function Plugin(option) {
            return this.each(function() {
              var $this = $(this)
              var data = $this.data('bs.carousel')
              var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
              var action = typeof option == 'string' ? option : options.slide

              if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
              if (typeof option == 'number') data.to(option)
              else if (action) data[action]()
              else if (options.interval) data.pause().cycle()
            })
          }

          if ('ontouchstart' in window || navigator.maxTouchPoints) {
            this.addEventListener('touchstart', onTouchStart, false);
          }

          function onTouchStart(e) {
            if (e.touches.length == 1) {
              start = e.touches[0].pageX;
              stillMoving = true;
              this.addEventListener('touchmove', onTouchMove, false);
            }
          }

          function onTouchMove(e) {
            if (stillMoving) {
              var x = e.touches[0].pageX;
              var difference = start - x;
              if (Math.abs(difference) >= 80) {
                cancelTouch();
                if (difference > 0) {
                  $('#' + selector).data('bs.carousel').next();
                } else {
                  $('#' + selector).data('bs.carousel').prev();
                }
              }
            }
          }

          function cancelTouch() {
            this.removeEventListener('touchmove', onTouchMove);
            start = null;
            stillMoving = false;
          }

          $.fn.carousel = $.extend(Plugin, $.fn.carousel);

          $(this).carousel(settings.tabbedCarousel[selector]);
        });
      });
    }
  };
})(jQuery);
;/**/
/**
 * @file
 * bootstrap.js
 *
 * Provides general enhancements and fixes to Bootstrap's JS files.
 */

var Drupal = Drupal || {};

(function($, Drupal){
  "use strict";

  Drupal.behaviors.bootstrap = {
    attach: function(context) {
      // Provide some Bootstrap tab/Drupal integration.
      $(context).find('.tabbable').once('bootstrap-tabs', function () {
        var $wrapper = $(this);
        var $tabs = $wrapper.find('.nav-tabs');
        var $content = $wrapper.find('.tab-content');
        var borderRadius = parseInt($content.css('borderBottomRightRadius'), 10);
        var bootstrapTabResize = function() {
          if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
            $content.css('min-height', $tabs.outerHeight());
          }
        };
        // Add min-height on content for left and right tabs.
        bootstrapTabResize();
        // Detect tab switch.
        if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
          $tabs.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            bootstrapTabResize();
            if ($wrapper.hasClass('tabs-left')) {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopLeftRadius', '0');
              }
              else {
                $content.css('borderTopLeftRadius', borderRadius + 'px');
              }
            }
            else {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopRightRadius', '0');
              }
              else {
                $content.css('borderTopRightRadius', borderRadius + 'px');
              }
            }
          });
        }
      });
    }
  };

  /**
   * Behavior for .
   */
  Drupal.behaviors.bootstrapFormHasError = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.formHasError) {
        var $context = $(context);
        $context.find('.form-item.has-error:not(.form-type-password.has-feedback)').once('error', function () {
          var $formItem = $(this);
          var $input = $formItem.find(':input');
          $input.on('keyup focus blur', function () {
            var value = $input.val() || false;
            $formItem[value ? 'removeClass' : 'addClass']('has-error');
            $input[value ? 'removeClass' : 'addClass']('error');
          });
        });
      }
    }
  };

  /**
   * Anchor fixes.
   */
  var $scrollableElement = $();
  Drupal.behaviors.bootstrapAnchors = {
    attach: function(context, settings) {
      var i, elements = ['html', 'body'];
      if (!$scrollableElement.length) {
        for (i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          if ($element.scrollTop() > 0) {
            $scrollableElement = $element;
            break;
          }
          else {
            $element.scrollTop(1);
            if ($element.scrollTop() > 0) {
              $element.scrollTop(0);
              $scrollableElement = $element;
              break;
            }
          }
        }
      }
      if (!settings.bootstrap || settings.bootstrap.anchorsFix !== '1') {
        return;
      }
      var anchors = $(context).find('a').toArray();
      for (i = 0; i < anchors.length; i++) {
        if (!anchors[i].scrollTo) {
          this.bootstrapAnchor(anchors[i]);
        }
      }
      $scrollableElement.once('bootstrap-anchors', function () {
        $scrollableElement.on('click.bootstrap-anchors', 'a[href*="#"]:not([data-toggle],[data-target],[data-slide])', function(e) {
          if (this.scrollTo) {
            this.scrollTo(e);
          }
        });
      });
    },
    bootstrapAnchor: function (element) {
      element.validAnchor = element.nodeName === 'A' && (location.hostname === element.hostname || !element.hostname) && (element.hash.replace(/#/,'').length > 0);
      element.scrollTo = function(event) {
        var attr = 'id';
        var $target = $(element.hash);
        // Check for anchors that use the name attribute instead.
        if (!$target.length) {
          attr = 'name';
          $target = $('[name="' + element.hash.replace('#', '') + '"]');
        }
        // Immediately stop if no anchors are found.
        if (!this.validAnchor && !$target.length) {
          return;
        }
        // Anchor is valid, continue if there is an offset.
        var offset = $target.offset().top - parseInt($scrollableElement.css('paddingTop'), 10) - parseInt($scrollableElement.css('marginTop'), 10);
        if (offset > 0) {
          if (event) {
            event.preventDefault();
          }
          var $fakeAnchor = $('<div/>')
            .addClass('element-invisible')
            .attr(attr, $target.attr(attr))
            .css({
              position: 'absolute',
              top: offset + 'px',
              zIndex: -1000
            })
            .appendTo($scrollableElement);
          $target.removeAttr(attr);
          var complete = function () {
            location.hash = element.hash;
            $fakeAnchor.remove();
            $target.attr(attr, element.hash.replace('#', ''));
          };
          if (Drupal.settings.bootstrap.anchorsSmoothScrolling) {
            $scrollableElement.animate({ scrollTop: offset, avoidTransforms: true }, 400, complete);
          }
          else {
            $scrollableElement.scrollTop(offset);
            complete();
          }
        }
      };
    }
  };

  /**
   * Tabledrag theming elements.
   */
  Drupal.theme.tableDragChangedMarker = function () {
    return '<span class="tabledrag-changed glyphicon glyphicon-warning-sign text-warning"></span>';
  };

  Drupal.theme.tableDragChangedWarning = function () {
    return '<div class="tabledrag-changed-warning alert alert-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
  };

})(jQuery, Drupal);
;/**/

(function($) {
  Drupal.behaviors.formBuilderValidate = {
    attach: function(context, settings) {
      $.each(settings.cfbValidate, function(i, formId) {
        $('#' + formId, context).once('formBuilderValidate', function() {
          $(this).validator({disable: false});
        });
      });
    }
  };
})(jQuery);
;/**/

(function($) {
  Drupal.behaviors.formBuilderErrors = {
    attach: function(context, settings) {
      var $input = $(".has-error:first :input", context);
      if ($input.length > 0) {
        window.scrollTo(0, $input.offset().top - 48);
        $input.focus();
      }
    }
  };
})(jQuery);
;/**/
