// ref: https://codepen.io/keithgorman/pen/ybEEYy

var $container = $(".js-tabs").parent();
var $tabsToggleGroup = $(".tabs__toggle-group");
var $tabs = $(".tabs__toggle");
var $activeTab = $(".tabs__toggle--active");
var $tabContents = $(".tabs__tab");

var $scrollLeft		= $(".js-action--scroll-left");
var $scrollRight	= $(".js-action--scroll-right");

var btnScrollLeft	= document.querySelector('.js-action--scroll-left');
var btnScrollRight	= document.querySelector('.js-action--scroll-right');
var tabsContainer	= document.querySelector('.tabs__toggle-group');
var tabs			= document.querySelectorAll('.tabs__toggle');
var selectedTabIndex	= 0;
var scrollIndex		= 0;
var scrollWidth		= tabs[0].clientWidth + 5;
var scrollLeft		= 0;

var tabsContainerWidth = tabsContainer.clientWidth;
var tabsScrollableWidth = tabsContainer.scrollWidth;

// console.log("Container Width:", tabsContainerWidth, "Tabs Width:", tabsScrollableWidth);

$tabContents
	.hide()
	.eq($tabs.index($activeTab))
	.show();

$tabs.on("click", function() {
	
	var $tabs = $(".tabs__toggle");
	var $activeTab = $(".tabs__toggle--active");
	var $tabContents = $(".tabs__tab");
	var $tab = $(this);
	var tabIndex = $tabs.index($tab);
	
	selectedTabIndex = tabIndex;
	console.log("Selected Tab:", selectedTabIndex);
	
	$tab.addClass("tabs__toggle--active");
	$activeTab.removeClass("tabs__toggle--active");
	
	$tabContents
		.hide()
		.eq(tabIndex)
		.show();
	
	
	var tab			= $tab[0];
	var tabWidth	= tab.clientWidth;
	var tabLeft		= tab.offsetLeft;
	
	var tabRight	= tabLeft + tabWidth;
	
	
	if (tabLeft < tabsContainer.scrollLeft) {
		smoothScroll(tabsContainer, {to: tabLeft, callback: checkScrollButtonState});
	}
	if (tabRight > (tabsContainer.scrollLeft + tabsContainerWidth)) {
		smoothScroll(tabsContainer, {to: (tabRight - tabsContainerWidth), callback: checkScrollButtonState});
	}
});

	if (tabsContainer.scrollLeft === 0) {
		btnScrollLeft.setAttribute("disabled", true);
	}
	
	btnScrollLeft.addEventListener('click', function() {
		
		scrollIndex--;
		
		scrollLeft -= tabs[scrollIndex].clientWidth + 7;
		smoothScroll(tabsContainer, {to: scrollLeft, callback: checkScrollButtonState});
	});
	
	btnScrollRight.addEventListener('click', function() {
		scrollLeft += tabs[scrollIndex].clientWidth + 7;
		scrollIndex++;
		
		smoothScroll(tabsContainer, {to: scrollLeft, callback: checkScrollButtonState});
		
	});
	
	function checkScrollButtonState() {
		
		
		if (tabsContainer.scrollLeft <= 0) {
			btnScrollLeft.setAttribute("disabled", true);
		} else {
			btnScrollLeft.removeAttribute("disabled");
		}
		
		if (tabsContainer.scrollLeft + tabsContainer.clientWidth >= tabsContainer.scrollWidth) {
			btnScrollRight.setAttribute("disabled", true);
		} else {
			btnScrollRight.removeAttribute("disabled");
		}
	}

function smoothScroll(element, options) {
	
	var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

	var defaults = {
		to			: 0,
		duration	: 250,
		axis		: "horizontal",
		easing		: "easeInOutQuad"
	};
	
	var settings = Object.assign({}, defaults, options);
	
	var direction = settings.axis === "horizontal" ? "scrollLeft" : "scrollTop";

	var start = element[direction],
		change = settings.to - start,
		animationStart = +new Date();
	var animating = true;
	var lastpos = null;

	var animateScroll = function() {
		if (!animating) {
			if (settings.callback) {
				settings.callback();
			}
			return;
		}
		
    requestAnimFrame(animateScroll);
		
    var now = +new Date();
		var val = Math.floor(Easing[settings.easing](now - animationStart, start, change, settings.duration));
		
    if (lastpos) {
			if (lastpos === element[direction]) {
				lastpos = val;
				element[direction] = val;
			} else {
				animating = false;
			}
		} else {
			lastpos = val;
			element[direction] = val;
		}
		if (now > animationStart + settings.duration) {
			element[direction] = settings.to;
			animating = false;
		}
	};
	
  requestAnimFrame(animateScroll);
};

Easing = {
	easeInOutQuad: function(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	},
};