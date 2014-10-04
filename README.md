![Thor.JS][http://i.imgur.com/yKzGBms.png "Thor S"]
JS MVC  Framework based on Laravel
=======
#Routing

```javascript
Route.get('/', function(){
    console.log('Hello, World');
});
```
```javascript
Route.get('/', 'Controller@method');
```
#Controllers
Controllers = {
	
	TestController: {

		home: function(){
			console.log('I AM AT HOME');
		},
		test: function(){
			console.log('I AM BOBO');
		}
	},


};
