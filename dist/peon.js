var app,imagesToPreload=["placeholder.jpg"],App=function(){this.init()};App.prototype.init=function(){this.loadVariables(),this.preloadImages(imagesToPreload),this.setContentMinHeight(this.content,this.nav,this.footer),this.handleConsole(),this.handlePhoneLinks(this.phoneLink),this.bindListeners(),this.isIE()&&$("body").addClass("ie")},App.prototype.bindListeners=function(){var t=this;this.bindElSmoothScroll(this.smoothScroll),$(window).resize(function(){t.windowHeight=t.getWindowHeight(),t.windowWidth=t.getWindowWidth(),t.setContentMinHeight(t.content,t.nav,t.footer)}),window.addEventListener("resize",function(){t.windowHeight=t.getWindowHeight(),t.windowWidth=t.getWindowWidth()},!1)},App.prototype.loadVariables=function(){this.content=document.getElementsByClassName("Content"),this.nav=document.getElementsByClassName("Navbar"),this.footer=document.getElementsByClassName("Footer--sticky"),this.errorPage=$(".error-section"),this.phoneLink=$(".Phone"),this.disabledClass="Disabled",this.imgFolder="/img/",this.smoothScroll="[data-scroll]",this.environment=environment,this.environmentStates=["develop","production"],this.url=this.getCurrentUrl(),this.windowHeight=this.getWindowHeight(),this.windowWidth=this.getWindowWidth(),this.navigator=this.getUserNavigator(),this.mobile=this.isMobile(),this.scrollingElActive=!1,this.internetExplorer=this.isIE()},App.prototype.getWindowWidth=function(){return window.innerWidth},App.prototype.getWindowHeight=function(){return window.innerHeight},App.prototype.getUserNavigator=function(){return navigator.userAgent},App.prototype.isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.getUserNavigator())},App.prototype.isIE=function(){var t=this.getUserNavigator();return!!(t.match("MSIE ")||t.match("Trident/")||t.match("Edge/")||t.match("/rv 11/"))},App.prototype.getCurrentUrl=function(){return window.location.href},App.prototype.redirectPage=function(t){window.location.href=t},App.prototype.setContentMinHeight=function(t,e,o){var i=this.getWindowHeight(),n=e[0].offsetHeight,r=o[0].offsetHeight,s=t[0].offsetHeight;if(i>s){var a=i-n-r;t[0].style.minHeight=a+"px"}},App.prototype.preloadImages=function(t){for(var e=0;e<t.length;++e){var o=new Image;o.src=this.imgFolder+t[e]}},App.prototype.initFastClick=function(){this.isMobile()&&FastClick.attach(document.body)},App.prototype.generateRandomNumber=function(t){var e=Math.floor(Math.random()*t);return e},App.prototype.getUrlParameter=function(t,e){e=e?e:window.location.search;var o=new RegExp("&amp;"+t+"=([^&amp;]*)","i");return e=(e=e.replace(/^\?/,"&amp;").match(o))?e[1]:""},App.prototype.bindElSmoothScroll=function(t){var e=this.isMobile()?0:$(this.nav).height();$(t).on("click",function(t){var o=$(this).data("scroll-speed"),i=$(this).data("scroll");$("html, body").animate({scrollTop:$(i).offset().top-e},o),t.preventDefault()})},App.prototype.scrollToElement=function(t,e,o){var i=this;this.scrollingElActive=!0,$("html, body").animate({scrollTop:$(t).offset().top-i.navbar.navHeight-o},e),this.isMobile()&&setTimeout(function(){i.scrollingElActive=!1},2*e)},App.prototype.handleConsole=function(){this.environment==this.environmentStates[1]&&(console={},console.log=function(){},console.warn=function(){},console.info=function(){})},App.prototype.isScrolledToElement=function(t,e){var o=$(window).scrollTop(),i=o+$(window).height(),n=t.offset().top+e,r=n+10;return i>=r&&n>=o},App.prototype.handlePhoneLinks=function(t){this.isMobile()&&t.removeClass(this.disabledClass)},App.prototype.getMaxHeightElement=function(t){var e,o=t.map(function(){return $(this).height()}).get(),e=Math.max.apply(null,o);return e},App.prototype.handleErrorPage=function(){this.errorPage.length&&$("body").addClass("error-page")},$(document).ready(function(){app=new App});