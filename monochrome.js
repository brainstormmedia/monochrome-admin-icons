jQuery(document).ready(function($){
	$('#adminmenu > li:not(.wp-has-current-submenu)').hover(
		function(){
			$(this).find('img.mono').eq(0).css('opacity', 1);
		},
		function(){
			$(this).find('img.mono').eq(0).css('opacity', 0);
		}
	);
	
	$('#adminmenu img').hide(); // Avoid image flicker
});

// Attach to load event of individual images in the Admin Menu
// This selector doesn't effect default WordPress icons, because they're background sprites, not img tags
jQuery('#adminmenu > li:not(.wp-has-current-submenu) img').bind('load', storm_monochrome_imgs);

function storm_monochrome_imgs(){
	// Technique from http://webdesignerwall.com/tutorials/html5-grayscale-image-hover
	var $ = jQuery;
	var img = $(this);
	console.log( img.height() );

	if ( img.parent().hasClass('mono-wrap') ) { return; } // Prevent recursion
	if ( img.height() > 20 ) { return; } // Single icons are 16px tall. This is probably a sprite already.

	console.log( $(this).parent().attr('aria-label')+': '+img.attr('src'));

	img.css({'position':'absolute'})
		.wrap('<div class="mono-wrap" style="display: inline-block">')
		.clone()
		.addClass('mono')
		.css({'position':'absolute','z-index':'998','opacity':'0','display':'block'})
		.insertBefore(img)
		.queue(function(){
			var img = $(this);
			img.parent().css({'width':this.width,'height':this.height});
			img.dequeue();
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
}

// All images on the page have loaded.
// It's safe to show Admin menu images
jQuery(window).load(function($){
	jQuery('#adminmenu img').show(); // Avoid image flicker
});