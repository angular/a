# a

Annotator for ES5. Lets you write ES5 with TypeScript-like annotations.

## Use

This JS code:

```js
var MyController =
a.RouteConfig([
  { path: '/' }
]).
View({
  template: '...'
}).
for(function() {})
```

Is the same as this TypeScript code:

```ts
@RouteConfig([
  { path: '/' }
])
@View({
  template: '...'
})
class MyController {}
```

## License
Apache 2.0
