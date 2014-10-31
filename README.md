![Thor.JS](http://i.imgur.com/yKzGBms.png "Thor JS")

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

```javascript
Thor.Controllers = {
	
	TestController: {

		home: function(){
			Thor.log('Welcome to Thor');
		}

	},

};
```
#Views

```javascript
View.make('home')
```

```javascript
View.make('home', {
	message: "Hello"
})
```