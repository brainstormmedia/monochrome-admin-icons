jQuery(document).ready(function($){
	$('#adminmenu > li:not(.wp-has-current-submenu)').hover(
		function(){
			var img = $(this).find('img');
			img.attr('src', img.data('color-src'));
		},
		function(){
			var img = $(this).find('img');
			img.attr('src', img.data('mono-src'));
		}
	);
	
	// Attach to load event of individual images in the Admin Menu
	// This selector doesn't effect default WordPress icons, because they're background sprites, not img tags
	jQuery('#adminmenu > li:not(.wp-has-current-submenu) img').hide().each(storm_monochrome_imgs);
});



function storm_monochrome_imgs(){
	// Technique from http://webdesignerwall.com/tutorials/html5-grayscale-image-hover
	var $ = jQuery;
	var img = $(this);
	var color_src = img.attr('src');
	var imgObj = new Image();

	$( imgObj ).bind('load', function(){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');

		if ( imgObj.height > 20 ) {
			// Single icons are 16px tall. This is probably a sprite.
			img.show();
			return; 
		}

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
		
		var mono_src = canvas.toDataURL();

		img.attr('src', mono_src)
			.data('mono-src', mono_src)
			.data('color-src', color_src)
			.show();
	});

	imgObj.src = color_src;

}