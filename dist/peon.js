var peon,imagesToPreload=["placeholder.jpg"],Peon=function(){this.init()};Peon.prototype.init=function(){this.loadVariables(),this.preloadImages(imagesToPreload),this.handleConsole(),this.handlePhoneLinks(this.phoneLink),this.bindListeners(),this.isIE()&&(this.bodyElement.className+=this.internetExplorerClass)},Peon.prototype.bindListeners=function(){var t=this;this.bindElSmoothScroll(this.smoothScroll),window.addEventListener("resize",function(){t.windowHeight=t.getWindowHeight(),t.windowWidth=t.getWindowWidth()},!1)},Peon.prototype.loadVariables=function(){this.content=document.getElementsByClassName("Content"),this.nav=document.getElementsByClassName("Navbar"),this.footer=document.getElementsByClassName("Footer--sticky"),this.phoneLink=document.getElementsByClassName(".Phone"),this.bodyElement=document.getElementsByTagName("body")[0],this.disabledClass="Disabled",this.imgFolder="/img/",this.smoothScroll="[data-scroll]",this.environment="develop",this.environmentStates=["develop","production"],this.url=this.getCurrentUrl(),this.windowHeight=this.getWindowHeight(),this.windowWidth=this.getWindowWidth(),this.navigator=this.getUserNavigator(),this.mobile=this.isMobile(),this.scrollingElActive=!1,this.internetExplorer=this.isIE(),this.internetExplorerClass="IE"},Peon.prototype.getWindowWidth=function(){return window.innerWidth},Peon.prototype.getWindowHeight=function(){return window.innerHeight},Peon.prototype.getUserNavigator=function(){return navigator.userAgent},Peon.prototype.isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.getUserNavigator())},Peon.prototype.isIE=function(){var t=this.getUserNavigator();return!!(t.match("MSIE ")||t.match("Trident/")||t.match("Edge/")||t.match("/rv 11/"))},Peon.prototype.getCurrentUrl=function(){return window.location.href},Peon.prototype.redirectPage=function(t){window.location.href=t},Peon.prototype.setContentMinHeight=function(t,e,o){var n=this.getWindowHeight(),i=e[0].offsetHeight,r=o[0].offsetHeight,s=t[0].offsetHeight;if(n>s){var a=n-i-r;t[0].style.minHeight=a+"px"}},Peon.prototype.preloadImages=function(t){for(var e=0;e<t.length;++e){var o=new Image;o.src=this.imgFolder+t[e]}},Peon.prototype.generateRandomNumber=function(t){var e=Math.floor(Math.random()*t);return e},Peon.prototype.getUrlParameter=function(t,e){e=e?e:window.location.search;var o=new RegExp("&amp;"+t+"=([^&amp;]*)","i");return e=(e=e.replace(/^\?/,"&amp;").match(o))?e[1]:""},Peon.prototype.bindElSmoothScroll=function(t){},Peon.prototype.scrollToElement=function(t,e,o){this.scrollingElActive=!0},Peon.prototype.handleConsole=function(){this.environment==this.environmentStates[1]&&(console={},console.log=function(){},console.warn=function(){},console.info=function(){})},Peon.prototype.isScrolledToElement=function(t,e){},Peon.prototype.handlePhoneLinks=function(t){this.isMobile()&&t.classList.remove(this.disabledClass)},Peon.prototype.getMaxHeightElement=function(t){var e,o=t.map(function(){return this.outerHeight(!0)}).get(),e=Math.max.apply(null,o);return e},Peon.prototype.getCookie=function(t){for(var e=t+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var i=o[n];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""},Peon.prototype.setCookie=function(t,e,o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3);var i="expires="+n.toUTCString();document.cookie=t+"="+e+"; "+i},Peon.prototype.checkCookie=function(t){var e=this.getCookie(t);return""!=e};