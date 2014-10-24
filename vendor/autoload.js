var files = [
	'vendor/handlebars.js',
	'vendor/thor.js',
	'app/config.js',
	'app/controllers.js',
	'app/routes.js'
];
window.onload = function(){
	for(var i = 0; i < files.length; i++){
		var js = document.createElement('script');
		js.type = 'text/javascript';
		js.src = files[i];
		document.body.appendChild(js);
	}	
};