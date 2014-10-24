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

	/*
	Logs all arguments

	@param anything As many items as wanted 
	*/
	log: function(){
		for(var i = 0; i < arguments.length; i++){
			console.log(arguments[i]);
		}
	},

	/*
	Capilasizes string

	@param text string String to capitalize
	@return capitalized string
	*/
	capitalize: function(text){
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

};

var URL = {

	/*
	Thor friendly URLS

	@return base url (host/#)
	*/
	base_url: function(){
		return window.location.host + 
		window.location.pathname +
		'#';
	},

	current: function(){
		return this.getRoute(document.URL);
	},

	/*
	Get route from url

	@param string url Current url on page
	@return string current route
	*/
	getRoute: function(url){
		parts = url.split('#');
		//return url after #
		return parts[parts.length-1];
	},
	/*
	Split route actions

	@param string action Controller@Method
	@return array actions Controller, Method
	*/
	getRouteMethod: function(action){
		return action.split('@');
	}

};


//Handles all routing
var Route = {

	url: location.href,
	
	/*
	Handles route call

	@param string url Url to math
	@param function|string action Action to call on load
	*/
	get: function(){
		console.log(this.base_url)
		var route = URL.getRoute(this.url);
		console.log(route)
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
				Thor.Controllers[controller][method]();	
			}
			Redirect.To(route);
			
		}
		
	}

};

var Xhr = {
	
	xhrObj: new XMLHttpRequest(),

	/*
	Opens an ajax request

	@param string method Method of request
	@param string url Url to request

	@returns xhr response
	*/
	open: function(method, url){
		
		this.xhrObj.open(method, url, false);
		this.xhrObj.send();
		return this.xhrObj;
	}

};

/*
View.

@author Alexander Hilmar(11pm)
*/
var View = {

	/*
	Sets new title on a page

	@param string title The title
	*/
	setTitle: function(title){
		document.title = title;
	},

	/*
	Shows view

	@param string page view to load
	*/
	setDom: function(view){
		Thor.config.view.innerHTML = view;
	},
	
	/*
	Create path to view in views folder

	@param string file File name(without .html)

	@return string file in view folder
	*/
	filePath: function(file){
		var folder = Thor.config.view_folder;
		return folder + '/' + file + '.html';
	},

	/*
	Create the view itself

	@param string  Name of view 
	@param object(optional) Template
	*/
	make: function(){
		var args = arguments;
		var file = args[0];

		file = this.filePath(file);
		var view = Xhr.open("GET", file);
		var response = view.responseText;

		this.setTitle(Thor.capitalize(args[0]));

		if (args.length == 1) {
			this.setDom(response);
		}
		
		else if(args.length == 2){
			var context = args[1];
			var template = Handlebars.compile(response);
			this.setDom(template(context));
		}

	}
};
var Redirect = {
	baseUrl: URL.base_url(),

	To: function(route){
		console.log(this.baseUrl + route);
		window.location.assign = this.baseUrl + route; 
	}
};