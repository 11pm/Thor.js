var files = [
	'vendor/thor.js',
	'app/config.js',
	'app/controllers/controllers.js',
	'app/routes.js'
];

for(var i = 0; i < files.length; i++){
	var js = document.createElement('script');
	js.type = 'text/javascript';
	js.src = files[i];
	document.body.appendChild(js);
}