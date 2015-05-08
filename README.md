# a

Annotator for ES5. Lets you write ES5 with TypeScript-like annotations.

## Disclaimer
This library is super experimental. Like winter, changes are coming.


## Use

This JS code:

```js
a.RouteConfig([
  { path: '/' }
]).
View({
  template: '...'
}).
for(MyController)
function MyController () {}
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
