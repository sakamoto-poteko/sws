/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://qiaoer2017.github.io/lingdong/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(22);

var _animejs = __webpack_require__(23);

var _animejs2 = _interopRequireDefault(_animejs);

var _imagesloaded = __webpack_require__(24);

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//==========
/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
;(function (window) {

    'use strict';

    // From https://davidwalsh.name/javascript-debounce-function.

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // from http://www.quirksmode.org/js/events_properties.html#position
    function getMousePos(e) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    }

    var DOM = {};
    // The loader.
    DOM.loader = document.querySelector('.overlay--loader');
    // The room wrapper. This will be the element to be transformed in order to move around.
    DOM.scroller = document.querySelector('.container > .scroller');
    // The rooms.
    DOM.rooms = [].slice.call(DOM.scroller.querySelectorAll('.room'));
    // The content wrapper.
    DOM.content = document.querySelector('.content');
    // Rooms navigation controls.
    DOM.nav = {
        leftCtrl: DOM.content.querySelector('nav > .btn--nav-left'),
        rightCtrl: DOM.content.querySelector('nav > .btn--nav-right')
    };
    // Content slides.
    DOM.slides = [].slice.call(DOM.content.querySelectorAll('.slides > .slide'));
    // The off canvas menu button.
    DOM.menuCtrl = DOM.content.querySelector('.btn--menu');
    // The menu overlay.
    DOM.menuOverlay = DOM.content.querySelector('.overlay--menu');
    // The menu items
    DOM.menuItems = DOM.menuOverlay.querySelectorAll('.menu > .menu__item');
    // The info button.
    DOM.infoCtrl = DOM.content.querySelector('.btn--info');
    // The info overlay.
    DOM.infoOverlay = DOM.content.querySelector('.overlay--info');
    // The info text.
    DOM.infoText = DOM.infoOverlay.querySelector('.info');

    var currentRoom = 0,

    // Total number of rooms.
    totalRooms = DOM.rooms.length,

    // Initial transform.
    initTransform = { translateX: 0, translateY: 0, translateZ: '500px', rotateX: 0, rotateY: 0, rotateZ: 0 },

    // Reset transform.
    resetTransform = { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },

    // View from top.
    menuTransform = { translateX: 0, translateY: '150%', translateZ: 0, rotateX: '15deg', rotateY: 0, rotateZ: 0 },
        menuTransform = { translateX: 0, translateY: '50%', translateZ: 0, rotateX: '-10deg', rotateY: 0, rotateZ: 0 },

    // Info view transform.
    infoTransform = {
        translateX: 0,
        translateY: 0,
        translateZ: '200px',
        rotateX: '2deg',
        rotateY: 0,
        rotateZ: '4deg'
    },

    // Room initial moving transition.
    initTransition = { speed: '0.9s', easing: 'ease' },

    // Room moving transition.
    roomTransition = { speed: '0.4s', easing: 'ease' },

    // View from top transition.
    menuTransition = { speed: '1.5s', easing: 'cubic-bezier(0.2,1,0.3,1)' },

    // Info transition.
    infoTransition = { speed: '15s', easing: 'cubic-bezier(0.3,1,0.3,1)' },

    // Tilt transition
    tiltTransition = { speed: '0.2s', easing: 'ease-out' },
        tilt = false,

    // How much to rotate when the mouse moves.
    tiltRotation = {
        rotateX: 1, // a relative rotation of -1deg to 1deg on the x-axis
        rotateY: -3 // a relative rotation of -3deg to 3deg on the y-axis
    },

    // Transition end event handler.
    onEndTransition = function onEndTransition(el, callback) {
        var onEndCallbackFn = function onEndCallbackFn(ev) {
            this.removeEventListener('transitionend', onEndCallbackFn);
            if (callback && typeof callback === 'function') {
                callback.call();
            }
        };
        el.addEventListener('transitionend', onEndCallbackFn);
    },

    // Window sizes.
    win = { width: window.innerWidth, height: window.innerHeight },

    // Check if moving inside the room and check if navigating.
    isMoving,
        isNavigating;

    function init() {
        // Move into the current room.
        move({ transition: initTransition, transform: initTransform }).then(function () {
            initTilt();
        });
        // Animate the current slide in.
        showSlide(100);
        // Init/Bind events.
        initEvents();
    }

    function initTilt() {
        applyRoomTransition(tiltTransition);
        tilt = true;
    }

    function removeTilt() {
        tilt = false;
    }

    function move(opts) {
        return new Promise(function (resolve, reject) {
            if (isMoving && !opts.stopTransition) {
                return false;
            }
            isMoving = true;

            if (opts.transition) {
                applyRoomTransition(opts.transition);
            }

            if (opts.transform) {
                applyRoomTransform(opts.transform);
                var onEndFn = function onEndFn() {
                    isMoving = false;
                    resolve();
                };
                onEndTransition(DOM.scroller, onEndFn);
            } else {
                resolve();
            }
        });
    }

    function initEvents() {
        // Mousemove event / Tilt functionality.
        var onMouseMoveFn = function onMouseMoveFn(ev) {
            requestAnimationFrame(function () {
                if (!tilt) return false;

                var mousepos = getMousePos(ev),

                // transform values
                rotX = tiltRotation.rotateX ? initTransform.rotateX - (2 * tiltRotation.rotateX / win.height * mousepos.y - tiltRotation.rotateX) : 0,
                    rotY = tiltRotation.rotateY ? initTransform.rotateY - (2 * tiltRotation.rotateY / win.width * mousepos.x - tiltRotation.rotateY) : 0;

                // apply transform
                applyRoomTransform({
                    'translateX': initTransform.translateX,
                    'translateY': initTransform.translateY,
                    'translateZ': initTransform.translateZ,
                    'rotateX': rotX + 'deg',
                    'rotateY': rotY + 'deg',
                    'rotateZ': initTransform.rotateZ
                });
            });
        },

        // Window resize.
        debounceResizeFn = debounce(function () {
            win = { width: window.innerWidth, height: window.innerHeight };
        }, 10);

        document.addEventListener('mousemove', onMouseMoveFn);
        window.addEventListener('resize', debounceResizeFn);

        // Room navigation.
        var onNavigatePrevFn = function onNavigatePrevFn() {
            navigate('prev');
            togglePrevNav();
        },
            onNavigateNextFn = function onNavigateNextFn() {
            if (currentRoom === totalRooms - 1) {
                window.location.href = './jobs.html';
                return;
            }
            navigate('next');
            togglePrevNav();
        };

        DOM.nav.leftCtrl.addEventListener('click', onNavigatePrevFn);
        DOM.nav.leftCtrl.style.visibility = 'hidden';
        DOM.nav.rightCtrl.addEventListener('click', onNavigateNextFn);

        // Menu click.
        DOM.menuCtrl.addEventListener('click', toggleMenu);

        // Info click.
        DOM.infoCtrl.addEventListener('click', toggleInfo);
    }

    // 切换向前按钮的显示/隐藏
    function togglePrevNav() {
        if (currentRoom !== 0) {
            DOM.nav.leftCtrl.style.visibility = 'visible';
        } else {
            DOM.nav.leftCtrl.style.visibility = 'hidden';
        }
    }

    function applyRoomTransform(transform) {
        DOM.scroller.style.transform = 'translate3d(' + transform.translateX + ', ' + transform.translateY + ', ' + transform.translateZ + ') ' + 'rotate3d(1,0,0,' + transform.rotateX + ') rotate3d(0,1,0,' + transform.rotateY + ') rotate3d(0,0,1,' + transform.rotateZ + ')';
    }

    function applyRoomTransition(transition) {
        DOM.scroller.style.transition = transition === 'none' ? transition : 'transform ' + transition.speed + ' ' + transition.easing;
    }

    function toggleSlide(dir, _delay) {
        var slide = DOM.slides[currentRoom],

        // Slide's name.
        name = slide.querySelector('.slide__name'),

        // Slide's title and date elements.
        title = slide.querySelector('.slide__title'),
            date = slide.querySelector('.slide__date');

        _delay = _delay !== undefined ? _delay : 0;

        _animejs2.default.remove([name, title, date]);
        var animeOpts = {
            targets: [name, title, date],
            duration: dir === 'in' ? 400 : 400,
            //delay: 0,//dir === 'in' ? 150 : 0,
            delay: function delay(t, i, c) {
                return _delay + 75 + i * 75;
            },
            easing: [0.25, 0.1, 0.25, 1],
            opacity: {
                value: dir === 'in' ? [0, 1] : [1, 0],
                duration: dir === 'in' ? 550 : 250
            },
            translateY: function translateY(t, i) {
                return dir === 'in' ? [150, 0] : [0, -150];
            }
        };
        if (dir === 'in') {
            animeOpts.begin = function () {
                slide.classList.add('slide--current');
            };
        } else {
            animeOpts.complete = function () {
                slide.classList.remove('slide--current');
            };
        }
        (0, _animejs2.default)(animeOpts);
    }

    function showSlide(delay) {
        toggleSlide('in', delay);
    }

    function hideSlide(delay) {
        toggleSlide('out', delay);
    }

    function navigate(dir) {
        if (isMoving || isNavigating) {
            return false;
        }
        isNavigating = true;

        var room = DOM.rooms[currentRoom];

        // Remove tilt.
        removeTilt();
        // Animate the current slide out - animate the name, title and date elements.
        hideSlide();

        // Update currentRoom.
        if (dir === 'next') {
            currentRoom = currentRoom < totalRooms - 1 ? currentRoom + 1 : 0;
        } else {
            currentRoom = currentRoom > 0 ? currentRoom - 1 : totalRooms - 1;
        }

        // Position the next room.
        var nextRoom = DOM.rooms[currentRoom];
        nextRoom.style.transform = 'translate3d(' + (dir === 'next' ? 100 : -100) + '%,0,0) translate3d(' + (dir === 'next' ? 1 : -1) + 'px,0,0)';
        nextRoom.style.opacity = 1;

        // Move back.
        move({ transition: roomTransition, transform: resetTransform }).then(function () {
            // Move left or right.
            return move({
                transform: {
                    translateX: (dir === 'next' ? -100 : 100) + '%',
                    translateY: 0,
                    translateZ: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                }
            });
        }).then(function () {
            // Update current room class.
            nextRoom.classList.add('room--current');
            room.classList.remove('room--current');
            room.style.opacity = 0;

            // Show the next slide.
            showSlide();

            // Move into room.
            // Update final transform state:
            return move({
                transform: {
                    translateX: (dir === 'next' ? -100 : 100) + '%',
                    translateY: 0,
                    translateZ: '500px',
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                }
            });
        }).then(function () {
            // Reset positions.
            applyRoomTransition('none');
            nextRoom.style.transform = 'translate3d(0,0,0)';
            applyRoomTransform(initTransform);

            setTimeout(function () {
                initTilt();
            }, 60);
            isNavigating = false;
        });
    }

    function toggleMenu() {
        if ( /*isMoving ||*/isNavigating) {
            return false;
        }
        if (DOM.menuCtrl.classList.contains('btn--active')) {
            // Close it.
            closeMenu();
        } else {
            // Open it.
            showMenu();
        }
    }

    function showMenu() {
        // Button becomes cross.
        DOM.menuCtrl.classList.add('btn--active');
        // Remove tilt.
        removeTilt();
        // Add adjacent rooms.
        //addAdjacentRooms();
        // Hide current slide.
        hideSlide();
        // Apply menu transition.
        applyRoomTransition(menuTransition);
        // View from top:
        move({ transform: menuTransform, stopTransition: true });
        // Show menu items
        _animejs2.default.remove(DOM.menuItems);
        (0, _animejs2.default)({
            targets: DOM.menuItems,
            duration: 500,
            easing: [0.2, 1, 0.3, 1],
            delay: function delay(t, i) {
                return 250 + 50 * i;
            },
            translateY: [150, 0],
            opacity: {
                value: [0, 1],
                duration: 200,
                easing: 'linear'
            },
            begin: function begin() {
                DOM.menuOverlay.classList.add('overlay--active');
            }
        });
        _animejs2.default.remove(DOM.menuOverlay);
        (0, _animejs2.default)({
            targets: DOM.menuOverlay,
            duration: 1000,
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [0, 1]
        });
    }

    function closeMenu() {
        // Button becomes menu.
        DOM.menuCtrl.classList.remove('btn--active');
        // Apply room transition.
        applyRoomTransition(roomTransition);
        // Show current slide.
        showSlide(150);
        // back to room view:
        move({ transform: initTransform, stopTransition: true }).then(function () {
            // Remove adjacent rooms.
            //removeAdjacentRooms();
            // Init tilt.
            initTilt();
        });
        _animejs2.default.remove(DOM.menuItems);
        (0, _animejs2.default)({
            targets: DOM.menuItems,
            duration: 250,
            easing: [0.25, 0.1, 0.25, 1],
            delay: function delay(t, i, c) {
                return 40 * (c - i - 1);
            },
            translateY: [0, 150],
            opacity: {
                value: [1, 0],
                duration: 250
            },
            complete: function complete() {
                DOM.menuOverlay.classList.remove('overlay--active');
            }
        });
        _animejs2.default.remove(DOM.menuOverlay);
        (0, _animejs2.default)({
            targets: DOM.menuOverlay,
            duration: 400,
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [1, 0]
        });
    }

    function addAdjacentRooms() {
        // Current room.
        var room = DOM.rooms[currentRoom],

        // Adjacent rooms.
        nextRoom = DOM.rooms[currentRoom < totalRooms - 1 ? currentRoom + 1 : 0],
            prevRoom = DOM.rooms[currentRoom > 0 ? currentRoom - 1 : totalRooms - 1];

        // Position the adjacent rooms.
        nextRoom.style.transform = 'translate3d(100%,0,0) translate3d(3px,0,0)';
        nextRoom.style.opacity = 1;
        prevRoom.style.transform = 'translate3d(-100%,0,0) translate3d(-3px,0,0)';
        prevRoom.style.opacity = 1;
    }

    function removeAdjacentRooms() {
        // Current room.
        var room = DOM.rooms[currentRoom],

        // Adjacent rooms.
        nextRoom = DOM.rooms[currentRoom < totalRooms - 1 ? currentRoom + 1 : 0],
            prevRoom = DOM.rooms[currentRoom > 0 ? currentRoom - 1 : totalRooms - 1];

        // Position the adjacent rooms.
        nextRoom.style.transform = 'none';
        nextRoom.style.opacity = 0;
        prevRoom.style.transform = 'none';
        prevRoom.style.opacity = 0;
    }

    function toggleInfo() {
        if (isNavigating) {
            return false;
        }
        if (DOM.infoCtrl.classList.contains('btn--active')) {
            // Close it.
            closeInfo();
        } else {
            // Open it.
            showInfo();
        }
    }

    function showInfo() {
        // Button becomes cross.
        DOM.infoCtrl.classList.add('btn--active');
        // Remove tilt.
        removeTilt();
        // Hide current slide.
        hideSlide();
        // Apply info transition.
        applyRoomTransition(infoTransition);
        // Infoview:
        move({ transform: infoTransform, stopTransition: true });
        // Show info text and animate photos out of the walls.
        var photos = DOM.rooms[currentRoom].querySelectorAll('.room__img');
        _animejs2.default.remove(photos);
        (0, _animejs2.default)({
            targets: photos,
            duration: function duration() {
                return _animejs2.default.random(15000, 30000);
            },
            easing: [0.3, 1, 0.3, 1],
            translateY: function translateY() {
                return _animejs2.default.random(-50, 50);
            },
            rotateX: function rotateX() {
                return _animejs2.default.random(-2, 2);
            },
            rotateZ: function rotateZ() {
                return _animejs2.default.random(-5, 5);
            },
            translateZ: function translateZ() {
                return [10, _animejs2.default.random(50, win.width / 3)];
            }
        });
        // Animate info text and overlay.
        _animejs2.default.remove([DOM.infoOverlay, DOM.infoText]);
        var animeInfoOpts = {
            targets: [DOM.infoOverlay, DOM.infoText],
            duration: 1500,
            delay: function delay(t, i) {
                return !i ? 0 : 150;
            },
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [0, 1],
            translateY: function translateY(t, i) {
                return !i ? 0 : [30, 0];
            },
            begin: function begin() {
                DOM.infoOverlay.classList.add('overlay--active');
            }
        };
        (0, _animejs2.default)(animeInfoOpts);
    }

    function closeInfo() {
        // Button becomes info.
        DOM.infoCtrl.classList.remove('btn--active');
        // Apply room transition.
        applyRoomTransition(roomTransition);
        // Show current slide.
        showSlide(100);
        // back to room view:
        move({ transform: initTransform, stopTransition: true }).then(function () {
            initTilt();
        });

        // Hide info text and animate photos into the walls.
        var photos = DOM.rooms[currentRoom].querySelectorAll('.room__img');
        _animejs2.default.remove(photos);
        (0, _animejs2.default)({
            targets: photos,
            duration: 400,
            easing: [0.3, 1, 0.3, 1],
            translateY: 0,
            rotateX: 0,
            rotateZ: 0,
            translateZ: 10
        });
        // Animate info text and overlay.
        _animejs2.default.remove([DOM.infoOverlay, DOM.infoText]);
        var animeInfoOpts = {
            targets: [DOM.infoOverlay, DOM.infoText],
            duration: 400,
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [1, 0],
            translateY: function translateY(t, i) {
                return !i ? 0 : [0, 30];
            },
            complete: function complete() {
                DOM.infoOverlay.classList.remove('overlay--active');
            }
        };
        (0, _animejs2.default)(animeInfoOpts);
    }

    // Preload all the images.
    (0, _imagesloaded2.default)(DOM.scroller, function () {
        var extradelay = 1000;
        // Slide out loader.
        (0, _animejs2.default)({
            targets: DOM.loader,
            duration: 600,
            easing: 'easeInOutCubic',
            delay: extradelay,
            translateY: '-100%',
            begin: function begin() {
                init();
            },
            complete: function complete() {
                DOM.loader.classList.remove('overlay--active');
            }
        });
    });
})(window);
//====================
document.getElementById('history-back').onclick = function (e) {
    e.preventDefault();
    window.history.back();
};

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,r,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[r]=p.value)};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(e){var r=0;return $jscomp.iteratorPrototype(function(){return r<e.length?{done:!1,value:e[r++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(e,r){$jscomp.initSymbolIterator();e instanceof String&&(e+="");var p=0,m={next:function(){if(p<e.length){var u=p++;return{value:r(u,e[u]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(e,r,p,m){if(r){p=$jscomp.global;e=e.split(".");for(m=0;m<e.length-1;m++){var u=e[m];u in p||(p[u]={});p=p[u]}e=e[e.length-1];m=p[e];r=r(m);r!=m&&null!=r&&$jscomp.defineProperty(p,e,{configurable:!0,writable:!0,value:r})}};$jscomp.polyfill("Array.prototype.keys",function(e){return e?e:function(){return $jscomp.iteratorFromArray(this,function(e){return e})}},"es6-impl","es3");var $jscomp$this=this;
(function(e,r){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"===typeof module&&module.exports?module.exports=r():e.anime=r()})(this,function(){function e(a){if(!h.col(a))try{return document.querySelectorAll(a)}catch(c){}}function r(a,c){for(var d=a.length,b=2<=arguments.length?arguments[1]:void 0,f=[],n=0;n<d;n++)if(n in a){var k=a[n];c.call(b,k,n,a)&&f.push(k)}return f}function p(a){return a.reduce(function(a,d){return a.concat(h.arr(d)?p(d):d)},[])}function m(a){if(h.arr(a))return a;
h.str(a)&&(a=e(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function u(a,c){return a.some(function(a){return a===c})}function C(a){var c={},d;for(d in a)c[d]=a[d];return c}function D(a,c){var d=C(a),b;for(b in a)d[b]=c.hasOwnProperty(b)?c[b]:a[b];return d}function z(a,c){var d=C(a),b;for(b in c)d[b]=h.und(a[b])?c[b]:a[b];return d}function T(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,d,k){return c+c+d+d+k+k});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
a=parseInt(c[1],16);var d=parseInt(c[2],16),c=parseInt(c[3],16);return"rgba("+a+","+d+","+c+",1)"}function U(a){function c(a,c,b){0>b&&(b+=1);1<b&&--b;return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a=parseInt(d[1])/360;var b=parseInt(d[2])/100,f=parseInt(d[3])/100,d=d[4]||1;if(0==b)f=b=a=f;else{var n=.5>f?f*(1+b):f+b-f*b,k=2*f-n,f=c(k,n,a+1/3),b=c(k,n,a);a=c(k,n,a-1/3)}return"rgba("+
255*f+","+255*b+","+255*a+","+d+")"}function y(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a))return a[2]}function V(a){if(-1<a.indexOf("translate")||"perspective"===a)return"px";if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function I(a,c){return h.fnc(a)?a(c.target,c.id,c.total):a}function E(a,c){if(c in a.style)return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function J(a,c){if(h.dom(a)&&
u(W,c))return"transform";if(h.dom(a)&&(a.getAttribute(c)||h.svg(a)&&a[c]))return"attribute";if(h.dom(a)&&"transform"!==c&&E(a,c))return"css";if(null!=a[c])return"object"}function X(a,c){var d=V(c),d=-1<c.indexOf("scale")?1:0+d;a=a.style.transform;if(!a)return d;for(var b=[],f=[],n=[],k=/(\w+)\((.+?)\)/g;b=k.exec(a);)f.push(b[1]),n.push(b[2]);a=r(n,function(a,b){return f[b]===c});return a.length?a[0]:d}function K(a,c){switch(J(a,c)){case "transform":return X(a,c);case "css":return E(a,c);case "attribute":return a.getAttribute(c)}return a[c]||
0}function L(a,c){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;var b=y(a)||0;c=parseFloat(c);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return c+a+b;case "-":return c-a+b;case "*":return c*a+b}}function F(a,c){return Math.sqrt(Math.pow(c.x-a.x,2)+Math.pow(c.y-a.y,2))}function M(a){a=a.points;for(var c=0,d,b=0;b<a.numberOfItems;b++){var f=a.getItem(b);0<b&&(c+=F(d,f));d=f}return c}function N(a){if(a.getTotalLength)return a.getTotalLength();switch(a.tagName.toLowerCase()){case "circle":return 2*
Math.PI*a.getAttribute("r");case "rect":return 2*a.getAttribute("width")+2*a.getAttribute("height");case "line":return F({x:a.getAttribute("x1"),y:a.getAttribute("y1")},{x:a.getAttribute("x2"),y:a.getAttribute("y2")});case "polyline":return M(a);case "polygon":var c=a.points;return M(a)+F(c.getItem(c.numberOfItems-1),c.getItem(0))}}function Y(a,c){function d(b){b=void 0===b?0:b;return a.el.getPointAtLength(1<=c+b?c+b:0)}var b=d(),f=d(-1),n=d(1);switch(a.property){case "x":return b.x;case "y":return b.y;
case "angle":return 180*Math.atan2(n.y-f.y,n.x-f.x)/Math.PI}}function O(a,c){var d=/-?\d*\.?\d+/g,b;b=h.pth(a)?a.totalLength:a;if(h.col(b))if(h.rgb(b)){var f=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b=f?"rgba("+f[1]+",1)":b}else b=h.hex(b)?T(b):h.hsl(b)?U(b):void 0;else f=(f=y(b))?b.substr(0,b.length-f.length):b,b=c&&!/\s/g.test(b)?f+c:f;b+="";return{original:b,numbers:b.match(d)?b.match(d).map(Number):[0],strings:h.str(a)||c?b.split(d):[]}}function P(a){a=a?p(h.arr(a)?a.map(m):m(a)):[];return r(a,
function(a,d,b){return b.indexOf(a)===d})}function Z(a){var c=P(a);return c.map(function(a,b){return{target:a,id:b,total:c.length}})}function aa(a,c){var d=C(c);if(h.arr(a)){var b=a.length;2!==b||h.obj(a[0])?h.fnc(c.duration)||(d.duration=c.duration/b):a={value:a}}return m(a).map(function(a,b){b=b?0:c.delay;a=h.obj(a)&&!h.pth(a)?a:{value:a};h.und(a.delay)&&(a.delay=b);return a}).map(function(a){return z(a,d)})}function ba(a,c){var d={},b;for(b in a){var f=I(a[b],c);h.arr(f)&&(f=f.map(function(a){return I(a,
c)}),1===f.length&&(f=f[0]));d[b]=f}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return h.arr(a)?A.apply(this,a):Q[a]}function da(a,c){var d;return a.tweens.map(function(b){b=ba(b,c);var f=b.value,e=K(c.target,a.name),k=d?d.to.original:e,k=h.arr(f)?f[0]:k,w=L(h.arr(f)?f[1]:f,k),e=y(w)||y(k)||y(e);b.from=O(k,e);b.to=O(w,e);b.start=d?d.end:a.offset;b.end=b.start+b.delay+b.duration;b.easing=ca(b.easing);b.elasticity=(1E3-Math.min(Math.max(b.elasticity,1),999))/
1E3;b.isPath=h.pth(f);b.isColor=h.col(b.from.original);b.isColor&&(b.round=1);return d=b})}function ea(a,c){return r(p(a.map(function(a){return c.map(function(b){var c=J(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})),function(a){return!h.und(a)})}function R(a,c,d,b){var f="delay"===a;return c.length?(f?Math.min:Math.max).apply(Math,c.map(function(b){return b[a]})):f?b.delay:d.offset+b.delay+
b.duration}function fa(a){var c=D(ga,a),d=D(S,a),b=Z(a.targets),f=[],e=z(c,d),k;for(k in a)e.hasOwnProperty(k)||"targets"===k||f.push({name:k,offset:e.offset,tweens:aa(a[k],d)});a=ea(b,f);return z(c,{children:[],animatables:b,animations:a,duration:R("duration",a,c,d),delay:R("delay",a,c,d)})}function q(a){function c(){return window.Promise&&new Promise(function(a){return p=a})}function d(a){return g.reversed?g.duration-a:a}function b(a){for(var b=0,c={},d=g.animations,f=d.length;b<f;){var e=d[b],
k=e.animatable,h=e.tweens,n=h.length-1,l=h[n];n&&(l=r(h,function(b){return a<b.end})[0]||l);for(var h=Math.min(Math.max(a-l.start-l.delay,0),l.duration)/l.duration,w=isNaN(h)?1:l.easing(h,l.elasticity),h=l.to.strings,p=l.round,n=[],m=void 0,m=l.to.numbers.length,t=0;t<m;t++){var x=void 0,x=l.to.numbers[t],q=l.from.numbers[t],x=l.isPath?Y(l.value,w*x):q+w*(x-q);p&&(l.isColor&&2<t||(x=Math.round(x*p)/p));n.push(x)}if(l=h.length)for(m=h[0],w=0;w<l;w++)p=h[w+1],t=n[w],isNaN(t)||(m=p?m+(t+p):m+(t+" "));
else m=n[0];ha[e.type](k.target,e.property,m,c,k.id);e.currentValue=m;b++}if(b=Object.keys(c).length)for(d=0;d<b;d++)H||(H=E(document.body,"transform")?"transform":"-webkit-transform"),g.animatables[d].target.style[H]=c[d].join(" ");g.currentTime=a;g.progress=a/g.duration*100}function f(a){if(g[a])g[a](g)}function e(){g.remaining&&!0!==g.remaining&&g.remaining--}function k(a){var k=g.duration,n=g.offset,w=n+g.delay,r=g.currentTime,x=g.reversed,q=d(a);if(g.children.length){var u=g.children,v=u.length;
if(q>=g.currentTime)for(var G=0;G<v;G++)u[G].seek(q);else for(;v--;)u[v].seek(q)}if(q>=w||!k)g.began||(g.began=!0,f("begin")),f("run");if(q>n&&q<k)b(q);else if(q<=n&&0!==r&&(b(0),x&&e()),q>=k&&r!==k||!k)b(k),x||e();f("update");a>=k&&(g.remaining?(t=h,"alternate"===g.direction&&(g.reversed=!g.reversed)):(g.pause(),g.completed||(g.completed=!0,f("complete"),"Promise"in window&&(p(),m=c()))),l=0)}a=void 0===a?{}:a;var h,t,l=0,p=null,m=c(),g=fa(a);g.reset=function(){var a=g.direction,c=g.loop;g.currentTime=
0;g.progress=0;g.paused=!0;g.began=!1;g.completed=!1;g.reversed="reverse"===a;g.remaining="alternate"===a&&1===c?2:c;b(0);for(a=g.children.length;a--;)g.children[a].reset()};g.tick=function(a){h=a;t||(t=h);k((l+h-t)*q.speed)};g.seek=function(a){k(d(a))};g.pause=function(){var a=v.indexOf(g);-1<a&&v.splice(a,1);g.paused=!0};g.play=function(){g.paused&&(g.paused=!1,t=0,l=d(g.currentTime),v.push(g),B||ia())};g.reverse=function(){g.reversed=!g.reversed;t=0;l=d(g.currentTime)};g.restart=function(){g.pause();
g.reset();g.play()};g.finished=m;g.reset();g.autoplay&&g.play();return g}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},S={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},W="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),H,h={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},
pth:function(a){return h.obj(a)&&a.hasOwnProperty("totalLength")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||h.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return h.hex(a)||h.rgb(a)||h.hsl(a)}},A=function(){function a(a,
d,b){return(((1-3*b+3*d)*a+(3*b-6*d))*a+3*d)*a}return function(c,d,b,f){if(0<=c&&1>=c&&0<=b&&1>=b){var e=new Float32Array(11);if(c!==d||b!==f)for(var k=0;11>k;++k)e[k]=a(.1*k,c,b);return function(k){if(c===d&&b===f)return k;if(0===k)return 0;if(1===k)return 1;for(var h=0,l=1;10!==l&&e[l]<=k;++l)h+=.1;--l;var l=h+(k-e[l])/(e[l+1]-e[l])*.1,n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(.001<=n){for(h=0;4>h;++h){n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(0===n)break;var m=a(l,c,b)-k,l=l-m/n}k=l}else if(0===
n)k=l;else{var l=h,h=h+.1,g=0;do m=l+(h-l)/2,n=a(m,c,b)-k,0<n?h=m:l=m;while(1e-7<Math.abs(n)&&10>++g);k=m}return a(k,d,f)}}}}(),Q=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var c="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,
.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},b={linear:A(.25,.25,.75,.75)},f={},e;for(e in d)f.type=e,d[f.type].forEach(function(a){return function(d,f){b["ease"+a.type+c[f]]=h.fnc(d)?
d:A.apply($jscomp$this,d)}}(f)),f={type:f.type};return b}(),ha={css:function(a,c,d){return a.style[c]=d},attribute:function(a,c,d){return a.setAttribute(c,d)},object:function(a,c,d){return a[c]=d},transform:function(a,c,d,b,f){b[f]||(b[f]=[]);b[f].push(c+"("+d+")")}},v=[],B=0,ia=function(){function a(){B=requestAnimationFrame(c)}function c(c){var b=v.length;if(b){for(var d=0;d<b;)v[d]&&v[d].tick(c),d++;a()}else cancelAnimationFrame(B),B=0}return a}();q.version="2.2.0";q.speed=1;q.running=v;q.remove=
function(a){a=P(a);for(var c=v.length;c--;)for(var d=v[c],b=d.animations,f=b.length;f--;)u(a,b[f].animatable.target)&&(b.splice(f,1),b.length||d.pause())};q.getValue=K;q.path=function(a,c){var d=h.str(a)?e(a)[0]:a,b=c||100;return function(a){return{el:d,property:a,totalLength:N(d)*(b/100)}}};q.setDashoffset=function(a){var c=N(a);a.setAttribute("stroke-dasharray",c);return c};q.bezier=A;q.easings=Q;q.timeline=function(a){var c=q(a);c.pause();c.duration=0;c.add=function(d){c.children.forEach(function(a){a.began=
!0;a.completed=!0});m(d).forEach(function(b){var d=z(b,D(S,a||{}));d.targets=d.targets||a.targets;b=c.duration;var e=d.offset;d.autoplay=!1;d.direction=c.direction;d.offset=h.und(e)?b:L(e,b);c.began=!0;c.completed=!0;c.seek(d.offset);d=q(d);d.began=!0;d.completed=!0;d.duration>b&&(c.duration=d.duration);c.children.push(d)});c.seek(0);c.reset();c.autoplay&&c.restart();return c};return c};q.random=function(a,c){return Math.floor(Math.random()*(c-a+1))+a};return q});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(25)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  if ( typeof elem == 'string' ) {
    elem = document.querySelectorAll( elem );
  }

  this.elements = makeArray( elem );
  this.options = extend( {}, this.options );

  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( function() {
    this.check();
  }.bind( this ));
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  return this.img.complete && this.img.naturalWidth !== undefined;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ })

/******/ });