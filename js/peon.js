var app,
	imagesToPreload = [
		'placeholder.jpg'
	];

var App = function () {
	this.init();
}

App.prototype.init = function () {
	this.loadVariables();
	this.preloadImages(imagesToPreload);
	this.setContentMinHeight(this.content, this.nav, this.footer);
	this.handleConsole();
	this.handlePhoneLinks(this.phoneLink);
	this.bindListeners();
	if(this.isIE()) {
		$("body").addClass('ie');
	}
}

App.prototype.bindListeners = function () {
	var _this = this;
	this.bindElSmoothScroll(this.smoothScroll);
	$(window).resize(function() {
		_this.windowHeight = _this.getWindowHeight();
		_this.windowWidth = _this.getWindowWidth();
		_this.setContentMinHeight(_this.content, _this.nav, _this.footer);	
	});
	window.addEventListener("resize", function() {
		_this.windowHeight = _this.getWindowHeight();
		_this.windowWidth = _this.getWindowWidth();
	}, false);
}

App.prototype.loadVariables = function () {
	this.content = document.getElementsByClassName('Content');
	this.nav = document.getElementsByClassName('Navbar');
	this.footer = document.getElementsByClassName('Footer--sticky');
	this.errorPage = $(".error-section");
	this.phoneLink = $(".Phone");
	this.disabledClass = 'Disabled';
	this.imgFolder = '/img/';
	this.smoothScroll = '[data-scroll]';
	this.environment = environment;
	this.environmentStates = ['develop', 'production'];
	this.url = this.getCurrentUrl();
	this.windowHeight = this.getWindowHeight();
	this.windowWidth = this.getWindowWidth();
	this.navigator = this.getUserNavigator();
	this.mobile = this.isMobile();
	this.scrollingElActive = false;
	this.internetExplorer = this.isIE();
}

/**
 * Gets user window width
 *
 * @param null
 * @returns number
 */
App.prototype.getWindowWidth = function () {
	return window.innerWidth;
}

/**
 * Gets user window height
 *
 * @param null
 * @returns number
 */
App.prototype.getWindowHeight = function () {
	return window.innerHeight;
}

/**
 * Gets user navigator of browser
 *
 * @param null
 * @returns boolean
 */
App.prototype.getUserNavigator = function () {
	return navigator.userAgent;
}

/**
 * Detects mobile devices
 *
 * @param null
 * @returns boolean
 */
App.prototype.isMobile = function () {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.getUserNavigator());
}

/**
 * Detects any kind of IE 5-11
 *
 * @param null
 * @returns boolean
 */
App.prototype.isIE = function () {
	var userAgent = this.getUserNavigator();
	if(userAgent.match('MSIE ') || userAgent.match('Trident/') || userAgent.match('Edge/') || userAgent.match('/rv 11/')) {
		return true;
	}
	return false;
}

/**
 * Gets current URL
 *
 * @param null
 * @returns string
 */
App.prototype.getCurrentUrl = function () {
	return window.location.href;
}

/**
 * Redirects to URL
 *
 * @param url
 *
 */
App.prototype.redirectPage = function (url) {
	window.location.href = url;
}

/**
 * Sets content height in case the height of content is not high enough to cover the whole page
 *
 * @param content
 * @param nav
 * @param footer
 *
 */
App.prototype.setContentMinHeight = function (content, nav, footer) {
	 var windowHeight = this.getWindowHeight();
	 var navHeight = nav[0].offsetHeight;
	 var footerHeight = footer[0].offsetHeight;
	 var contentHeight = content[0].offsetHeight;
	 if (windowHeight > contentHeight) {
		 var minHeight = windowHeight - navHeight - footerHeight;
		 content[0].style.minHeight =  minHeight+"px";
	 };
}

/**
 * Preloads images from given array of image names
 *
 * @param imagesArray
 *
 */
App.prototype.preloadImages = function (imagesArray) {
	for (var i = 0; i < imagesArray.length; ++i) {
		var img = new Image();
		img.src = this.imgFolder + imagesArray[i];
	}
}

/**
 * Initialize FastClick on mobile devices
 *
 * @param null
 * @returns function
 */
App.prototype.initFastClick = function () {
	if(this.isMobile()) {
		FastClick.attach(document.body);
	}
}

/**
 * Generates random number with defined range
 *
 * @param range
 * @returns {number}
 */
App.prototype.generateRandomNumber = function (range) {
	var random = Math.floor((Math.random() * range));
	return random;

}

/**
 * GET parameter from URL
 *
 * @param q
 * @param s
 * @returns string
 */
App.prototype.getUrlParameter = function (q, s) {
	s = (s) ? s : window.location.search;
	var re = new RegExp('&amp;' + q + '=([^&amp;]*)', 'i');
	return (s = s.replace(/^\?/, '&amp;').match(re)) ? s = s[1] : s = '';
}

/**
 * Binds smooth on click smooth scroll to target element
 *
 * HTML Example: <a href="#" data-scroll=".target" data-scroll-speed="1000">Sign up now</a>
 *
 * @param el
 * @param targetAttr
 * @param speedAttr
 * @returns function
 */
App.prototype.bindElSmoothScroll = function (el) {
	var that = this;
	var navbarHeight = (this.isMobile() ? 0 : $(this.nav).height());
	$(el).on('click', function(e) {
		var speed = $(this).data('scroll-speed');
		var target = $(this).data('scroll');
		$('html, body').animate({
			scrollTop: $(target).offset().top - navbarHeight
		}, speed);
		e.preventDefault();
	});
}

/**
 *
 * Scrolls to element smoothly
 * @param element
 * @returns function
 */
 App.prototype.scrollToElement = function (el, speed, offset) {
 	var _this = this;
 	this.scrollingElActive = true;
 	$('html, body').animate({
 		scrollTop: $(el).offset().top - _this.navbar.navHeight - offset
 	}, speed);
 	if(this.isMobile()) {
 		setTimeout(function() {
			_this.scrollingElActive = false;
 		}, speed*2);
 	}
 }

/**
 * Handles console default behaviour. If environment set to production, rewrite console object
 *
 * @param null
 * @returns
 */
App.prototype.handleConsole = function () {
	if(this.environment == this.environmentStates[1]) {
		console = {};
		console.log = function(){return};
		console.warn = function(){return};
		console.info = function(){return};
	}
}

/**
 * Detects and returns true/false whether view is scrolled into element
 *
 * @param elem
 * @param offset
 * @returns boolean
 */
App.prototype.isScrolledToElement = function (elem, offset) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();
	var elemTop = elem.offset().top + offset;
	var elemBottom = elemTop + 10;
	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

/**
 * Handles disabled phone links on mobile phones
 *
 * @param phoneElement
 * @returns string
 */
App.prototype.handlePhoneLinks = function (phoneElement) {
	if(this.isMobile()) {
		phoneElement.removeClass(this.disabledClass);
	}
}

/**
 * Get top height of elements with same class
 *
 * @param target
 * @returns integer
 */
App.prototype.getMaxHeightElement = function (target) {
	var maxHeight;
	var heights = target.map(function ()
	{
		return $(this).height();
	}).get(),

	maxHeight = Math.max.apply(null, heights);
	return maxHeight;
}

App.prototype.handleErrorPage = function () {
	if(!this.errorPage.length) {
		return;
	}
	$("body").addClass('error-page');
}


$(document).ready(function() {
	app = new App();
});
