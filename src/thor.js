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
	}

};

var Controllers = {};

var URL = {
	parseUrl: function(url){
		pathArray = window.location.href.split( '/' );
		protocol = pathArray[0];
		host = pathArray[2];
		return protocol + '//' + host;

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
