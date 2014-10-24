Thor.Controllers = {
	
	TestController: {

		home: function(){
			View.make('home', {
				content: 'Hello world - Handlebars',
				test: ['Alexander', 'RODLAH']
			});
		},
		about: function(){
			View.make('about');
		}
	},


};