/*           
  _______ _    _  ____  _____        _  _____ 
 |__   __| |  | |/ __ \|  __ \      | |/ ____|
    | |  | |__| | |  | | |__) |     | | (___  
    | |  |  __  | |  | |  _  /  _   | |\___ \ 
    | |  | |  | | |__| | | \ \ | |__| |____) |
    |_|  |_|  |_|\____/|_|  \_(_)____/|_____/ 
       
*/
//Handles all functionality
var Thor = {

	log: function(){
		for(var i = 0; i < arguments.length; i++){
			console.log(arguments[i]);
		}
	},
	config: {
		'view_folder': 'views'
	},
	dom = {}

};

var Controllers = {};

var URL = {
	base_url: function(){
		return window.location.host +  window.location.pathname;
	},

	to: function(url){
		return this.parseUrl(url);
	},

	current: function(){
		return this.getRoute(document.URL);
	},

	getRoute: function(url){
		parts = url.split('#');
		//return url after #
		return parts[parts.length-1];
	},

	getRouteMethod: function(action){
		return action.split('@');
	},

};


//Handles all routing
var Route = {

	base_url: location.href,

	get: function(){
			
		var route = URL.getRoute(this.base_url);

		var args = arguments;

		var url = args[0];
		var action = args[1];

		//if url passed matches page url
		if(route === url){
			//if closure call the function
			if(typeof action === 'function'){
				action();
			}
			//else call a method in controller
			else{
				var methods 	= URL.getRouteMethod(action);
				var controller 	= methods[0];
				var method 		= methods[1];
				
				//call user defined controller
				Controllers[controller][method]();
				
				
			}
		}
		
	}

};

var View = {

	filePath: function(name){
		var url = URL.base_url();
		var folder = Thor.config.view_folder;
		return url + folder + '/' + name + '.html';
	},

	make: function(name){
		var file = this.filePath(name);
		document.getElementById("view").innerHTML='<object type="text/html" data="' + file + '" ></object>';
	}
};