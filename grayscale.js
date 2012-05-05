jQuery(document).ready(function($){
	var $ = jQuery;

	$('#adminmenu > li:not(.wp-has-current-submenu)').hover(
		function(){
			$(this).find('img').eq(0).css('opacity', 1);
		},
		function(){
			$(this).find('img').eq(0).css('opacity', 0);
		}
	);
	
	$('#adminmenu img').hide(); // Avoid image flicker

});

// Attach to load event of individual images in the Admin Menu
// Technique from http://webdesignerwall.com/tutorials/html5-grayscale-image-hover
jQuery('#adminmenu > li:not(.wp-has-current-submenu) img').load(function($){
	var $ = jQuery;

	var el = $(this);
		el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.parent().css({"width":this.width,"height":this.height});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	
	// Grayscale w canvas method
	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	 }
});

// All images on the page have loaded.
// It's safe to show Admin menu images
jQuery(window).load(function($){
	jQuery('#adminmenu img').show(); // Avoid image flicker
});