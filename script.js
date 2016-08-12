var page = require('webpage').create();

// Configuration de la page
page.paperSize = {
  format: 'A4',
  orientation: 'landscape',
  margin: '0cm'
}

page.viewportSize = {
  width: 1280,
  height: 800
};

// Paramètres : A MODIFIER
var url_cours = "";
var start_slide = 1;
var timeout_start = 30 * 1000; // 20s

console.log("===================");

function nextSlide(i) {
	if(isLastSlide()) {
		phantom.exit();
		console.log("======= FIN ========");
		return;
	}
		
	setTimeout(function() { 
		console.log("Rendering slide " + i );
        var number = i;
        if(i < 10)
            number = "0" + i;
		page.render("slide-"+number+".png");
		nextSlide(i + 1);
		
		page.sendEvent('keypress', page.event.key.D);
	}, 1000);
}

function isLastSlide() {
	return page.evaluate(function() {
		return presentation.currentSlide.slideNumber == presentation.slides.length - 1;
	});
};

page.open(url_cours, function(status) {
  console.log("Status: " + status);
  
  if(status !== "success") {
	console.log("Erreur lors de la recuperation de la page");
  }
  else {
	// Remove transitions between slides changes
	page.evaluate(function() {
			var disableAnimationStyles = '-webkit-transition: none !important;' +
										 '-moz-transition: none !important;' +
										 '-ms-transition: none !important;' +
										 '-o-transition: none !important;' +
										 'transition: none !important;';
			var animationStyles = document.createElement('style');
				animationStyles.type = 'text/css';
				animationStyles.innerHTML = '* {' + disableAnimationStyles + '}';
			document.head.appendChild(animationStyles);
		}
	);
  
	setTimeout(function () {
		// Il y a parfois un bug d'affichage pour la première diapo, on refresh
		page.evaluate(function() { presentation.onResize(); });
		nextSlide(start_slide);
		
	}, timeout_start);
  }
});
