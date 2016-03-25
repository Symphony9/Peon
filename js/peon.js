/**
 * Definition of Peon object
 * @param content
 * @param navbar
 * @param footer
 * @param phone
 * @param environment
 * @param imgFolder
 * @constructor
 */
var Peon = function (content, navbar, footer, phone, environment, imgFolder) {
	this.settings = {
		'content': content,
		'navbar': navbar,
		'footer': footer,
		'phone': phone,
		'environment': environment,
		'imgFolder': imgFolder
	};
	this.init();
};

/**
 * Init function
 */
Peon.prototype.init = function () {
	this.loadVariables(this.settings.content, this.settings.navbar, this.settings.footer, this.settings.phone, this.settings.imgFolder);
	this.setConstants();
	this.handleConsole();
	this.handlePhoneLinks(this.phoneLink);
	this.setContentMinHeight(this.content, this.nav, this.footer);
	this.bindListeners();
	if(this.isIE()) {
		this.bodyElement.className += this.internetExplorerClass;
	}
};

/**
 * Bind events
 */
Peon.prototype.bindListeners = function () {
	var _this = this;
	this.bindElSmoothScroll(this.smoothScroll);
	window.addEventListener("resize", function() {
		_this.windowHeight = _this.getWindowHeight();
		_this.windowWidth = _this.getWindowWidth();
		_this.setContentMinHeight(_this.content, _this.nav, _this.footer);
	}, false);
};

/**
 * Load variables to be used across application
 * @param content
 * @param navbar
 * @param footer
 * @param phone
 * @param imgFolder
 */
Peon.prototype.loadVariables = function (content, navbar, footer, phone, imgFolder) {
	this.content = document.querySelector(content);
	this.nav = document.querySelector(navbar);
	this.footer = document.querySelector(footer);
	this.phoneLink = document.querySelector(phone);
	this.bodyElement = document.body;
	this.htmlElement = document.getElementsByTagName("html")[0];
	this.imgFolder = imgFolder;
	this.environment = this.settings.environment;
	this.url = this.getCurrentUrl();
	this.windowHeight = this.getWindowHeight();
	this.windowWidth = this.getWindowWidth();
	this.navigator = this.getUserNavigator();
	this.mobile = this.isMobile();
	this.scrollingElActive = false;
};

/**
 * Set constants for Peon Object
 */
Peon.prototype.setConstants = function() {
	this.createConstant('internetExplorer',this.isIE());
	this.createConstant('smoothScroll', '[data-scroll]');
	this.createConstant('disabledClass', 'Disabled');
	this.createConstant('internetExplorerClass', 'IE');
	this.createConstant('environmentStates', ['develop', 'production']);
};

/**
 * Gets user window width
 * @returns {Number}
 */
Peon.prototype.getWindowWidth = function () {
	return window.innerWidth;
};

/**
 * Gets user window height
 * @returns {Number}
 */
Peon.prototype.getWindowHeight = function () {
	return window.innerHeight;
};

/**
 * Gets user navigator of browser
 * @returns boolean
 */
Peon.prototype.getUserNavigator = function () {
	return navigator.userAgent;
};

/**
 * Detects mobile devices
 * @returns boolean
 */
Peon.prototype.isMobile = function () {
	var _this = this;
	this.isIOS = function() {
		return /iP(ad|hone|od)/.test(navigator.userAgent);
	};
	this.isAndroid = function() {
		return /Android/i.test(_this.navigator);
	};
	this.isBlackBerry = function () {
		return /BlackBerry/i.test(_this.navigator);

	};
	this.isOperaMini = function () {
		return /Opera Mini/i.test(_this.navigator);
	};
	this.isWindows = function () {
		return /IEMobile/i.test(_this.navigator);
	};
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(_this.navigator);
};

/**
 * Detects any kind of IE 5-11
 * @returns {boolean}
 */
Peon.prototype.isIE = function () {
	var userAgent = this.getUserNavigator();
	if(userAgent.match('MSIE ') || userAgent.match('Trident/') || userAgent.match('Edge/') || userAgent.match('/rv 11/')) {
		return true;
	}
	return false;
};

/**
 * Gets current URL
 * @returns string
 */
Peon.prototype.getCurrentUrl = function () {
	return window.location.href;
};

/**
 * Redirects to URL
 * @param url
 */
Peon.prototype.redirectPage = function (url) {
	window.location.href = url;
};

/**
 * Sets content height in case the height of content is not high enough to cover the whole page
 * @param content
 * @param nav
 * @param footer
 */
Peon.prototype.setContentMinHeight = function (content, nav, footer) {
	if(content.length > 0 || nav.length > 0 || footer.length > 0) {
		return;
	}
	 var windowHeight = this.getWindowHeight();
	 var navHeight = nav.offsetHeight;
	 var footerHeight = footer.offsetHeight;
	 var contentHeight = content.offsetHeight;
	 if (windowHeight > contentHeight) {
		 var minHeight = windowHeight - navHeight - footerHeight;
		 content.style.minHeight =  minHeight+"px";
	 };
};

/**
 * Preloads images from given array of image names
 * @param imagesArray
 */
Peon.prototype.preloadImages = function (imagesArray) {
	for (var i = 0; i < imagesArray.length; ++i) {
		var img = new Image();
		img.src = this.imgFolder + imagesArray[i];
	}
};

/**
 * Generates random number with defined range
 * @param range
 * @returns {number}
 */
Peon.prototype.generateRandomNumber = function (range) {
	var random = Math.floor((Math.random() * range));
	return random;

};

/**
 * GET parameter from URL
 * @param q
 * @param s
 * @returns {string}
 */
Peon.prototype.getUrlParameter = function (q, s) {
	s = (s) ? s : window.location.search;
	var re = new RegExp('&amp;' + q + '=([^&amp;]*)', 'i');
	return (s = s.replace(/^\?/, '&amp;').match(re)) ? s = s[1] : s = '';
};

/**
 * Binds smooth on click smooth scroll to target element
 *
 * HTML Example: <a href="#" data-scroll=".target" data-scroll-speed="1000">Sign up now</a>
 *
 * @param element
 */
Peon.prototype.bindElSmoothScroll = function (element) {
	var _this = this;
	var navbarHeight = (this.isMobile() ? 0 : this.nav.offsetHeight);
	var el = document.querySelectorAll(element);
	if(el) {
		for (var i = 0; i < el.length; i++) {
			var foo = el[i];
			el[i].addEventListener("click", function(e) {
				var speed = this.dataset.scrollSpeed;
				var target = this.dataset.scroll;
				target = document.querySelector(target);
				if(target) {
					_this.scrollToElement(document.body, target.offsetTop, speed);
				}
				e.preventDefault();
			},false);
			foo = '';
		}
	}
};

/**
 * Scrolls to element smoothly
 * @param element
 * @param to
 * @param duration
 */
 Peon.prototype.scrollToElement = function (element, to, duration) {
	var _this = this;
	this.scrollingElActive = true;
	if (duration < 0) {
		return
	};
	var difference = to - element.scrollTop;
	var perTick = difference / duration * 2;

	setTimeout(function() {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		_this.scrollToElement(element, to, duration - 2);
	}, 2);
 };

/**
 * Handles console default behaviour. If environment set to production, rewrite console object
 */
Peon.prototype.handleConsole = function () {
	if(this.environment == this.environmentStates[1]) {
		console = {};
		console.log = function(){};
		console.warn = function(){};
		console.info = function(){};
	}
};

/**
 * Detects and returns true/false whether view is scrolled into element
 * @param elem
 * @param offset
 * @returns boolean
 */
Peon.prototype.isScrolledToElement = function (elem, offset) {
	var docViewTop = this.bodyElement.scrollTop;
	var docViewBottom = docViewTop + this.getWindowHeight();
	var elemTop = elem.offsetTop + offset;
	var elemBottom = elemTop + 10;
	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};

/**
 * Handles disabled phone links on mobile phones
 * @param phoneElement
 */
Peon.prototype.handlePhoneLinks = function (phoneElement) {
	if(phoneElement) {
		if(this.isMobile()) {
			phoneElement.classList.remove(this.disabledClass);
		} else {
			phoneElement.addEventListener('click', function(e) {
				e.preventDefault();
			}, false);
		}
	}
};

/**
 * Get top height of elements with same class
 * @param target
 * @returns {number}
 */
Peon.prototype.getMaxHeightElement = function (target) {
	var maxHeight;
	var heights = target.map(function ()
	{
		return this.outerHeight(true);
	}).get(),

	maxHeight = Math.max.apply(null, heights);
	return maxHeight;
};

/**
 * Get cookie value by name
 * @param cookieName
 * @returns {*}
 */
 Peon.prototype.getCookie = function(cookieName) {
	var name = cookieName + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
};

/**
 * Set cookie pair name = value with duration in seconds
 * @param cookieName
 * @param cookieValue
 * @param cookieDuration
 */
 Peon.prototype.setCookie = function(cookieName, cookieValue, cookieDuration) {
	var d = new Date();
	d.setTime(d.getTime() + (cookieDuration*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + "; " + expires;
};

/**
 * Check if cookie exists
 * @param cookieName
 * @returns {boolean}
 */
 Peon.prototype.checkCookie = function(cookieName) {
	var cookie = this.getCookie(cookieName);
	if(cookie != "") {
		return true;
	} else {
		return false;
	}
};

/**
 * Type Of return with object type
 * @param value
 * @returns {string}
 * @constructor
 */
Peon.prototype.TypeOf = function (value) {
	return Object.prototype.toString.call(value).slice(8).replace(']', '');
};

/**
 * Constants creator helper for peon object
 * @param key
 * @param value
 */
Peon.prototype.createConstant = function (key, value) {
	Object.defineProperty(this, key, {
		configurable: false,
		enumerable: true,
		writable: false,
		value: value
	});
};
