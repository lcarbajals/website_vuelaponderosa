/*! js-cookie v3.0.1 | MIT */
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () { global.Cookies = current; return exports; };
  }()));
}(this, (function () { 'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }

  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };


  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

})));


if ( !Array.prototype['forEach'] ) {
	Array.prototype.forEach=function(r,o){if(null==this)throw new TypeError("Array.prototype.forEach called on null or undefined");var n,t,e=Object(this),f=e.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(n=o),t=0;t<f;){var i;t in e&&(i=e[t],r.call(n,i,t,e)),t++}};
}

if ( window.NodeList && !NodeList.prototype.forEach ) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

;(function ($) {
  'use strict';

  /**
   *
   *  @vars
   *
   *
   **/
   var _v = '1.1.0';


  $.SOW = {


    /**
     *
     *  @init
     *
     *
     **/
    init: function () {

      // <script async> NOT working. Keep jQuery!
      // document.addEventListener('DOMContentLoaded', function() {

      $(document).ready(function() { 

        /* 

            Check if debug is enabled
            Should be disabled on production!

        */
        if($.SOW.config.sow__debug_enable === true) {
        }

        // on load
        $.SOW.globals.js_location   = $.SOW.helper.jsLocation();
        $.SOW.globals.css_location  = $.SOW.helper.cssLocation();
        $.SOW.onresize();

        if( $.fn.modal ) {
          $.SOW.reinit(); /* first init ; ajax callable */
          return;
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $.SOW.helper.loadScript([$.SOW.globals.js_location + 'vendor_bundle.min.js'], false, true).done(function() {
          $.SOW.helper.consoleLog('Vendor Bunde: Dynamically loaded!');
          $.SOW.reinit(); /* first init ; ajax callable */
        });
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      });

    },
    globals: {

      direction           : $('body').css('direction'),   /* rtl | ltr */
      width               : $(window).width(),            /* window width, updated on resize */
      height              : $(window).height(),           /* window height, updated on resize */
      is_modern_browser   : ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window),    /* `true` if modern */
      is_mobile           : ($(window).width() < 993)             ? true : false,
      is_admin            : $('body').hasClass('layout-admin')    ? true : false,
      ajax_container      : 'body',                       /* DO NOT USE THIS IN YOUR SCRIPT, IS EXCLUSIVELY USED BY REINIT() FUNCTION */
      page_first_load     : true,                         /* set by reinit() to false after first load - used by ajax */
      js_location         : '',                           /* javascripts location, used to dinamicaly load js scripts */
      css_location        : '',                           /* javascripts location, used to dinamicaly load css */
      cookie_secure       : 'SameSite=None; secure',      /* New Google Secure Cookie */

      /* bootstrap breakpoints */
      breakpoints     : {
          'sm': 576,
          'md': 768,
          'lg': 992,
          'xl': 1200
      },

      /* 
          Most used only!
          Cache once : Use everywhere 
      */
      elBody          : $('body'),
      elHeader        : ($('#header').length > 0)     ? $('#header')      : null,
      elAside         : ($('#aside-main').length > 0) ? $('#aside-main')  : null,

    },


    core: {},

    vendor: {},

    helper: {},

    custom: {},

    onresize: function() {

      // On Resize
      jQuery(window).resize(function() {

          if(window.afterResizeApp)
              clearTimeout(window.afterResizeApp);

          window.afterResizeApp = setTimeout(function() {

            /** Window Width **/
            $.SOW.globals.width     = jQuery(window).width();

            /** Window Height **/
            $.SOW.globals.height    = jQuery(window).height();

            /** Is Mobile **/
            $.SOW.globals.is_mobile = ($(window).width() < 993) ? true : false;


          }, 150);

      });

    },


    reinit: function(ajax_container) {

      /*
          For each Ajax call, we temporarily set the ajax container as global
          After reinit, we reset back the ajax container as 'body'
      */
      $.SOW.globals.ajax_container = $.SOW.helper.check_var(ajax_container) || 'body';


      /** Bootstrap Toasts **/ 
      $($.SOW.globals.ajax_container + ' .toast').toast('show');


      /** Bootstrap Tooltip **/ 
      $($.SOW.globals.ajax_container + " [data-bs-toggle=tooltip]," + $.SOW.globals.ajax_container + " [data-tooltip]").tooltip('dispose').tooltip({
        container: ($.SOW.globals.ajax_container == 'body') ? 'html' : $.SOW.globals.ajax_container /* fixing wired positioning! */
      }).on('focus', function () {  $(this).blur() });


      /** Bootstrap Popover **/
      let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
      });


      /** Bootstrap Carousel **/
      $($.SOW.globals.ajax_container + ' .carousel').carousel('dispose').carousel({
        direction:  ($.SOW.globals.direction == 'ltr') ? 'right' : 'left'
      });

      /** Bootstrap Scrollspy **/
      // $('[data-bs-spy="scroll"]').each(function () {
      //   $(this).scrollspy('refresh');
      // });

      // let dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
      // dataSpyList.forEach(function (dataSpyEl) {
      //   bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh()
      // });


      /*

          Autoinit plugins
          Specified in Config

      */
      // for (var index = 0; index < $.SOW.config.autoinit.length; ++index) {
      for (var index in $.SOW.config.autoinit) {

        // Not first page load, skip if plugin do not allow reinit by ajax
        if($.SOW.globals.page_first_load === false && $.SOW.config.autoinit[index][3] === false)
          continue;

        $.SOW.helper.executeFunctionByName(
            $.SOW.config.autoinit[index][0],    // script
            window, 
            $.SOW.config.autoinit[index][1],    // selector
            $.SOW.config.autoinit[index][2]     // config
        );   

      }
      if(typeof global_callback === 'function')
        $.SOW.helper.executeFunctionByName('global_callback', window, $.SOW.globals.ajax_container);


      /*
          Page classic preloader : first load only!
      */
      if($.SOW.globals.page_first_load === true) {

        jQuery('#page_preload').fadeOut(1000, function() {
          jQuery(this).remove();
        });

      }

      // First page load finished!
      // Any future reinit() calls are Ajax!
      $.SOW.globals.page_first_load   = false;
      $.SOW.globals.ajax_container    = 'body'; // reset

    },
  };

$.SOW.init();

})(jQuery);

;(function ($) {
  'use strict';

  $.SOW.config = {

    sow__debug_enable                               : false,
    /* Icons */
    sow__icon_loading                               : 'fi fi-circle-spin fi-spin',      // ajax loading indicator
    sow__icon_check                                 : 'fi fi-check',                    // 'success' messages or other places
    sow__icon_close                                 : 'fi fi-close',                    // 'failed'  messages or other places

  };

})(jQuery);

;(function ($) {
  'use strict';


  /**
   *
   *  @vars
   *
   *
   **/
  var obj             = {};               // used by loadScript


  $.SOW.helper = {

    config: {},


    collection: $(),


    init: function (selector, config) {/** no init required **/},


    __selector: function(selector) {

      var selector        = $.SOW.helper.check_var(selector) || ''; /* '' is required if null */
      var selector_orig   = selector;
      var element         = (selector && $(selector).length > 0) ? $(selector) : $();

      /* add ajax container - required for binds */
      if($.SOW.globals.ajax_container != 'html' && $.SOW.globals.ajax_container != 'body' && $.SOW.globals.ajax_container != '') {

        if (selector.indexOf(',') > -1)
          var selector = selector.split(',').join(', ' + $.SOW.globals.ajax_container + ' ');

        selector = $.SOW.globals.ajax_container + ' ' + selector;

      }

      return [selector, element, selector_orig]; // selector_orig = without ajax container, in case is needed

    },

    check_var: function(_var) {

      return  (typeof _var !== "undefined") ? _var : null;

    },

    is_numeric: function(_var) {

      if(typeof _var === 'number') return true;

      // at this point, we might have bool/object/function/etc
      else if(typeof _var !== 'string') return false;

      // -- --

      var _var = ''+_var.replace(/\s/g, '');
      if(_var === '') return false;

      // something like '1.'
      else if(_var.slice(-1) === '.') return false;  

      // -- --

      return !isNaN(parseFloat(_var)) && isFinite(_var);

    },

    loadScript: function(script_arr, async, cache) {

      return (async === true) ? $.SOW.helper.__loadScriptAsync(script_arr, cache) : $.SOW.helper.__loadScriptOrdered(script_arr, cache);

    },

        /*

            Credits (Salman A : stackovweflow user)
                https://stackoverflow.com/a/33312665

        */
        __loadScriptOrdered: function(script_arr, cache) {

          var deferred = jQuery.Deferred();

          function __loadScript(i) {

              if (i < script_arr.length) {

                  jQuery.ajax({

                    url:        script_arr[i],
                    dataType:   "script",
                    cache:      (cache !== false) ? true : false,

                    success:    function() {

                      __loadScript(i + 1);

                    }

                  });

              } else {

                deferred.resolve();

              }

          }

          __loadScript(0);
          return deferred;

        },

        /*

            Credits (adeneo stackovweflow user)
                https://stackoverflow.com/a/11803418

        */
        __loadScriptAsync: function(script_arr, cache) {

          var _arr = $.map(script_arr, function(scr) {
            return (cache !== false) ? $.SOW.helper.getScriptCached( scr ) : $.getScript( scr );
          });

          _arr.push($.Deferred(function( deferred ) {
            $( deferred.resolve );
          }));

          return $.when.apply($, _arr);

        },
            getScriptCached: function(url, options) {

              // Allow user to set any option except for dataType, cache, and url
              options = $.extend( options || {}, {
                dataType: "script",
                cache: true,
                url: url
              });

              // Use $.ajax() since it is more flexible than $.getScript
              // Return the jqXHR object so we can chain callbacks
              return jQuery.ajax( options );

            },

    loadCSS: function(cssFile, option) {

      /* 1. remove */
      if(option === 'remove')
        jQuery('head link[href="'+cssFile+'"]').remove();


      /* 2. prepend */
      else if(option === 'prepend') {
        if(jQuery('head link[href="'+cssFile+'"]').length > 0) return;
        jQuery('head').prepend('<link rel="stylesheet" href="'+cssFile+'">');
      }


      /* 3. append : default */
      else  {
        if(jQuery('head link[href="'+cssFile+'"]').length > 0) return;
        jQuery('head').append('<link rel="stylesheet" href="'+cssFile+'">');
      }


    },

    loadingSpinner: function(option, _container, _layout, _color) {

      var option          = (typeof option !== 'undefined')   ? option        : 'show';
      var _container      = (_container === null) ? $.SOW.globals.elBody      : _container;
      var _layout         = (typeof _layout !== 'undefined')  ? _layout       : 'icon';
      var _color          = (typeof _color !== 'undefined')   ? _color        : null;
      var _colorOverlay   = 'overlay-dark overlay-opacity-2';
      var _colorIcon      = 'text-muted';


      // Icon Color
      if( _layout == 'icon' && _color != '' )
        _colorIcon = _color;


      // Overlay Color + Icon Color
      if( _layout == 'overlay' && _color != '' ) {
        var s = _color.split(':');

        // Overlay
        if( typeof s[0] !== 'undefined' ) {
                 if( s[0] == 'dark' )   _colorOverlay = 'overlay-dark overlay-opacity-2';
            else if( s[0] == 'light' )  _colorOverlay = 'overlay-light overlay-opacity-7';
        }

        // Icon Color
        _colorIcon = ( typeof s[1] !== 'undefined' ) ? s[1] : _colorIcon;

      }


      if(option === 'show') {

        // remove existing and stop
        if(jQuery('#js_loading_icon').length > 0) {
          jQuery('#js_loading_icon').remove();
          return;
        }

        // 1. overlay, absolute positioning inside container
        var tplOverlay = '<div id="js_loading_icon" class="position-absolute absolute-full ' + _colorOverlay + ' z-index-9999 text-center">' 
                            + '<i class="' + $.SOW.config.sow__icon_loading + ' fs-3 '+_colorIcon+' valign-middle"></i>'
                       + '</div>';

        // 2. fixed - bottom of the screen, no overlay
        var tplIcon = '<div id="js_loading_icon" class="position-fixed fixed-bottom w-100 mb-3 z-index-9999 text-center shadow-none">'
                          + '<span class="bg-white d-inline-block px-4 py-1 rounded shadow-lg">'
                              + '<i class="' + $.SOW.config.sow__icon_loading + ' fs-3 '+_colorIcon+'"></i>'
                          + '</span>'
                    + '</div>';


        var _tpl        = (_layout == 'overlay') ? tplOverlay : tplIcon;
        var _container  = (_layout == 'overlay') ? _container : 'body'; // it's fixed, add to body!


        // show
        _container = (typeof _container === 'object') ? _container : jQuery(_container);
        _container.prepend(_tpl);


      } else {

        jQuery('#js_loading_icon').remove();

      }

    },
    executeFunctionByName: function(functionName, context /*, args */) {

        // return new Promise(resolve => {

            if(typeof(window) !== 'undefined') {

                // Use the window (from browser) as context if none providen.
                context = context || window;
            
            } else {

                // If using Node.js, the context will be an empty object
                context = context || global;

            }


            var args        = Array.prototype.slice.call(arguments, 2);
            var namespaces  = functionName.split(".");
            var func        = namespaces.pop();

            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }


            return context[func].apply(context, args);

        // });

    },




    /**
     *
     *  @overlay
     *
        $.SOW.helper.overlay('show|hide|toggle');
     *
     **/
    overlay: function(option) {

        if(option === 'show') {

            jQuery('body').append('<div id="overlay-default"></div>');
            jQuery('body').addClass('overflow-hidden');

        }

        else if(option === 'hide') {

            jQuery('#overlay-default').unbind().remove();
            jQuery('body').removeClass('overflow-hidden');
    
        }

        else {

            if(jQuery('#overlay-default').length > 0) {
                $.SOW.helper.__overlay_hide();
            } else {
                $.SOW.helper.__overlay_show();
            }

        }

    },
        __overlay_show: function() {
            jQuery('body').append('<div id="overlay-default"></div>');
            jQuery('body').addClass('overflow-hidden');
        },
        __overlay_hide: function() {
            jQuery('#overlay-default').unbind().remove();
            jQuery('body').removeClass('overflow-hidden');
        },




    /**
     *
     *  @randomStr
     *
        $.SOW.helper.randomStr(8, ''|L|N);
     *
     **/
    randomStr: function(length, type) {

        switch(type) {

            case 'L':
                var characters   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                break;

            case 'N': 
                var characters   = '0123456789';
                break;

            default:
                var characters   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        }

        var result           = '';
        var charactersLength = characters.length;

        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;

    },


    /**
     *
     *  @byte2size
     *
     *  $.SOW.helper.byte2size(bytes, precision=2, int_only=false);
     *
     **/
    byte2size: function(bytes, precision, int_only) {

      var precision   = typeof precision  !== 'undefined' ? precision : 2;
      var int_only    = typeof int_only   !== 'undefined' ? int_only  : false;

      if(bytes < 1) 
              return 0 + (int_only === false) ? 'B' : '';


      var k           = 1024;
      var precision   = precision < 0 ? 0 : precision;
      var unit        = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

      var i           = Math.floor(Math.log(bytes) / Math.log(k));
      var unit_txt    = (int_only === false) ? ' ' + unit[i] : 0;
      return parseFloat((bytes / Math.pow(k, i)).toFixed(precision)) + unit_txt;

    },

    byte2kb: function(bytes) {

      if(bytes < 1) return bytes;

      var bytes = bytes / 1024;
      return (Math.round(bytes * 100) / 100);

    },

    scrollAnimate: function(_el, _offset, _hash_change, _speed) {

      _el                 = typeof _el            !== 'undefined'     ? _el           : '';
      _hash_change        = typeof _hash_change   !== 'undefined'     ? _hash_change  : 'false';
      _offset             = typeof _offset        !== 'undefined'     ? _offset       : 0;
      _speed              = typeof _speed         !== 'undefined'     ? _speed        : 400;

      // Calculate offset if not given!
      if(_offset < 1) {

        if($.SOW.globals.elBody.hasClass('header-hide'))
            _offset = 15;

        // .header-fixed is added by js header plugin for all: .header-sticky, .header-scroll-reveal
        else if($.SOW.globals.elBody.hasClass('header-fixed') || $.SOW.globals.elBody.hasClass('header-sticky'))
            _offset = $.SOW.globals.elHeader.outerHeight() + 15;

      }


      // Scroll
      if(_el != '#' && _el != '#!' && _el != 'javascript:;') {

          if(_el == '#top') {

              jQuery('html, body').animate({scrollTop: $.SOW.globals.elBody.offset().top}, _speed, function() {

                  if(_hash_change == 'true') {
                      window.location.hash = _el;
                  }

              });

          } else {

              // unexpected error (should never happen - invalid element)!
              if(!jQuery(_el).offset()) return;

              jQuery('html, body').animate({scrollTop: jQuery(_el).offset().top - parseInt(_offset)}, _speed, function() {

                  if(_hash_change == 'true') {
                      window.location.hash = _el;
                  }

              });

          }

      }

    },


    removeUrlHash: function(_url){

      if (_url.indexOf('#') > -1)
        return _url.replace(/#.*$/, '');

      return _url;

    },

    playSound: function(_soundFile) {

      var audioElement = document.createElement('audio');

      audioElement.setAttribute('src', _soundFile);
      audioElement.setAttribute('autoplay', 'autoplay');

      audioElement.addEventListener("load", function() {
        audioElement.play();
      }, true);

    },





    /**
     *
     *  @time_from_ms
     *  
        $.SOW.helper.time_from_ms(miliseconds, 's|m|h|d|empty for all');
     *
     **/
    time_from_ms: function(miliseconds, format) {
      var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

      total_seconds   = parseInt(Math.floor(miliseconds / 1000));
      total_minutes   = parseInt(Math.floor(total_seconds / 60));
      total_hours     = parseInt(Math.floor(total_minutes / 60));
      days            = parseInt(Math.floor(total_hours / 24));

      seconds         = parseInt(total_seconds % 60);
      minutes         = parseInt(total_minutes % 60);
      hours           = parseInt(total_hours % 24);

      switch(format) {
        case 's': return total_seconds;
        case 'm': return total_minutes;
        case 'h': return total_hours;
        case 'd': return days;
        default:  return { d: days, h: hours, m: minutes, s: seconds };
      }
    },



    /**
     *
     *  @get_browser
     *
        $.SOW.helper.get_browser();
     *
     **/
    get_browser: function() {

      var ua = navigator.userAgent.toLowerCase(); 

           if (ua.indexOf('chrome') > -1)   return 'chrome';
      else if (ua.indexOf('safari') > -1)   return 'safari';
      else if (ua.indexOf('mozilla') > -1)  return 'mozilla';
      else if (ua.indexOf('edge') > -1)     return 'edge';
      else return 'n/a'; // ie, etc

    },




    /**
     *
     *  @params_parse
     *
        var params = $.SOW.helper.params_parse('['param','value']['param2','value2']); // return: array
     *
     **/
    params_parse: function(string) {

      if(string != '' && string.length > 2) {

        // creating a valid json
        var string = '[' + string + ']';                // add [] brackets
        var string = string.replace(/'/g, '"');         // replace ' with "
        var string = string.replace(/ /g, '');          // remove spaces
        var string = string.replace(/]\[/g, '],[');     // replace: '][' with '],['

        // parse 
        var string = JSON.parse(string);

      }

      return string;

    },

    currencyFormat: function(amount, custom) {

      if(typeof custom !== 'object')
        var custom = [
               2, ',', '.' // en
            // 2, '.', ',' // de
            // 2, ' ', ',' // fr
        ];

      return (  amount.toFixed(custom[0])
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1:repl:')
                  .replace('.', custom[2])
                  .replace(/:repl:/g, custom[1])
      );

    },

    jsLocation: function()  { return $.SOW.helper.scriptLocation( 'js' ); },
    cssLocation: function() { return $.SOW.helper.scriptLocation( 'css' ); },
    scriptLocation: function( sriptType ) {

      let curScript;
      let selector = (sriptType == 'js') ? 'script[src]' : 'link[rel="stylesheet"]';
      let scripts  =  document.querySelectorAll( selector );

      for(let i = 0; i < scripts.length; i++) {

        // set as default
        curScript = (sriptType == 'js') ? scripts[i].src : scripts[i].href ;

             if(curScript.indexOf('core') !== -1)      break;
        else if(curScript.indexOf('vendor') !== -1)    break;
        else if(curScript.indexOf('bundle') !== -1)    break;
        else if(curScript.indexOf('theme') !== -1)     break;

        // nothing found, reset back
        curScript = null;

      }

      // nothing we want found! get the last script!
      if(!curScript)
        curScript = (sriptType == 'js') ? scripts[scripts.length-1].src : scripts[scripts.length-1].href;

      if(!curScript)
        curScript = (sriptType == 'js') ? 'assets/js/' : 'assets/css/';

      let curScriptChunks = curScript.split('/');
      let curScriptFile   = curScriptChunks[curScriptChunks.length - 1];
      let scriptPath      = curScript.replace(curScriptFile, '');

      return scriptPath;

  },

    vendorLogicPaths: function(vendor) {

      if(!vendor) return arr;

      var js_location     = ($.SOW.globals.js_location != '') ? $.SOW.globals.js_location : $.SOW.helper.jsLocation();
      var css_location    = ($.SOW.globals.js_location != '') ? $.SOW.globals.css_location : $.SOW.helper.cssLocation();
      var arr             = [];
          arr['path_js']  = '';
          arr['path_css'] = '';




      /* CSS FILE */
      if($.SOW.config["vendor:external_css"]) {

        for (var module in $.SOW.config["vendor:external_css"]) {

          for(var v = 0; v < $.SOW.config["vendor:external_css"][module].length; v++) {

            if($.SOW.config["vendor:external_css"][module].includes(vendor) === true) {
                
              arr['path_css']     = css_location+module+'.'+vendor+'.min.css';
              
              // apply here, else swiper and other plugins has issues : is css loaded after js
              $.SOW.helper.loadCSS(arr['path_css']);
              break;

            }
          
          }

        }

      }



      /* JS FILE */
      if($.SOW.config["vendor:external_js"]) {

        for (var module in $.SOW.config["vendor:external_js"]) {

          for(var v = 0; v < $.SOW.config["vendor:external_js"][module].length; v++) {

            if($.SOW.config["vendor:external_js"][module].includes(vendor) === true) {
              arr['path_js']  = js_location+module+'.'+vendor+'.min.js';
              break;
            }
          
          }

        }

      }

      return arr;

    },





    /**
     *
     *  @videoEmbedFromUrl
        $.SOW.helper.videoEmbedFromUrl('https://www.youtube.com?v=jh8Hgd466', autoplay=1);
     *
     **/
    videoEmbedFromUrl: function(href, autoplay) {


      // Localvideo first!
      if( href.match(/(.mp4)/) || href.match(/(.webm)/) ) {

        var mp4     = href.replace('.webm', '.mp4');
        var webm    = href.replace('.mp4', '.webm');
        var jpg     = href.replace('.mp4', '.jpg').replace('.webm', '.jpg');
        var auto    = (!autoplay) ? null : 'autoplay';

        // Local Video
        return '<div class="embed-responsive embed-responsive-16by9">'
            + '<video preload="auto" '+auto+' controls="controls" poster="'+jpg+'">'
                + '<source src="'+webm+'" type="video/webm;">'
                + '<source src="'+webm+'" type="video/mp4;">'
            + '</video>'
        + '</div>';

      };

      // :: default
      var videoEmbedLink = null;


      // :: youtube
      if(videoEmbedLink === null) {
        var youtubeMatch    = href.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i);
        var videoEmbedLink  = (youtubeMatch) ? "https://www.youtube.com/embed/"+youtubeMatch[4]+"?autoplay=" + autoplay || 1 + '' : null;
      }

      // :: vimeo
      if(videoEmbedLink === null) {
        var vimeoMatch      = href.match(/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/);
        var videoEmbedLink  = (vimeoMatch) ? "https://player.vimeo.com/video/"+vimeoMatch[2]+"?autoplay=" + autoplay || 1 + '' : null;
      }


      // Err!
      if(!videoEmbedLink)
        return null;

      // -- --

      // Construct Embed!
      return '<div class="embed-responsive embed-responsive-16by9">'
                  + '<iframe class="embed-responsive-item" src="' + videoEmbedLink + '" allow="autoplay; encrypted-media" width="560" height="315"></iframe>'
              + '</div>';

    },

    strhash: function( str ) {
      if (str.length % 32 > 0) str += Array(33 - str.length % 32).join("z");
      
      var hash = '', bytes = [];
      var i, j, k, a; i = j = k = a = 0;
      var dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','1','2','3','4','5','6','7','8','9'];
      
      for (i = 0; i < str.length; i++ ) {
        var ch = str.charCodeAt(i);
        bytes[j++] = (ch < 127) ? ch & 0xFF : 127;
      }

      var chunk_len = Math.ceil(bytes.length / 32);   
     
      for (i=0; i<bytes.length; i++) {
        j += bytes[i]; k++;
       
        if ((k == chunk_len) || (i == bytes.length-1)) {
          var a = Math.floor( j / k );

          if (a < 32)             hash += '0';
          else if (a > 126)       hash += 'z';
          else                    hash += dict[  Math.floor( (a-32) / 2.76) ];

          var j = k = 0;
        }
      }

      return hash;

    },

    jsonParse: function( data ) {

      // check
      if( data == '' || typeof data === 'object' )
        return data;

      // parse json
      try {

        var _data = JSON.parse( data );

      } catch(err) {

        var _data = data;

      }

      // return
      return (typeof _data === 'undefined' || _data.length < 1) ? null : _data;

    },
    serializeArray: function( form ) {

      if( jQuery() )
        return jQuery( form ).serializeArray();


      // --


      var form    = (typeof form === 'object') ? form : document.querySelector( form ),
          arr     = [];

      Array.prototype.slice.call(form.elements).forEach(function (field) {

        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) 
          return;

        if (field.type === 'select-multiple') {

          Array.prototype.slice.call(field.options).forEach(function (option) {
              
            if (!option.selected) 
              return;
            
            arr.push({
              name: field.name,
              value: option.value
            });

          });

          return;
        }

        if (['checkbox', 'radio'].indexOf(field.type) >-1 && !field.checked) 
            return;

        arr.push({

          name:   field.name,
          value:  field.value

        });

      });

      return arr;

    },

    compareArray: function( array1, array2 ) {

      const array2Sorted = array2.slice().sort();

      return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
        return value === array2Sorted[index];
      });

    },

    consoleLogReinit: function(scriptInfo, selector) {

      $.SOW.helper.consoleLog('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      $.SOW.helper.consoleLog(scriptInfo, 'color: #6dbb30; font-weight: bold; font-size:14px;');
      $.SOW.helper.consoleLog('Ajax Reinit For: ' + selector);
      $.SOW.helper.consoleLog(window.location.href);
      $.SOW.helper.consoleLog('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    },



    /**
     *
     *  @consoleLog
     *
        $.SOW.helper.consoleLog('%cLorem Ipsum', 'color: #ff0000;');
     *
     **/
    consoleLog: function(data, css) {

      if($.SOW.config.sow__debug_enable !== true)
        return;

      // Console css
      if(typeof css !== "undefined" && typeof css !== 'object') {
        var data    = '%c' + data;
        console.log(data, css);
        return;
      }

      else if(typeof css === 'object') {
        console.log(data, css);
        return;
      }

      console.log(data);

    }

  };
})(jQuery);

;(function ($) {
	'use strict';


	/**
	 *
	 *  @vars
	 *
	 *
	 **/
	var scriptInfo          = 'SOW Header';

	window._headerID        = '#header';
	window.lastScrollTop    = 0;



	$.SOW.core.header = {


		/**
		 *
		 *  @config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *  @collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *  @init
		 *  
		 *
		 **/
		init: function (selector, config) {


			if(!$.SOW.globals.elHeader)
				return;


			/** 
				1. HEADER : STICKY/FIXED
			**/
			if($.SOW.globals.elBody.hasClass('header-sticky'))
				$.SOW.core.header.header_sticky();


			/** 
				2. HEADER : REVEAL ON SCROLL 
			**/
			else if($.SOW.globals.elBody.hasClass('header-scroll-reveal'))
				$.SOW.core.header.header_scroll_reveal();


			/** 
				3. HEADER & ASIDE : HORIZONTAL NAVIGATION
			**/ $.SOW.core.header.horizontal_nav();


			/** 
				4. HEADER TOGGLE
			**/ $.SOW.core.header.header_toggle();


			/** 
				5. HEADER SCROLLTO : NAVBAR CLOSE
			**/ $.SOW.core.header.header_onepagenav();


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


		},

		header_sticky: function() {
			if($.SOW.globals.elBody.hasClass('layout-admin'))
				return;
			// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

			if($.SOW.globals.elHeader.length < 1)
				return;

			var _headerEl_H     = $.SOW.globals.elHeader.outerHeight() || 0,
				_diff           = 0;


			if($.SOW.globals.elBody.hasClass('layout-boxed')) 
				_diff = _headerEl_H / 2 || 0;

			/* 

				1. add header spacing
				2. add header-fixed class

			*/  $.SOW.globals.elBody.addClass('header-fixed');
			

			// admin : padding top instead of spacer
			if($.SOW.globals.elBody.hasClass('layout-admin aside-sticky')) {

				jQuery('#middle').css({"padding-top":_headerEl_H + _diff + parseInt(jQuery('#middle').css('padding-top'))});

			} else {

				jQuery('#js_header_spacer').remove();
				// '#wrapper>'+window._headerID+', body>'+window._headerID
				jQuery(window._headerID).after('<div id="js_header_spacer" style="height:'+(_headerEl_H + _diff)+'px"><!-- spacer added by header js --></div>');

			}

			if($.SOW.globals.elBody.hasClass('header-over') && jQuery(this).scrollTop() > 0)
				$.SOW.globals.elBody.addClass('user-scrolled-down');


			// stop! no need for scroll assist!
			if(!$.SOW.globals.elBody.hasClass('header-over') && jQuery('#top_bar').length < 1)
				return;







			/*
				
				1. on scroll down - hide #top_bar to make little more space (and show on scroll up)
				2. add|remove .user-scrolled-down - used together with .header-over
		
			*/
			var 
				top_bar_present     = jQuery('#top_bar').length,
				top_bar_height      = (top_bar_present > 0) ? jQuery('#top_bar').outerHeight() : 0,
				top_bar_js_ignore   = false,
				delta               = 5,
				didScroll;

			jQuery(window).scroll(function(event) {
				didScroll = true;
			});


			// check for js ignore (if true, do not hide #top_bar on scroll)
			if(top_bar_present > 0) {
				if(jQuery('#top_bar').hasClass('js-ignore'))
					var top_bar_js_ignore = true;
			}


			setInterval(function() {
				if(didScroll) {
					$.SOW.core.header.header_sticky__hasScrolled(_headerEl_H, delta, top_bar_present, top_bar_height, top_bar_js_ignore);
					didScroll = false;
				}
			}, 100);



			// On first load!
			$.SOW.core.header.header_sticky__hasScrolled(_headerEl_H, delta, top_bar_present, top_bar_height, top_bar_js_ignore);
			// -- -- -- -- --

		},
			header_sticky__hasScrolled: function(_headerEl_H, delta, top_bar_present, top_bar_height, top_bar_js_ignore) {
				var st = document.scrollingElement.scrollTop;

				// ADD distinct class - used by transparent header
				if(st < 1) {
					$.SOW.globals.elBody.removeClass('user-scrolled-down');
				} else {
					$.SOW.globals.elBody.addClass('user-scrolled-down');
				}


				if(top_bar_present > 0 && top_bar_js_ignore === false) {

					// Make sure they scroll more than delta
					if(Math.abs(window.lastScrollTop - st) <= delta)
						return;


					if(st > window.lastScrollTop && st > _headerEl_H){

						// Scroll Down
						$.SOW.globals.elHeader.css({"margin-top":"-"+top_bar_height+"px"});

					} else {

						// Scroll Up
						if(st + jQuery(window).height() < jQuery(document).height()) {
							$.SOW.globals.elHeader.css({"margin-top":""});
						}

					}
		
					window.lastScrollTop = st;

				}

			},

		header_scroll_reveal: function() {


			/** HEADER : REVEAL
				1. Hide Header on on scroll down
				2. Show Header on on scroll up
			** ************************************/
			if($.SOW.globals.elHeader.length > 0) {

				var _headerEl_H     = $.SOW.globals.elHeader.outerHeight() || 0,
					_diff           = 0,
					lastScrollTop   = 0,
					delta           = 5,
					didScroll;


				if($.SOW.globals.elBody.hasClass('layout-boxed')) 
					_diff = _headerEl_H / 2 || 0;

				/* 

					1. add header spacing
					2. add header-fixed class

				*/

				jQuery('#js_header_spacer').remove();
				// // '#wrapper>'+window._headerID+', body>'+window._headerID
				jQuery(window._headerID).after('<div id="js_header_spacer" style="height:'+(_headerEl_H + _diff)+'px"><!-- spacer added by header js --></div>');

				$.SOW.globals.elBody.addClass('header-fixed');
				jQuery('body>'+window._headerID).addClass('header-fixed');

				// on load : according to .header-over
				if($.SOW.globals.elBody.hasClass('header-over') && jQuery(this).scrollTop() > 0) {
					$.SOW.globals.elBody.addClass('user-scrolled-down');
					jQuery(window._headerID).addClass('header-down');
					lastScrollTop = jQuery(this).scrollTop(); // avoid jumping
				} else {
					$.SOW.globals.elBody.addClass('header-is-on-top');
				}

				// -- -- -- --


				jQuery(window).scroll(function(event) {
					didScroll = true;
				});

				setInterval(function() {
					if(didScroll) {
						$.SOW.core.header.header_scroll_reveal__hasScrolled(_headerEl_H, delta);
						didScroll = false;
					}
				}, 100);

			}

		},

			header_scroll_reveal__hasScrolled: function(_headerEl_H, delta) {
				var st = document.scrollingElement.scrollTop;

				// ADD distinct class - used by transparent header
				if(st < 1) {
					$.SOW.globals.elBody.addClass('header-is-on-top').removeClass('user-scrolled-down');
				} else {
					$.SOW.globals.elBody.addClass('user-scrolled-down');
				}

				// Make sure they scroll more than delta
				if(Math.abs(window.lastScrollTop - st) <= delta)
					return;

				if(st > window.lastScrollTop && st > _headerEl_H){

					// Scroll Down
					$.SOW.globals.elHeader.removeClass('header-down').addClass('header-up');
					$.SOW.globals.elBody.removeClass('header-is-on-top');

				} else {

					// Scroll Up
					if(st + jQuery(window).height() < jQuery(document).height()) {
						$.SOW.globals.elHeader.removeClass('header-up').addClass('header-down');
					}

				}

				window.lastScrollTop = st;
			},
		horizontal_nav: function() {

			var elNavResize;
			var elNav = document.querySelectorAll('.navbar-horizontal');
			var formSearchSuggest = document.querySelector('form.sow-search');
			if( !elNav ) return;


			window.setTimeout(function() {
				elNav.forEach(function(el) {


					// Bind once -----------------------------------
					if( el.classList.contains('js-navbar-horizontal') ) return;
					el.classList.add('js-navbar-horizontal');
					// ---------------------------------------------


					// Show & calculate
					var ddW     = 0;
					let navThis = el.querySelector('.navbar-toggler-horizontal');
					let navEvt  = navThis.classList.contains('nav-horizontal-open-click') ? 'click' : 'mouseover';
					
					// fix : hover issue (endless loop)
					if( !navThis.classList.contains('position-absolute') && 
							!navThis.classList.contains('position-fixed') 
					) navThis.classList.add('position-relative');
					// -- --

					navThis.addEventListener(navEvt, function(e) {

						if( $.SOW.globals.is_mobile === false ) {
						
							// search suggest - zindex - under horizontal, while visible
							if( formSearchSuggest ) formSearchSuggest.classList.add('z-index-1');
							el.querySelector('.navbar-toggler-horizontal').classList.add('z-index-9999');
							// -- --

							el.querySelector('.nav-horizontal').classList.add('d-block');

							document.body.classList.add('overflow-hidden');

							if( ddW < 1 ) { // because we have no real width on hidden element
								let elDD = el.querySelector('.nav-horizontal-container');
								ddW = elDD.offsetWidth || elDD.width;

								elNavReadjust();
							}

						}
					});


					// Ignore navbar-toggler click (bootstrap action)
					el.querySelector('.navbar-toggler-horizontal').addEventListener('click', function(e) {
						if( $.SOW.globals.is_mobile === false ) {
							e.preventDefault();
							e.stopPropagation();
						}
					});



					// Close on overlay click/hover
					let navOverlay = el.querySelector('.nav-horizontal-overlay');
					if( navOverlay ) {

						navOverlay.classList.add('z-index-99');
						let evtClose = (navEvt == 'click') ? 'click' : 'mouseover';
						navOverlay.addEventListener(evtClose, function(e) {

							document.body.classList.remove('overflow-hidden');
							el.querySelector('.nav-horizontal').classList.remove('d-block');

							// search suggest - zindex - under horizontal, while visible
							if( formSearchSuggest ) formSearchSuggest.classList.remove('z-index-1');
							el.querySelector('.navbar-toggler-horizontal').classList.remove('z-index-9999');
							// -- --

						});
					}


					// On Resize
					// ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++
					window.addEventListener('resize', function() {
						if( $.SOW.globals.is_mobile === false ) {
							
							if( elNavResize ) clearTimeout(elNavResize);
							elNavResize = setTimeout(function() {

								elNavReadjust();

							}, 500);

						} else {
							document.body.classList.remove('overflow-hidden');
						}
					});
					
					function elNavReadjust() {
						if( $.SOW.globals.is_mobile === false ) {

							let elW     = el.offsetWidth || style.width;
							let megaW   = elW - ddW;

							el.querySelectorAll('.dropdown-mega>.dropdown-menu').forEach(function(e) {
								e.style.minWidth = megaW+'px';
							});

						}

					}
					// ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++

				});
			}, 170);

		},

		header_toggle: function() {

			if(!document.querySelector('.btn-header-toggle'))
				return;

			jQuery('.btn-header-toggle').on('click', function(e) {
				e.preventDefault();

				var is_hidden       = $.SOW.globals.elBody.hasClass('header-hide') ? true : false,
					has_spacer      = jQuery('#js_header_spacer').length > 0 ? true : false,
					_headerEl_H     = $.SOW.globals.elHeader.outerHeight()      || 0,
					_addEl          = '';

				// no header present?
				if(_headerEl_H < 1)
					return;


				// Add animation class to content
				if(has_spacer === true) {
					jQuery('#wrapper_content').addClass('js-animation-enable');
					_addEl = ', #wrapper_content';
				}


				// Add animation class!
				jQuery('#header'+_addEl).addClass('transition-all-ease-250');


				if(is_hidden === false) {

					jQuery('#header'+_addEl).animate({ 'margin-top': -_headerEl_H+"px" }, 50, function(e) {
						$.SOW.globals.elBody.addClass('header-hide');

						/*  
							show toggle button with a delay to avoid spacing 
							issues (because of fixed position) + nice effect with css
						*/
						setTimeout(function() {

							$.SOW.globals.elBody.addClass('btn-header-toggle-show');

						}, 600);

					});

				} else {

					jQuery('#header'+_addEl).animate({ 'margin-top': "0" }, 0, function(e) {
						$.SOW.globals.elBody.removeClass('header-hide btn-header-toggle-show');

						// Remove animation class
						if(has_spacer === true) {
							setTimeout(function() {

								jQuery('#wrapper_content').removeClass('js-animation-enable');

							}, 600);
						}

					});
				}


			});

		},



		/**
		 *
		 *  5. HEADER SCROLLTO : NAVBAR CLOSE
		 *  
		 *
		 **/
		header_onepagenav: function() {

			jQuery('.navbar-collapse').each(function() {

				var _t = jQuery(this);

				jQuery('.scroll-to, .js-ajax', _t).on('click',function() {

					if($.SOW.globals.is_mobile === true) 
						_t.collapse('hide');

				});

			});

		},


		



		/**
		 *
		 *  DESTROY / RESET (sticky/reveal)
		 *  
		 *
		 **/
		header_destroy: function() {

			$.SOW.globals.elHeader.removeClass('header-down header-up');
			$.SOW.globals.elBody.removeClass('header-hide header-over header-fixed header-is-on-top user-scrolled-down');
			$.SOW.globals.elHeader.css({"margin-top":""});
			jQuery('#top_bar').removeClass('hide-by-scroll');
			jQuery('#js_header_spacer').remove();
			jQuery(window).off("scroll");

		}

	};


})(jQuery);

;(function ($) {
    'use strict';



    /**
     *
     *  @vars
     *
     *
     **/
    var scriptInfo      = 'SOW Lazyload';
    var __observer      = void 0;

    $.SOW.core.lazyload = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            rootMargin:     '0px',      // syntax similar to that of CSS Margin
            threshold:      0.1,        // 0 - 1; 1 = when 100% of the target is visible 
            
            load: function load(element) {

                // <video>
                if (element.nodeName.toLowerCase() === 'video' && !element.getAttribute('data-src')) {
                
                    if (element.children) {

                        var childs      = element.children;
                        var childSrc    = void 0;

                        for (var i = 0; i <= childs.length - 1; i++) {

                            childSrc = childs[i].getAttribute('data-src');

                            if (childSrc)
                                childs[i].src = childSrc;

                        }

                        element.load();
                    }

                }

                if (element.getAttribute('data-src'))
                    element.src = element.getAttribute('data-src');

                if (element.getAttribute('data-srcset'))
                    element.setAttribute('srcset', element.getAttribute('data-srcset'));

                // mobile, if exists
                if ($.SOW.globals.is_mobile === true && element.getAttribute('data-background-image-xs'))
                    element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image-xs') + '\')';

                // fallback desktop from mobile
                else if (element.getAttribute('data-background-image'))
                    element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image') + '\')';

                /*
                    <div class="lazy" data-toggle-class="active">
                    The active class will be toggled on the element when it enters the browser’s viewport.
                */
                if (element.getAttribute('data-lazy-toggle-class')) {
                    jQuery(element).addClass(element.getAttribute('data-lazy-toggle-class'));
                    // element.classList.toggle(element.getAttribute('data-toggle-class'));
                }

                // clear
                jQuery(element).removeAttr('data-lazy-toggle-class data-background-image data-srcset data-src');

            }

        },



        /**
         *
         *  @collection
         *
         *
         **/
        collection: $(),



        /**
         *
         *  @init
         *  
         *
         **/
        init: function (selector, config) {

            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.selector_orig      = __selector[2];    // $('#selector') // without ajax container prefix
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            if(jQuery(this.selector).length < 1)
                return;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core.lazyload.process('.lazy').observe();
                return jQuery('.lazy');
            }

            // 2. Has selector
            $.SOW.core.lazyload.process(this.selector).observe();


            return this.collection;
        },



        /**
         *
         *  @process
         *
         *  
         *
         **/
        process: function(selector) {

            var load                    = $.SOW.core.lazyload.config.load;

            if(window.IntersectionObserver) {

                __observer = new IntersectionObserver($.SOW.core.lazyload.onIntersection(load), {
                    rootMargin: $.SOW.core.lazyload.config.rootMargin,
                    threshold:  $.SOW.core.lazyload.config.threshold
                });

            } else {

                // load them all instead of using polyfill!
                // https://www.npmjs.com/package/intersection-observer
                var elements = $.SOW.core.lazyload.getElements(selector);
                for(var i = 0; i < elements.length; i++) {
                    load(elements[i]);
                    $.SOW.core.lazyload.markLoaded(elements[i]);
                }

                // -- * --
                $.SOW.helper.consoleLog('Lazyload: This browser does not support IntersectionObserver()');
                $.SOW.helper.consoleLog('Images loaded without lazyloading!');
                $.SOW.helper.consoleLog('To enable, download this polyfill and include before any other js script: https://www.npmjs.com/package/intersection-observer');
                // -- * --

            }

            return {

                observe: function observe() {

                    var items = $.SOW.core.lazyload.getElements(selector);
                    for(var i=0; i < items.length; ++i) {

                        if($.SOW.core.lazyload.isLoaded(items[i]))
                            continue;

                        if(__observer) {
                            __observer.observe(items[i]);
                            continue;
                        }

                        load(items[i]);
                        $.SOW.core.lazyload.markLoaded(items[i]);

                    }
                },

                __observer: __observer

            };

        },





        /**
         *
         *  @markLoaded
         *
         *  
         *
         **/
        markLoaded: function(element) {
            element.setAttribute('data-loaded', true);
        },




        /**
         *
         *  @isLoaded
         *
         *  
         *
         **/
        isLoaded: function(element) {
            return element.getAttribute('data-loaded') === 'true';
        },




        /**
         *
         *  @onIntersection
         *
         *  
         *
         **/
        onIntersection: function(load) {

            return function(items, __observer) {

                items.forEach(function (item) {

                    if (item.intersectionRatio > 0 || item.isIntersecting) {

                        // call __observer is exists
                        if(__observer)
                            __observer.unobserve(item.target);

                        if (!$.SOW.core.lazyload.isLoaded(item.target)) {
                            $.SOW.core.lazyload.config.load(item.target);
                            $.SOW.core.lazyload.markLoaded(item.target);
                        }
                    }

                });

            }

        },




        /**
         *
         *  @getElements
         *
         *  
         *
         **/
        getElements: function(selector) {

            if (selector instanceof Element)
                return [selector];

            if (selector instanceof NodeList)
                return selector;

            return document.querySelectorAll(selector);

        },

    }

})(jQuery);

;(function ($) {
  'use strict';


  /**
   *
   *  @vars
   *
   *
   **/
  var scriptInfo      = 'SOW Toast';



  $.SOW.core.toast = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

      animation: 'fade'
    
    },



    /**
     *
     *  @collection
     *
     *
     **/
    collection: $(),



    /**
     *
     *  @init
     *  
     *
     **/
    init: function (selector, config) {

      var __selector          = $.SOW.helper.__selector(selector);
      var __config            = $.SOW.helper.check_var(config);

      this.selector           = __selector[0];    // '#selector'
      this.collection         = __selector[1];    // $('#selector')
      this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;



      if(jQuery(this.selector).length < 1)
        return;



      // -- * --
      $.SOW.helper.consoleLog('Init : ' + scriptInfo);
      // -- * --


      // 1. Has no selector
      if(!this.selector) {
        $.SOW.core.toast.toast_on_load('.toast-on-load');
        return this.collection;
      }

      // 2. Has selector
      return this.collection.each(function() {
          
        $.SOW.core.toast.toast_on_load($(this));

      });

    },

    show: function(t_type, t_title, t_body, t_pos, t_delay, t_bg_fill) {

      var t_type      = typeof t_type     !== 'undefined' ? t_type    : '',       // default|success|danger[error]|warning|info
          t_title     = typeof t_title    !== 'undefined' ? t_title   : '',
          t_body      = typeof t_body     !== 'undefined' ? t_body    : '',
          t_pos       = typeof t_pos      !== 'undefined' ? t_pos     : 'top-left',
          t_delay     = typeof t_delay    !== 'undefined' ? t_delay   : 0,
          t_bg_fill   = typeof t_bg_fill  !== 'undefined' ? t_bg_fill : false;

      if(t_type == 'error')
        var t_type = 'danger';

      else if(t_type == 'default')
        var t_type = '';

      // In case body is empty but we have the title - switch between them!
      if(t_body == '' && t_title != '') {
        var t_body      = t_title;
        var t_title     = '';
      }


      // --


      // top right
      if(t_pos == 'top-right' || t_pos == 'top-end') {
        var _posClass   = 'fixed-top end-0';
        var _wrapperID  = 'wrapper_toast_tr';
        var t_spacing   = 'mt-3 me-4';
      }

      // bottom right
      else if(t_pos == 'bottom-right' || t_pos == 'bottom-end') {
        var _posClass   = 'fixed-bottom end-0';
        var _wrapperID  = 'wrapper_toast_br';
        var t_spacing   = 'mb-3 me-4';
      }

      // top left
      else if(t_pos == 'top-left' || t_pos == 'top-start') {
        var _posClass   = 'fixed-top start-0';
        var _wrapperID  = 'wrapper_toast_tl';
        var t_spacing   = 'mt-3 ms-4';
      }

      // bottom left
      else if(t_pos == 'bottom-left' || t_pos == 'bottom-start') {
        var _posClass   = 'fixed-bottom start-0';
        var _wrapperID  = 'wrapper_toast_bl';
        var t_spacing   = 'mb-3 ms-4';
      }

      // top center
      if(t_pos == 'top-center') {
        var _posClass   = 'fixed-top mx-auto';
        var _wrapperID  = 'wrapper_toast_tc';
        var t_spacing   = 'mt-3';
      }


      // bottom center
      if(t_pos == 'bottom-center') {
        var _posClass   = 'fixed-bottom mx-auto';
        var _wrapperID  = 'wrapper_toast_bc';
        var t_spacing   = 'mb-3';
      }


      // --

      // Toast icon indicator
      var t_icon      = (t_type != '') ? '<i class="float-start rounded-circle bg-' + t_type + '" style="width:15px;height:15px;margin-top:3px"></i>' : '';

      // Autohide in ms
      var t_delay_bs  = (t_delay > 0) ? ' data-delay="' + t_delay + '" data-autohide="true"' : ' data-autohide="false" ';

      // Close Button & Progress
      if(t_delay > 0) {

          var t_close         = '';
          var t_progress      = '<div style="margin-top:-1px"><div class="progress bg-transparent" style="height:1px"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%; background-color: #121212; opacity:0.2"></div></div></div>';

      } else {

        var _btnCloseStyle  = (t_title == '') ? ' font-size:10px; margin-top:-1px; ' : '';
        var t_close         = '<button type="button" style="' + _btnCloseStyle + '" class="close float-end" data-bs-dismiss="toast" aria-label="Close"><span class="fi fi-close" style="font-size:16px" aria-hidden="true"></span></button>';
        var t_progress      = '';

      }


      // --

      // Create specific main container if not exists (to avoid destroying current toasts)
      if(jQuery('#'+_wrapperID).length < 1)
        $.SOW.globals.elBody.append('<div id="' + _wrapperID + '" style="max-width:330px;max-height:75vh;z-index:9999;" class="w-100 scrollable-vertical rounded ' + _posClass + '"></div>');


      // --


      // BUILD HTML TOAST
      var t_main_class    = (t_bg_fill === true && t_type != '') ? 'border-0 bg-'+t_type : 'bg-white';
      var _toastBody      = '<div class="toast bg-gradient borer-0 js-toast '+$.SOW.core.toast.config.animation+' '+t_main_class+' '+t_spacing+'" role="alert" aria-live="polite" aria-atomic="true" '+t_delay_bs+'>';


      // No title
      if(t_title != '') {

        // remove icon on fill
        t_icon = (t_bg_fill === true) ? '' : t_icon;

        var t_header_class = (t_bg_fill === true && t_type != '') ? ' bg-transparent overlay-dark overlay-opacity-1 text-white' : '';

        var _toastBody = _toastBody + '<div class="toast-header px-3'+t_header_class+'">'

          + '<div class="w-100 text-truncate">'
              + t_icon
              + '<strong>' + t_title + '</strong>'
          + '</div>'

          + '<div class="text-align-end" style="width:180px">'
              //+ '<small class="d-inline-block text-truncate" style="paddint-top:6px;width:80px">11 mins ago</small>'
              + t_close
          + '</div>'

        + '</div>';

      }

      // Add close button to body, because we have no title
      var _closeBtnBody = (t_title == '') ? t_close : '';
      
      // Add Color to body text if no title available
      if(t_title == '') {
          
        if(t_bg_fill === true && (t_type == 'success-soft' || t_type == 'danger-soft' || t_type == 'info-soft' || t_type == 'warning-soft' || t_type == 'primary-soft' || t_type == 'pink-soft' || t_type == 'indigo-soft')) {
            var t_txt_color = '';
        } else  {
            var t_txt_color = (t_bg_fill === true && t_type != '') ? 'text-white' : 'text-'+t_type;
        }

        var t_body = '<div class="'+t_txt_color+'">' + t_body + '</div>';

      } else {

        var t_body = (t_bg_fill === true && t_type != '') ? '<div class="text-white" style="padding-top:5px; padding-bottom:10px;">' + t_body + '</div>' : t_body;
      
      }

      var _toastBody = _toastBody + t_progress 
          + '<div class="toast-body p-3">' + _closeBtnBody + t_body + '</div>'
      + '</div>';

      // Prepend
      jQuery('#'+_wrapperID).prepend(_toastBody);

      // Reinit toast
      jQuery('#'+_wrapperID+' .js-toast:not(.hide)').toast('show');


      // --


      // Animate progress bar
      if(t_delay > 0)
        jQuery('#'+_wrapperID + ' .js-toast:not(.hide):first-child .progress>.progress-bar').filter(':not(:animated)').stop().animate({width:'100%'}, 0).stop().animate({width:'0%'}, t_delay);


      // --


      // Cleanup
      setTimeout(function () {

        jQuery('#'+_wrapperID + ' .js-toast.hide').remove();

      }, t_delay + 1500);

    },
    toast_on_load: function(_this) {

      _this.each(function() {

        var _t      = jQuery(this),
            _type   = _t.data('toast-type')         || '',
            _title  = _t.data('toast-title')        || '',
            _body   = _t.data('toast-body')         || '',
            _delay  = _t.data('toast-delay')        || 0,
            _pos    = _t.data('toast-pos')          || 'top-right',
            _fill   = _t.data('toast-fill')         || true;

        // safe correction
        _fill = (_fill != true) ? false : true;

        // show toast
        $.SOW.core.toast.show(_type, _title, _body, _pos, _delay, _fill);

        // not needed
        // remove to avoid triggering again on ajax loads!
        _t.remove();

      });

    },

    destroy: function() {
      jQuery('#wrapper_toast_tr, #wrapper_toast_br, wrapper_toast_tl, #wrapper_toast_bl, #wrapper_toast_tc, #wrapper_toast_bc').remove();
    }
  }
})(jQuery);

;(function ($) {
    'use strict';


    /**
     *
     *  @vars
     *
     *
     **/
    var scriptInfo      = 'SOW Sidebar';


    $.SOW.core.sidebar = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {},



        /**
         *
         *  @collection
         *
         *
         **/
        collection: $(),



        /**
         *
         *  @init
         *  
         *
         **/
        init: function (selector, config) {

            if(jQuery('aside').length < 1)
                return;

            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            $.SOW.core.sidebar.sidebar_toggle();
            $.SOW.core.sidebar.sidebar_minify();
            $.SOW.core.sidebar.sidebar_extended();
            
            return this.collection;

        },



        /**
         *
         *  @sidebar_toggle
         *  Mobile show|hide sidebar
         *
         **/
        sidebar_toggle: function() {


            jQuery('.btn-sidebar-toggle').on('click', function(e) {
                e.preventDefault();

                var _href = jQuery(this).attr('href') || '';

                if(_href == '' || _href == '#')
                    return;

                jQuery(_href).toggleClass('js-aside-show');
                $.SOW.helper.overlay('toggle');

                jQuery(this).toggleClass('active');

                // toggle back on overlay click
                jQuery('#overlay-default').unbind().on('click', function(e) {
                    $.SOW.helper.overlay('hide');
                    jQuery(_href).removeClass('js-aside-show');
                    jQuery('.btn-sidebar-toggle').removeClass('active');
                });

            });


            /** 

                CLOSE SIDEBAR ON ITEM CLICK
                Add to nav: .nav-link-click-close

            **/
            if($.SOW.globals.is_mobile === true) {

                jQuery('nav.nav-link-click-close a.nav-link').on('click', function() {
                    var _href = jQuery(this).attr('href');

                    if(_href != '#' && _href != '#!' && _href != 'javascript:;') {
                        $.SOW.helper.overlay('hide');
                        jQuery('aside').removeClass('js-aside-show');
                        jQuery('.btn-sidebar-toggle').removeClass('active');
                    }

                });

            }

        },




        /**
         *
         *  @sidebar_minify
         *  href used as a target ID
         *
         **/
        sidebar_minify: function() {

            jQuery('.btn-aside-minify').on('click', function(e) {
                e.preventDefault();

                var _href = jQuery(this).attr('href') || '';

                if(_href == '' || _href == '#' || _href == '#!' || _href == 'javascript:;')
                    return;

                $.SOW.globals.elBody.toggleClass('aside-min');
            });

        },




        /**
         *
         *  @sidebar_extended
         *  
         *
         **/
        sidebar_extended: function() {

            jQuery('.btn-aside-item-extended-close').unbind().on('click', function(e) {
                e.preventDefault();

                jQuery(this).parent().closest('.nav-item.active').removeClass('active');

            });

        },




        /**
         *
         *  @sidebar_dispose
         *  
         *
         **/
        sidebar_dispose: function() {

            jQuery('.btn-sidebar-toggle').unbind('click');
            jQuery('.btn-sidebar-toggle-minify').unbind('click');
            jQuery('.btn-aside-item-extended-close').unbind('click');
            jQuery('.nav-deep .nav-link').unbind('click');

        },

    };


})(jQuery);

;(function ($) {
    'use strict';


    /**
     *
     *  @vars
     *
     *
     **/
    var scriptInfo      = 'SOW Scroll To';


    $.SOW.core.scroll_to = {


        /**
         *
         *  @config
         *
         *
         **/
        config: {

            // button scroll to speed
            speed:               400,

            // scroll 2 top
            s2t_enable:         true,
            s2t_class:          'btn-secondary',
            s2t_position:       'end',   // start = left, end = right (inverted for RTL)
            s2t_mob_minH:       1200,   // min. content height to show on mobile
            s2t_dsk_minH:       2300,   // min. content to show on desktop
            // when scrolling, button is shown if currentScroll > minH / 2

        },



        /**
         *
         *  @collection
         *
         *
         **/
        collection: $(),



        /**
         *
         *  @init
         *  
         *
         **/
        init: function (selector, config) {

            var __selector          = $.SOW.helper.__selector(selector);
            var __config            = $.SOW.helper.check_var(config);

            this.selector           = __selector[0];    // '#selector'
            this.collection         = __selector[1];    // $('#selector')
            this.config             = (__config !== null) ? $.extend({}, this.config, __config) : this.config;



            // Scroll to top when user scroll %
            if($.SOW.core.scroll_to.config.s2t_enable === true)
                $.SOW.core.scroll_to.scrollToTop();



            if(jQuery(this.selector).length < 1)
                return;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if(!this.selector) {
                $.SOW.core.scroll_to.process($('.scroll-to'));
                return this.collection;
            }

            // 2. Has selector
            return this.collection.each(function() {
                
                $.SOW.core.scroll_to.process($(this));

            });

        },



        /**
         *
         *  @process
         *  

            <a href="#top" class="scroll-animate">Go to top</a>
            <a href="#div_id" class="scroll-animate">Go to a section</a>

         *
         **/
        process: function(_this) {

            var config_speed = this.config.speed;

            // SCROLL TO [LINK]
            _this.not('.js-scrolltoified').addClass('js-scrolltoified').on("click", function(e) {
                e.preventDefault();

                var _t              = jQuery(this),
                    _href           = _t.attr('href')               || '',
                    _offset         = _t.data('offset')             || 0,
                    _toggle         = _t.data('toggle')             || '',
                    _expanded       = _t.attr('aria-expanded')      || '',
                    _hash           = _t.data('update-hash')        || 'false',
                    _speed          = _t.data('speed')              || config_speed,
                    _delay          = _t.data('delay')              || 0;


                // add a delay if this has also a collapse option
                if(_toggle == 'collapse')
                    _delay = (_delay > 0) ? _delay : 300; // bootstrap default is 400 

                // Scroll (helper.js)
                if(typeof $.SOW.helper.scrollAnimate === "function") {

                    setTimeout(function() {

                        // stop on collapse back
                        // if(_toggle == 'collapse' && _expanded != '')
                        if(_t.hasClass('collapsed'))
                            return;

                        $.SOW.helper.scrollAnimate(_href, _offset, _hash, _speed);

                    }, Number(_delay) );

                }

            });

        },



        /**
         *
         *  @scroll to top
         *  
         *
         **/
        scrollToTop: function() {


            // reset always on load
            if(window.sowScrollToInterval !== null) {
                clearInterval(window.sowScrollToInterval);
                window.sowScrollToInterval = null;

                jQuery('#btnScrollTo').remove();
            }



            // Different for mobile/desktop
            var minInitHeight = $.SOW.globals.is_mobile === true ? $.SOW.core.scroll_to.config.s2t_mob_minH : $.SOW.core.scroll_to.config.s2t_dsk_minH;


            // do not init on short content
            if($(document).height() < minInitHeight)
                return;


            var _pos        = $.SOW.globals.elBody.data('s2t-position')     || $.SOW.core.scroll_to.config.s2t_position;
            var _cls        = $.SOW.globals.elBody.data('s2t-class')        || $.SOW.core.scroll_to.config.s2t_class;
            var _dis        = $.SOW.globals.elBody.data('s2t-disable')      || 'false';

            if(_dis+'' == 'true')
                return;


            // Disable on admin ; Enable only if specified:
            // data-s2t-disable="false"
            if($.SOW.globals.elBody.hasClass('layout-admin') && _dis+'' != 'false')
                return;


            // Is admin and has Footer
            var takeCareOfAdminFooter   = false;
            if($.SOW.globals.elBody.hasClass('layout-admin') && jQuery('#footer').length > 0) {

                var footerPos               = 0;
                var tookCare                = false;
                var btnScrollToMargins      = 0;
                var footerHeight            = jQuery('#footer').outerHeight();

                if(footerHeight < 200) {
                    var takeCareOfAdminFooter = true;
                    var footerPos = $('#footer').offset().top;
                    var btnScrollToMargins = footerHeight + 15 + Number($.SOW.globals.elBody.css('padding').replace("px", "") || 0) + Number($.SOW.globals.elBody.css('margin').replace("px", "") || 0);
                }

            }


            // Create Element
            $.SOW.globals.elBody.append('<a aria-label="Scroll page to top" href="#" id="btnScrollTo" class="btn ' + _cls + ' position-fixed z-index-99 ' + _pos + '-0 bottom-0 m-2" style="display:none"><i class="m-0 fi fi-arrow-up"></i></a>');


            // bind click
            jQuery('#btnScrollTo').off().on('click', function(e) {
                e.preventDefault();
                $.SOW.helper.scrollAnimate('body', 0, false, 500);
            });


            var appearAtMin                     = minInitHeight / 2;
                window.isVisibleBtnScrollTo     = false;
            var scrolling                       = false;
            var currScrollPos                   = 0;

            $(window).scroll(function() {
                scrolling       = true;
                currScrollPos   = $(this).scrollTop();
            });

            window.sowScrollToInterval = setInterval( function() {

                if(scrolling) {
                    scrolling = false;


                    if (currScrollPos > appearAtMin) {
                    
                        if(window.isVisibleBtnScrollTo === false) {
                            window.isVisibleBtnScrollTo = true;
                            jQuery('#btnScrollTo').fadeIn(400);
                        }

                    } else {

                        if(window.isVisibleBtnScrollTo === true) {
                            window.isVisibleBtnScrollTo = false;
                            jQuery('#btnScrollTo').fadeOut(200);
                        }

                    }


                    // Admin footer : fix
                    if(takeCareOfAdminFooter === true) {
                        if(currScrollPos + $.SOW.globals.height > footerPos) {
                            if(tookCare === false) {
                                jQuery('#btnScrollTo').addClass('transition-all-ease-250').attr('style', "margin-bottom: "+ btnScrollToMargins +"px !important");
                                tookCare = true;
                            }
                        } else {
                            if(tookCare === true) {
                                jQuery('#btnScrollTo').css({"margin-bottom":""});
                                tookCare = false;
                            }
                        }
                    }

                }

            }, 500);


        }

    };


})(jQuery);

;(function ($) {
    'use strict';

    var scriptInfo      = 'SOW Google Font';


    $.SOW.core.gfont = {
        init: function (selector, config) {

            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if( !selector ) return;
            var nodeList = document.querySelectorAll( selector );
            if( !nodeList ) return;
            $.SOW.core.gfont.process( nodeList );
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --

        },



        /**
         *
         *  @process
         *
         **/
        process: function( nodeList ) {


            /* 
                Check
            */
            if( typeof nodeList !== 'object' ) 
                return;

            nodeList.forEach(function(el) {

                // ignore multiple bind -- -- -- -- -- -- -- -- --
                if( el.classList.contains('js-init-gfont') ) return;
                    el.classList.add('js-init-gfont');
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


                /* 
                    Attributes
                */
                let _font     = el.getAttribute('data-gfont');
                let _wght     = el.getAttribute('data-wght')        || '300;400;500';
                let _dspl     = el.getAttribute('data-display')     || 'swap';
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                if( !_font ) return;
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


                /* 
                    Parse Data
                */
                let _gfont    = _font.replace(/ /g, '+');
                let _cssID    = _font.replace(/ /g, '_').toLowerCase();
                let _rand     = Math.random().toString(36).substring(7);
                let _lnk      = 'https://fonts.googleapis.com/css2?family='+_gfont+':wght@'+_wght+'&display='+_dspl;
                let _fEl      = document.getElementById( _cssID );


                /* 
                    Font Already Exists
                */
                if( _fEl ) {
                    let _class = _fEl.getAttribute('data-class');
                    el.classList.add( _class );
                    return;
                }


                /* 
                    Push font
                */
                let tagHead = document.getElementsByTagName('head')[0];
                tagHead.insertAdjacentHTML( 'beforeend', '<link id="'+_cssID+'" data-class="gfont_'+_rand+'" href="'+_lnk+'" rel="stylesheet">' );
                tagHead.insertAdjacentHTML( 'beforeend', '<style type="text/css">' + ".gfont_"+_rand+"{font-family: '"+_font+"',sans-serif!important;}" + '</style>' );
                el.classList.add( "gfont_"+_rand );

            });

        }

    };

})(jQuery);

;(function ($) {
  'use strict';

  var scriptInfo          = 'SOW Utils';
  var timeAgoList         = [];
  var slideshowList       = {};
  window.barcodeInterval  = null;
  window.barcodeLast      = '';

  $.SOW.core.utils = {


    /**
     *
     *  @config
     *
     *
     **/
    config: {

        // selectors
        selector__initialFromString             : '.sow-util-initials',
        selector__timeAgo                       : '.sow-util-timeago',
        selector__cookie                        : '.sow-util-cookie',
        selector__slideshow                     : '.sow-util-slideshow',
        selector__cloner                        : '.sow-util-cloner',
        selector__action                        : '.sow-util-action',
        selector__form                          : '.sow-util-form',
        selector__formLiveMonitor               : '.sow-util-form-live-monitor',
        selector__liveReload                    : '.sow-util-live-reload',

        // ajax function
        method                                  : 'GET',
        contentType                             : '',   // jQuery params
        dataType                                : '',   // jQuery params
        headers                                 : '',   // jQuery params
        crossDomain                             : '',   // jQuery params
        data_params                             : {ajax:'true'},


        lang__timeAgo                           : {
                                                        seconds         : "less than a minute ago",
                                                        minute          : "about a minute ago",
                                                        minutes         : "%d minutes ago",
                                                        hour            : "about an hour ago",
                                                        hours           : "about %d hours ago",
                                                        day             : "a day ago",
                                                        days            : "%d days ago",
                                                        month           : "about a month ago",
                                                        months          : "%d months ago",
                                                        year            : "about a year ago",
                                                        years           : "%d years ago"
                                                    },
    },



    /**
     *
     *  @init
     *  
     *
     **/
    init: function (selector, config) {

        var __selector          = $.SOW.helper.__selector(selector);
        this.selector           = __selector[0];    // '#selector'

        // Initials from a string [name]
        $.SOW.core.utils.initialsFromString(this.selector+' '+$.SOW.core.utils.config.selector__initialFromString);
        
        // Time Ago
        $.SOW.core.utils.timeAgo(this.selector+' '+$.SOW.core.utils.config.selector__timeAgo);

        // Cookies
        $.SOW.core.utils.cookieUtil(this.selector+' '+$.SOW.core.utils.config.selector__cookie);

        // Background Slideshow
        $.SOW.core.utils.slideshow(this.selector+' '+$.SOW.core.utils.config.selector__slideshow);

        // Cloner
        $.SOW.core.utils.cloner(this.selector+' '+$.SOW.core.utils.config.selector__cloner);

        // Hide/Show/Readonly/Disable
        $.SOW.core.utils.UtilAction(this.selector+' '+$.SOW.core.utils.config.selector__action);

        // Form
        $.SOW.core.utils.UtilForm(this.selector+' '+$.SOW.core.utils.config.selector__form);

        // Form Live Monitor
        $.SOW.core.utils.UtilFormLiveMonitor(this.selector+' '+$.SOW.core.utils.config.selector__formLiveMonitor);
        
        // Live Reload
        $.SOW.core.utils.UtilLiveReload(this.selector+' '+$.SOW.core.utils.config.selector__liveReload);

        return null;

    },



    /**
     *
     *  @initialsFromString
     *  
     *
     **/
    initialsFromString: function(selector) {

        var el      = jQuery(selector),
            loaded  = false;

        if(el.length < 1)
            return;


        el.not('.js-sowformstringified').addClass('js-sowformstringified').each(function(selector) {

            var _t          = jQuery(this),
                fullName    = _t.data('initials')                       || '',
                assignColor = jQuery(this).attr('data-assign-color')    || 'false';
            
            if(fullName == '')
                return false;


            // Assign color by name
            if(assignColor+'' == 'true') {

                var hash    = 0,
                    s       = 70,   // saturation
                    l       = 90;   // lightness

                for (var i = 0; i < fullName.length; i++) {
                    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
                }

                var h = hash % 360;
                _t.removeClass('bg-light').css({"background":'hsl('+h+', '+s+'%, '+l+'%)'});

            }


            // Extract Initials
            var initials = fullName.match(/\b\w/g) || [];
                initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();


            // Push & remove ununsed!
            _t.text(initials).removeAttr('data-initials data-assign-color');
            loaded = true;

        });


        // -- * --
        if(loaded === true)
            $.SOW.helper.consoleLog('Init : ' + scriptInfo + ' : Initials From String');
        // -- * --

    },

    timeAgo: function(selector) {

        var el      = jQuery(selector),
            loaded  = false;
        
        if(el.length < 1)
            return;

        /**

            You can also set once an empty element if you have many timeago's.
            Example: &lt;span class="sow-util-timeago-lang" data-lang-timeago='{}'>
            Set it anywhere - bottom, etc!

        **/
        var langBySpan = jQuery('span.sow-util-timeago-lang').data('lang') || '';
        if(typeof langBySpan === 'object')
            $.SOW.core.utils.config.lang__timeAgo = langBySpan;

        if(typeof sow_util_timeago_lang === 'object')
            $.SOW.core.utils.config.lang__timeAgo = sow_util_timeago_lang;
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


        el.not('.js-sowtimeagofied').addClass('js-sowtimeagofied').each(function(selector) {

            var _t      = jQuery(this),
                time    = _t.data('time')       || _t.attr('datetime'),
                live    = _t.attr('data-live')  || 'false',
                lang    = _t.data('lang')       || '',
                ID      = _t.attr('id')         || '';
            
            if(!time) 
                return

            if(typeof lang === 'object')
                $.SOW.core.utils.config.lang__timeAgo = lang;

            if(ID == '') {
                var ID = 'rand_' + $.SOW.helper.randomStr(3, 'N');
                _t.attr('id', ID);
            }


            $.SOW.core.utils.timeAgoLooper(_t, ID); // on load

            // update time every minute
            if(live+'' == 'true') {
                timeAgoList[ID] = setInterval(function() {
                    $.SOW.core.utils.timeAgoLooper(_t, ID);
                }, 60000);
            }

            loaded == true;

        });


        // -- * --
        if(loaded === true)
            $.SOW.helper.consoleLog('Init : ' + scriptInfo + ' : Time Ago');
        // -- * --

    },
        timeAgoLooper: function(_t, ID) {

            var time        = _t.data('time') || _t.attr('datetime');
            var templates   = $.SOW.core.utils.config.lang__timeAgo;
            var template    = function (t, n) {
                return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
            };

            // parse iso8601
            if(typeof time === 'string') { // timestamp skipped!

                time = time.replace(/\.\d+/,""); // remove milliseconds
                time = time.replace(/-/,"/").replace(/-/,"/");
                time = time.replace(/T/," ").replace(/Z/," UTC");
                time = time.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
                time = time.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900

            }

            var time        = new Date(time * 1000 || time);
            var now         = new Date();
            var seconds     = ((now.getTime() - time) * .001) >> 0;
            var minutes     = seconds / 60;
            var hours       = minutes / 60;
            var days        = hours / 24;
            var years       = days / 365;
            var finalTime   = (seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years));

            // Update
            _t.text(finalTime);

            // Do not refresh too old!
            if(typeof timeAgoList[ID] !== 'undefined' && (days > 3 || years > 1))
                clearInterval(timeAgoList[ID]);

        },

    cookieUtil: function(selector) {

        var el = jQuery(selector);
        
        if(el.length < 1)
            return;


        el.not('.js-sowcookiefied').addClass('js-sowcookiefied').on('click', function(e) {
            e.preventDefault();

            var _t              = jQuery(this),
                _set            = _t.data('cookie-set')         || '',
                _del            = _t.data('cookie-del')         || '',
                _toggle         = _t.data('cookie-toggle')      || '',
                _val            = _t.data('cookie-val')         || '1',
                _expire         = _t.data('cookie-expire')      || '7',
                _path           = _t.data('cookie-path')        || '/', /* Safari Issue */ // $.SOW.globals.cookie_secure,
                toastMsgSet     = _t.data('toast-msg-set')      || '',
                toastMsgDel     = _t.data('toast-msg-del')      || '',
                toastMsgPos     = _t.data('toast-msg-pos')      || 'top-center',
                toastTypeSet    = _t.data('toast-msg-type-set') || 'success',
                toastTypeDel    = _t.data('toast-msg-type-del') || 'success',
                toastMsg        = '',
                toastType       = '';


            // SET
            if(_set != '') {
                Cookies.set(_set, _val, { expires: _expire, path: _path });
                toastMsg    = toastMsgSet;
                toastType   = toastTypeSet;
            }


            // DEL
            else if(_del != '') {
                Cookies.remove(_del, { path: _path });
                toastMsg    = toastMsgDel;
                toastType   = toastTypeDel;
            }


            // TOGGLE
            else if(_toggle != '') {
                var chkCookie = Cookies.get(_toggle, { path: _path });

                if(!chkCookie) {
                    Cookies.set(_toggle, _val, { expires: _expire, path: _path });
                    toastMsg    = toastMsgSet;
                    toastType   = toastTypeSet;
                } else {
                    Cookies.remove(_toggle, { path: _path });
                    toastMsg    = toastMsgDel;
                    toastType   = toastTypeDel;
                }
            }


            // TOAST MESSAGE
            if(toastMsg != '' && typeof $.SOW.core.toast === 'object') {
                $.SOW.core.toast.destroy();
                $.SOW.core.toast.show(toastType, '', toastMsg, toastMsgPos, 1500, true);
            }
        });

    },

    slideshow: function(selector) {

        var el      = jQuery(selector),
            loaded  = false;
        
        if(el.length < 1)
            return;

        el.each(function() {

            var _t              = jQuery(this),
                dataBgs         = _t.data('sow-slideshow')              || '',
                dataBgsXs       = _t.data('sow-slideshow-xs')           || '',
                dataInterval    = _t.data('sow-slideshow-interval')     || 4000,
                dataFadeDelay   = _t.data('sow-slideshow-fade-delay')   || 1500,
                slideRand       = 'sow_'+$.SOW.helper.randomStr(3, 'L');


            // Is Mobile!
            if($.SOW.globals.is_mobile === true && dataBgsXs.length > 10)
                dataBgs = dataBgsXs;

            // should be a long string
            if(dataBgs.length < 10)
                return false;

            // remove attribute, already got!
            _t.removeAttr('data-sow-slideshow');

            // create a container, just to izolate stuff!
            _t.prepend('<div id="'+slideRand+'" class="sow-slideshow absolute-full z-index-0"></div>');
            
            // Split by comma
            var arrImgs = dataBgs.split(',');

            // Create array! Avoid checking the DOM each time!
            slideshowList[slideRand]            = {};
            slideshowList[slideRand].current    = 0;
            slideshowList[slideRand].itemsCount = 0;
            slideshowList[slideRand].timeOutInstance;

            // Create each item and push it to the container
            for(var i = 0; i < arrImgs.length; i++) {
                var _class_     = (i === 0) ? 'sow-slideshow-current' : '';
                var _display_   = (i === 0) ? '' : 'display:none;';


                var imgInstance         = new Image();
                    imgInstance.src     = arrImgs[i];
                    imgInstance.onload  = function(e) {/* on load - nothing */}
                    imgInstance.onerror = function(e) {/* on error - nothing */}

                    jQuery('#'+slideRand).prepend('<span class="sow-slideshow-item sow-slideshow-item-'+i+' absolute-full bg-cover ' + _class_ + '" style="z-index:0;'+_display_+'background-image:url(' + imgInstance.src + ')"></span>');
                    slideshowList[slideRand].itemsCount++;
            }

            // no images - no loop needed!
            // first image is already visible!
            if(arrImgs.length < 2)
                return false;


            // Looper start!
            slideLooper();
            function slideLooper() {
                slideshowList[slideRand].timeOutInstance = setTimeout(function () {

                    // determine next image
                    var next = slideshowList[slideRand].current + 1;
                    if(next >= slideshowList[slideRand].itemsCount)
                        next = 0;

                    jQuery('#'+slideRand+' span.sow-slideshow-item-'+slideshowList[slideRand].current).fadeOut(dataFadeDelay);
                    jQuery('#'+slideRand+' span.sow-slideshow-item-'+next).fadeIn(dataFadeDelay);
                    slideshowList[slideRand].current = next;

                    slideLooper();

                }, dataInterval);
            }



            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            // Pause on tab out of focus!
            function onVisibilityChanged() {

                if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden) {
                    // The tab has lost focus
                    clearTimeout(slideshowList[slideRand].timeOutInstance);
                } else {
                    // The tab has gained focus
                    slideshowList[slideRand].timeOutInstance = setTimeout(slideLooper, dataInterval);
                }

            }

            document.addEventListener("visibilitychange", onVisibilityChanged, false);
            document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
            document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
            document.addEventListener("msvisibilitychange", onVisibilityChanged, false);
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


            loaded = true;

        });



        // -- * --
        if(loaded === true)
            $.SOW.helper.consoleLog('Init : ' + scriptInfo + ' : Slideshow');
        // -- * --

    },

    cloner: function(selector) {

        var el      = jQuery(selector);
        
        if(el.length < 1)
            return;

        el.not('.js-sowclonified').addClass('js-sowclonified').on('click', function(e) {
            e.preventDefault();

            var _t              = jQuery(this),
                _target         = _t.data('clone-target')           || '',
                _destination    = _t.data('clone-destination')      || '',
                _cloneLimit     = _t.data('clone-limit')            || 0,
                _cloneMethod    = _t.data('clone-method')           || 'append',    // append|prepend
                _initSortable   = _t.attr('data-clone-sortable')    || 'false';

            if(_target == '' || _destination == '')
                return null;


            // clone and add required classes to work with
            var clone = jQuery(_target).clone();
                clone.addClass('js-cloned js-cloned-fresh');


            // limit cloned elements
            var _noOfClones = jQuery('.js-cloned', _destination).length,
                _cloneLimit = Number(_cloneLimit);


            // append clone
            if(_cloneMethod == 'prepend')
                jQuery(_destination).prepend(clone);
            else
                jQuery(_destination).append(clone);


            jQuery('.js-cloned-fresh input[type=text], .js-cloned-fresh input[type=email], .js-cloned-fresh input[type=number], .js-cloned-fresh textarea', _destination).not('.js-ignore').not('.js-clean-ignore').val(''); // empty

            jQuery('.js-cloned-fresh [data-cloned-replace-class]', _destination).each(function() {
                var __t = jQuery(this);
                    __t.removeAttr('class').attr('class', __t.data('cloned-replace-class'))
                        .removeAttr('data-cloned-replace-class');
            });

            jQuery('.js-cloned-fresh [data-cloned-replace-name]', _destination).each(function() {
                var __t         = jQuery(this),
                    _newName    = __t.data('cloned-replace-name') || 'item[$][]',
                    _newName    = _newName.replace('[$]', '['+Number(_noOfClones)+']');
                    __t.removeAttr('name').attr('name',  _newName)
                        .removeAttr('data-cloned-replace-name');
            });
            jQuery('.js-cloned-fresh [data-cloned-replace-attribute-name]', _destination).each(function() {
                var __t         = jQuery(this),
                    _attrName   = __t.data('cloned-replace-attribute-name')     || '',
                    _attrValue  = __t.data('cloned-replace-attribute-value')    || '',
                    _attrValue  = _attrValue.replace('[$]', '['+Number(_noOfClones)+']');
                    __t.removeAttr(_attrName).attr(_attrName, _attrValue)
                        .removeAttr('data-cloned-replace-attribute-name, data-cloned-replace-attribute-value');
            });


            // bind remove button to clone
            jQuery('.js-cloned-fresh '+selector+', .js-cloned-fresh .btn-clone-remove').removeClass('sow-util-cloner').on('click', function(e) {
                e.preventDefault();
                jQuery(this).parents('.js-cloned').remove();
                _t.removeClass('disabled').prop('disabled', false);
            });


            // remove identifier classes - job done!
            jQuery('.js-cloned-fresh', _destination).removeClass('js-cloned-fresh');


            // init sortable
            if(_initSortable+'' == 'true') {

                if(typeof $.SOW.vendor.sortable === 'object')
                    $.SOW.vendor.sortable.init(_destination, null);

            }

            // Reinits
            $.SOW.reinit(_destination);

            // limit cloned elements
            if(_cloneLimit > 0 && _noOfClones >= Number(_cloneLimit -1))
                _t.addClass('disabled').prop('disabled', true);

        });
        jQuery('.js-cloned').not('.js-clonedbounded').addClass('js-clonedbounded').each(function() {

            var _href = jQuery('a[data-clone-target]', jQuery(this));

            _href.on('click', function(e) {
                e.preventDefault();

                var _target = jQuery(this).data('clone-target') || '';
                if(_target == '') return;

                jQuery(this).parents('.js-cloned').remove();
                jQuery('.sow-util-cloner', _target).removeClass('disabled').prop('disabled', false);
                jQuery('a[data-clone-destination="'+_target+'"]').removeClass('disabled').prop('disabled', false);

            });

        });
        el.each(function() {

            var _t              = jQuery(this),
                _cloneLimit     = _t.data('clone-limit')            || 0,
                _cloneLimit     = Number(_cloneLimit),
                _destination    = _t.data('clone-destination')      || '',
                _noOfClones     = jQuery('.js-cloned', _destination).length;

            // limit cloned elements
            if(_cloneLimit > 0 && _noOfClones >= _cloneLimit)
                _t.addClass('disabled').prop('disabled', true);

        });

    },
    UtilAction: function(selector) {

        var el      = jQuery(selector);
        
        if(el.length < 1)
            return;

        if(el.hasClass('js-sowutilified'))
            return;


        el.not('.js-sowutilified').addClass('js-sowutilified').on('click', function(e) {

            var _t                      = jQuery(this),
                
                _showLoadingIcon        = _t.attr('data-ajax-show-loading-icon')        || 'true',

                // 'true' = do not toggle 'active'class
                _targetSelfIgnore       = _t.attr('data-util-self-ignore')              || 'false',

                _targetHide             = _t.data('util-target-hide')                   || '',
                _targetShow             = _t.data('util-target-show')                   || '',

                _targetClassAdd         = _t.data('util-target-class-add')              || '',
                _targetClassAddVal      = _t.data('util-target-class-add-val')          || '',

                _targetClassDel         = _t.data('util-target-class-remove')           || '',
                _targetClassDelVal      = _t.data('util-target-class-remove-val')       || '',

                _targetClassToggle      = _t.data('util-target-class-toggle')           || '',
                _targetClassToggleVal   = _t.data('util-target-class-toggle-val')       || '',

                _targetInput            = _t.data('util-target-input')                  || '',
                _targetInputVal         = _t.data('util-target-input-val')              || '',

                _targetPlaceholder      = _t.data('util-target-placeholder')            || '',
                _targetPlaceholderVal   = _t.data('util-target-placeholder-val')        || '',

                _targetReadonlyOn       = _t.data('util-target-readonly-on')            || '',
                _targetReadonlyOff      = _t.data('util-target-readonly-off')           || '',
                _targetReadonlyToggle   = _t.data('util-target-readonly-toggle')        || '',
                
                _targetDisableOn        = _t.data('util-target-disable-on')             || '',
                _targetDisableOff       = _t.data('util-target-disable-off')            || '',
                _targetDisableToggle    = _t.data('util-target-disable-toggle')         || '',

                _targetRemove           = _t.data('util-target-remove')                 || '',
                
                _groupActive            = _t.data('util-group-active')                  || '',
                _groupActiveClass       = _t.data('util-group-active-class')            || 'active',

                _targetFocus            = _t.data('util-target-focus')                  || '',

                // general toast, different than ajax
                _toastMsg               = _t.data('util-toast-msg')                     || '',
                _toastPosition          = _t.data('util-toast-position')                || 'top-center',
                _toastType              = _t.data('util-toast-type')                    || 'success',
                _toastTiming            = _t.data('util-toast-timeout')                 || 2500,

                // Ajax Request (on click)
                _targetAjaxRequest      = _t.data('util-ajax-request')                  || '',
                _targetAjaxMethod       = _t.data('util-ajax-method')                   || $.SOW.core.utils.config.method,
                _targetAjaxParams       = _t.data('util-ajax-params')                   || '',
                _targetAjaxAppend       = _t.data('util-ajax-append-response')          || '',
                _toastAjaxSuccessMsg    = _t.data('util-ajax-toast-success')            || 'Sucessfully Updated!',
                _toastAjaxPosition      = _t.data('util-ajax-toast-position')           || 'top-center',
                _toastAjaxTiming        = _t.data('util-ajax-toast-timeout')            || 2500;


            // Links only!
            if(_t.attr('href'))
                e.preventDefault();



            // Label : because fire twice
            // Is a DOM `issue` - the way it works
            if('label', _t) {
                e.preventDefault();

                if(jQuery('input', _t).is(':checked')) {
                    jQuery('input', _t).removeAttr('checked');
                } else {
                    jQuery('input', _t).attr('checked', true);
                }

            }


            // self : add .active class
            if(_targetSelfIgnore+'' != 'true' && _targetClassToggleVal == '')
                _t.toggleClass('active');


            // hide
            if(_targetHide != '')
                jQuery(_targetHide).addClass('hide hide-force');

            // show
            if(_targetShow != '')
                jQuery(_targetShow).removeClass('hide hide-force');

            // value
            if(_targetInputVal != '')
                jQuery(_targetInput || _t).val(_targetInputVal);

            // placeholder
            if(_targetPlaceholderVal != '')
                jQuery(_targetPlaceholder || _t).val(_targetPlaceholderVal);

            // class remove
            if(_targetClassDelVal != '')
                jQuery(_targetClassDel || _t).removeClass(_targetClassDelVal);

            // class add
            if(_targetClassAddVal != '')
                jQuery(_targetClassAdd || _t).addClass(_targetClassAddVal);

            // class toggle
            if(_targetClassToggleVal != '')
                jQuery(_targetClassToggle || _t).toggleClass(_targetClassToggleVal);

            // remove element
            if(_targetRemove != '')
                jQuery(_targetRemove).remove();

            // group active
            // like checkboxes layout made of links
            if(_groupActive != '') {

                // current state
                var _tCurrState = ( _t.hasClass(_groupActiveClass) ) ? 'active' : 'inactive';

                // reset first
                jQuery(_groupActive).removeClass(_groupActiveClass);

                // handle according to current state
                if(_tCurrState == 'active')
                    _t.addClass(_groupActiveClass);

            }


            // readonly:on
            if(_targetReadonlyOn != '')
                jQuery(_targetReadonlyOn).addClass('readonly').attr('readonly', true).prop('readonly', true);

            // readonly:off
            if(_targetReadonlyOff != '')
                jQuery(_targetReadonlyOff).removeClass('readonly').removeAttr('readonly').prop('readonly', false);

            // readonly:toggle
            if(_targetReadonlyToggle != '') {
                if(jQuery(_targetReadonlyToggle).attr('readonly')) {
                    jQuery(_targetReadonlyToggle).removeClass('readonly').removeAttr('readonly').prop('readonly', false);
                } else {
                    jQuery(_targetReadonlyToggle).removeClass('readonly').removeAttr('readonly').prop('readonly', false);
                }
            }


            // disable:on
            if(_targetDisableOn != '')
                jQuery(_targetDisableOn).addClass('disabled').attr('disabled', true).prop('disabled', true);

            // disable:off
            if(_targetDisableOff != '')
                jQuery(_targetDisableOff).removeClass('disabled').removeAttr('disabled').prop('disabled', false);

            // disable:toggle
            if(_targetDisableToggle != '') {
                if(jQuery(_targetDisableToggle).attr('disabled')) {
                    jQuery(_targetDisableToggle).removeClass('disabled').removeAttr('disabled').prop('disabled', false);
                } else {
                    jQuery(_targetDisableToggle).removeClass('disabled').removeAttr('disabled').prop('disabled', false);
                }
            }


            // focus
            if(_targetFocus != '') {

                setTimeout(function() {

                    jQuery(_targetFocus).focus();
                    
                }, 400);

            }


            // Toast message
            if(_targetAjaxRequest == '' && _toastMsg != '') {

                if(typeof $.SOW.core.toast === 'object')
                    $.SOW.core.toast.show(_toastType, '', _toastMsg, _toastPosition, Number(_toastTiming), true);

            }


            // AJAX REQUEST
            if(_targetAjaxRequest != '') {

                var data_params =  $.SOW.core.utils.config.data_params;
                if(_targetAjaxParams != '') {

                    var ajax_params_arr = $.SOW.helper.params_parse(_targetAjaxParams);
                    for (var i = 0; i < ajax_params_arr.length; ++i) {
                        data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
                    }

                }

                // Ajax Request
                jQuery.ajax({
                    url:            _targetAjaxRequest,
                    type:           _targetAjaxMethod,
                    data:           data_params,
                    beforeSend: function() {

                        // icon over form
                        if(_showLoadingIcon == 'true')
                            $.SOW.helper.loadingSpinner('show', _t);

                        $.SOW.helper.consoleLog('SOW Util : [Ajax][Request Sent]: ' + _targetAjaxRequest);

                    },

                    error:  function(XMLHttpRequest, textStatus, errorThrown) {

                        $.SOW.helper.loadingSpinner('hide');
                        if(typeof $.SOW.core.toast === 'object')
                            $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);

                    },

                    success: function(data) {

                        $.SOW.helper.loadingSpinner('hide');
                        $.SOW.helper.consoleLog('SOW Util : [Ajax][Server Response]: ' + data);


                        // Append Response
                        if(_targetAjaxAppend != '' && data != '') {

                            jQuery(_targetAjaxAppend).empty().append(data);
                            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                            // console log
                            $.SOW.helper.consoleLogReinit(scriptInfo, _targetAjaxAppend);
                            // reinit inside ajax container
                            $.SOW.reinit(_targetAjaxAppend);
                            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                        }


                        if(_toastAjaxSuccessMsg != '' && typeof $.SOW.core.toast === 'object')
                            $.SOW.core.toast.show('success', '', _toastAjaxSuccessMsg, _toastAjaxPosition, Number(_toastAjaxTiming), true);

                    }

                });

            }

        });

    },

    UtilForm: function(selector) {

        var el      = jQuery(selector);
        
        if(el.length < 1)
            return;

        if(el.hasClass('js-sowformutilified'))
            return;

        el.not('.js-sowformutilified').addClass('js-sowformutilified').each(function(selector) {

            var _t              = jQuery(this),
                _action         = _t.attr('data-util-form-action')              || '#',
                _method         = _t.attr('data-util-form-method')              || 'post',
                _toastSuccess   = _t.attr('data-util-form-toast-success')       || '',
                _toastError     = _t.attr('data-util-form-toast-error')         || 'Unexpected Internal error!',
                _toastPos       = _t.attr('data-util-form-toast-position')      || 'top-right',
                _showLoadingIcon= _t.attr('data-util-form-loading-icon')        || 'true',
                _dataType       = _t.attr('data-util-form-dataType')            || '',
                _contentType    = _t.attr('data-util-form-contentType')         || '',
                _params         = _t.attr('data-util-form-params')              || '',
                _submitBtn      = jQuery('.sow-util-form-submit', _t);



            /* button click */
            _submitBtn.on('click', function(e) {
                e.preventDefault();

                jQuery('input.sow-util-tmp', _t).remove();
                if(_params != '') {

                    var ajax_params_arr = $.SOW.helper.params_parse(_params);
                    for (var i = 0; i < ajax_params_arr.length; ++i) {
                        _t.append('<input type="text" class="hide hide-force sow-util-tmp" name="'+ajax_params_arr[i][0]+'" value="'+ajax_params_arr[i][1]+'">');
                    }

                }

                // Get values in array format
                var values          = jQuery('input, select, textarea', _t).serializeArray();


                // post|get
                if(_method.toLowerCase() == 'post') {

                    var __processData   = false;
                    var __contentType   = false;
                    var formData        = new FormData();

                    // append to jquery form
                    for(var key in values) {
                        formData.append(values[key].name, values[key].value);
                    }

                } else {

                    var __processData   = true;
                    var __contentType   = _contentType || $.SOW.core.utils.config.contentType;
                    var formData        = jQuery('input, select, textarea', _t).serialize();

                }

                jQuery.ajax({
                    url:            _action,
                    data:           formData,
                    type:           _method,
                    dataType:       _dataType || $.SOW.core.utils.config.dataType,
                    headers:        $.SOW.core.utils.config.headers,
                    crossDomain:    $.SOW.core.utils.config.crossDomain,
                    contentType:    __contentType,
                    processData:    __processData,
                    cache:          false,

                    beforeSend: function() {

                        if(_showLoadingIcon == 'true')
                            $.SOW.helper.loadingSpinner('show', _t);

                        jQuery('.sow-util-loader', _t).removeClass('hide hide-force');

                    },

                    error:  function(XMLHttpRequest, textStatus, errorThrown) {

                        // if debug enabled, see config
                        if($.SOW.config.sow__debug_enable === true) {

                            $.SOW.helper.consoleLog('----------------------------');
                            $.SOW.helper.consoleLog('--- AJAX  REQUEST ERROR ----');
                            $.SOW.helper.consoleLog('1. XMLHttpRequest:');
                            $.SOW.helper.consoleLog(XMLHttpRequest);
                            $.SOW.helper.consoleLog('2. textStatus:');
                            $.SOW.helper.consoleLog(textStatus);
                            $.SOW.helper.consoleLog('3. errorThrown:');
                            $.SOW.helper.consoleLog(errorThrown);
                            $.SOW.helper.consoleLog('----------------------------');

                        }

                        $.SOW.helper.loadingSpinner('hide');
                        jQuery('.sow-util-loader', _t).addClass('hide hide-force');
                        jQuery('input.sow-util-tmp', _t).remove();

                        if(typeof $.SOW.core.toast === 'object') {

                            $.SOW.core.toast.show('danger', '404 Error', _toastError, _toastPos, 0, true);

                        } else {

                            alert("[404] Unexpected internal error!");

                        }
                    },

                    success: function(data) {

                        $.SOW.helper.loadingSpinner('hide');
                        jQuery('.sow-util-loader', _t).addClass('hide hide-force');
                        jQuery('input.sow-util-tmp', _t).remove();
                        $.SOW.helper.consoleLog(data);

                        /* hide toastr */
                        if(typeof $.SOW.core.toast === 'object') {
                            $.SOW.core.toast.show('success', '', _toastSuccess, _toastPos, 1500, true);
                        }

                        /* hide dropdown */
                        _t.parent().find('a[data-toggle="dropdown"]').trigger('click');

                        /* update */
                        jQuery('input, select, textarea', _t).each(function() {

                            var _updateAttr = jQuery(this).attr('data-util-update');
                            var _updateVal = jQuery(this).val();

                            if(_updateAttr) {
                                jQuery(_updateAttr).html(_updateVal);
                            }

                        });

                    }

                });

            });

        });

    },

    UtilFormLiveMonitor: function(selector) {

        var el      = jQuery(selector);
        
        if(el.length < 1)
            return;

        if(el.hasClass('js-sowlfutilified'))
            return;


        el.not('.js-sowlfutilified').addClass('js-sowlfutilified').each(function(e) {

            var _t                          = jQuery(this),
                _formEl                     = this,
                _showLoadingIcon            = _t.attr('data-ajax-show-loading-icon')            || 'true',

                // Form Live Monitor (on element change/click)
                _formLiveMonitor            = _t.attr('data-util-live-monitor')                 || 'false',
                _formLiveMonitorEl          = _t.attr('data-util-live-monitor-elements')        || '*',
                _formLiveMonitorAppendData  = _t.attr('data-util-live-monitor-append-response') || '',
                _formLiveMonitorDelay       = _t.attr('data-util-live-monitor-user-delay')      || 1000,
                
                _ajaxURL                    = _t.attr('data-util-live-ajax-url')                || '',
                _ajaxMethod                 = _t.attr('data-util-live-ajax-method')             || 'POST',
                _ajaxParams                 = _t.attr('data-util-live-ajax-params')             || '',

                // general toast, different than ajax
                _toastMsg                   = _t.data('util-live-toast-msg')                    || '',
                _toastPosition              = _t.data('util-live-toast-position')               || 'top-center',
                _toastType                  = _t.data('util-live-toast-type')                   || 'success',
                _toastTiming                = _t.data('util-live-toast-timeout')                || 2500;

            if(_ajaxURL == '')
                return;

            // All elements
            if(_formLiveMonitorEl == '*')
                _formLiveMonitorEl = 'input, select, textarea';


            // Form Live Monitor
            jQuery(_formLiveMonitorEl, _t).not('.js-sowlfutilified').addClass('js-sowlfutilified').on('change', function(e) {

                var _thisEl = jQuery(this),
                    formTag = _thisEl.parents('form');

                if(_thisEl.hasClass('js-ignore'))
                    return;

                if(window.afterLiveFormChange)
                    clearTimeout(window.afterLiveFormChange);


                // Params
                jQuery('input.js-append').remove();
                _t.append('<input class="js-append" type="hidden" name="ajax" value="true">');
                if(_ajaxParams != '') {

                    var ajax_params_arr = $.SOW.helper.params_parse(_ajaxParams);
                    for (var i = 0; i < ajax_params_arr.length; ++i) {
                        _t.append('<input class="js-append" type="hidden" name="'+ajax_params_arr[i][0]+'" value="'+ajax_params_arr[i][1]+'">');
                    }

                }

                window.afterLiveFormChange = setTimeout(function() {

                    if(_ajaxMethod.toLowerCase() == 'post') {

                        var formData        = new FormData(_formEl);
                        var __processData   = false;
                        var __contentType   = false;

                    } else {

                        var __processData   = true;
                        var __contentType   = '';
                        var formData        = _t.serializeArray();

                    }

                    // Ajax Request
                    jQuery.ajax({
                        url:            _ajaxURL,
                        type:           _ajaxMethod,
                        data:           formData,
                        contentType:    __contentType,
                        processData:    __processData,

                        beforeSend: function() {

                            // icon over form
                            if(_showLoadingIcon == 'true')
                                $.SOW.helper.loadingSpinner('show', _t);

                            // Find form tag
                            // And disable submit button while in progress
                            jQuery('button[type=submit]', formTag).addClass('disabled').prop('disabled', true);

                        },

                        error:  function(XMLHttpRequest, textStatus, errorThrown) {

                            jQuery('button[type=submit]', formTag).removeClass('disabled').prop('disabled', false);
                            jQuery('input.js-append').remove();
                            $.SOW.helper.loadingSpinner('hide');
                            if(typeof $.SOW.core.toast === 'object')
                                $.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);

                        },

                        success: function(data) {

                            jQuery('button[type=submit]', formTag).removeClass('disabled').prop('disabled', false);
                            jQuery('input.js-append').remove();
                            $.SOW.helper.loadingSpinner('hide');

                            // Append Response
                            if(_formLiveMonitorAppendData != '' && data != '') {

                                jQuery(_formLiveMonitorAppendData).empty().append(data);
                                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                                // console log
                                $.SOW.helper.consoleLogReinit(scriptInfo, _formLiveMonitorAppendData);
                                // reinit inside ajax container
                                $.SOW.reinit(_formLiveMonitorAppendData);
                                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                            }


                            if(_toastMsg != '' && typeof $.SOW.core.toast === 'object')
                                $.SOW.core.toast.show(_toastType, '', _toastMsg, _toastPosition, Number(_toastTiming), true);

                        }

                    });


                }, Number(_formLiveMonitorDelay));

            });
            

        });

    },

    UtilLiveReload: function(selector) {

      let nodes = document.querySelectorAll(selector);
      if( !nodes ) return;

      nodes.forEach(function(_t) {

        /* Bind once! Ajax reinits */
        if(_t.classList.contains("js-sowrutilified"))
          return null;

        _t.classList.add('js-sowrutilified');

        /* Get Target */
        var _target             = _t.getAttribute('data-util-live-reload-target')       || '',
            _htmlTag            = _t.tagName.toLowerCase(),
            _type               = _t.getAttribute('type') || '',
            _action             = 'change';

        if(_target == '')
          return;

        /* action by html tag */
        if(_htmlTag == 'input') {
          _action = 'keyup';

          if(_type == 'radio' || _type == 'checkbox')
            _action = 'click';
        }

        else if(_htmlTag == 'textarea')
          _action = 'keyup';

        else if(_htmlTag == 'select')
          _action = 'change';

        else if(_htmlTag == 'a' || _htmlTag == 'button')
          _action = 'click';


        /* ajax function call */
        _t.addEventListener(_action, function(e) {
          __utilLiveReloadFunction(_target);
        });

      });


      /* ajax function call */
      function __utilLiveReloadFunction(_target) {

        var _t = document.querySelector(_target);
        if(typeof _t !== 'object') return;

        var ajaxURL             = _t.getAttribute('data-reload-ajax-url')           || '',
            ajaxMethod          = _t.getAttribute('data-reload-ajax-method')        || 'GET',
            ajaxParams          = _t.getAttribute('data-reload-ajax-params')        || '',
            ajaxDelay           = _t.getAttribute('data-reload-ajax-delay')         || 1000,
            _showLoadingIcon    = _t.getAttribute('data-ajax-show-loading-icon')    || 'true';

        // Custom Params : Populate
        var data_params = { ajax:'true' };
        if(ajaxParams != '') {

          var ajax_params_arr = $.SOW.helper.params_parse(ajaxParams);
          for (var i = 0; i < ajax_params_arr.length; ++i) {
            data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
          }

        }

        if(window.afterFormChange)
            clearTimeout(window.afterFormChange);

        window.afterFormChange = setTimeout(function() {

            // Ajax
            jQuery.ajax({
                url:            ajaxURL,
                type:           ajaxMethod,
                data:           data_params,

                beforeSend: function() { 

                  if(_showLoadingIcon == 'true')
                    $.SOW.helper.loadingSpinner('show');

                },

                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                  $.SOW.helper.loadingSpinner('hide');
                },

                success: function(data) { 

                  $.SOW.helper.loadingSpinner('hide');
                  jQuery(_target).empty().append(data);

                  // form live monitor
                  jQuery('.sow-util-form-live-monitor').removeClass('js-sowlfutilified');
                  $.SOW.core.utils.UtilFormLiveMonitor('.sow-util-form-live-monitor');
                  
                  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                  // console log
                  $.SOW.helper.consoleLogReinit(scriptInfo, _target);
                  // reinit inside ajax container
                  $.SOW.reinit(_target);
                  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                }
            });

        }, Number(ajaxDelay) );

      }

    }
  };
})(jQuery);

$.SOW.config.sow__debug_enable = true;
if(typeof $.SOW.config.autoinit === 'undefined') { $.SOW.config.autoinit = {}; }
$.SOW.config.autoinit['sow_header'] = ['$.SOW.core.header.init','null', null,false];
$.SOW.config.autoinit['sow_lazyload'] = ['$.SOW.core.lazyload.init','.lazy', null,true];
$.SOW.config.autoinit['sow_toast'] = ['$.SOW.core.toast.init','div.toast-on-load', null,true];
//$.SOW.config.autoinit['sow_btn_toggle'] = ['$.SOW.core.btn_toggle.init','.btn-toggle', null,true];
$.SOW.config.autoinit['sow_sidebar'] = ['$.SOW.core.sidebar.init','null', null,false];
$.SOW.config.autoinit['sow_scroll_to'] = ['$.SOW.core.scroll_to.init','a.scroll-to', {speed:400,s2t_enable:true,s2t_class:"btn-secondary",s2t_position:"end",s2t_mob_minH:1200,s2t_dsk_minH:2300},true];
$.SOW.config.autoinit['sow_gfont'] = ['$.SOW.core.gfont.init','[data-gfont]', null,true];
$.SOW.config.autoinit['sow_utils'] = ['$.SOW.core.utils.init','', {selector__initialFromString:".sow-util-initials",selector__timeAgo:".sow-util-timeago",selector__cookie:".sow-util-cookie",selector__slideshow:".sow-util-slideshow",selector__cloner:".sow-util-cloner",selector__action:".sow-util-action",selector__form:".sow-util-form",selector__formLiveMonitor:".sow-util-form-live-monitor",selector__liveReload:".sow-util-live-reload",lang__timeAgo:{seconds:"less than a minute ago",minute:"about a minute ago",minutes:"%d minutes ago",hour:"about an hour ago",hours:"about %d hours ago",day:"a day ago",days:"%d days ago",month:"about a month ago",months:"%d months ago",year:"about a year ago",years:"%d years ago"}},true];
