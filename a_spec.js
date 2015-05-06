var createInstance = require('./a');

describe('a', function () {
  var register,
      a;

  beforeEach(function () {
    var obj = createInstance();
    register = obj.register;
    a = obj.annotator;
  });

  it('should add methods on register', function () {
    register('RouteConfig', RouteConfig);
    expect(a.RouteConfig).toBeDefined();
  });

  it('should annotate classes', function () {
    register('RouteConfig', RouteConfig);

    var MyCtrl = a.RouteConfig([
      { path: '/', component: 'Foo'}
    ]).for(function() {});

    expect(MyCtrl.annotations).toBeDefined();
    expect(MyCtrl.annotations.length).toBe(1);
    expect(MyCtrl.annotations[0] instanceof RouteConfig).toBe(true);
  });

  it('should allow chaining', function () {
    register('RouteConfig', RouteConfig);
    register('View', View);

    var MyCtrl = a.RouteConfig([
      { path: '/', component: 'Foo'}
    ]).
    View({
      template: 'my.html'
    }).
    for(function() {});

    expect(MyCtrl.annotations.length).toBe(2);
    expect(MyCtrl.annotations[0] instanceof RouteConfig).toBe(true);
    expect(MyCtrl.annotations[1] instanceof View).toBe(true);
  });

  it('should annotate methods', function () {
    register('CanActivate', CanActivate);
    function MyCtrl () {};
    a.CanActivate(
    MyCtrl.prototype.myHook = function () {
      // ...
    });

    expect(MyCtrl.prototype.myHook.annotations).toBeDefined();
    expect(MyCtrl.prototype.myHook.annotations.length).toBe(1);
    expect(MyCtrl.prototype.myHook.annotations[0] instanceof CanActivate).toBe(true);
  });

  it('should return the target of the annotation', function () {
    register('CanActivate', CanActivate);
    function MyCtrl () {};
    var methodImpl = function () {};
    expect(a.CanActivate(MyCtrl.prototype.myHook = methodImpl)).toBe(methodImpl);
  });

  //TODO: throw when there's more than one

  function RouteConfig(config) {
    this.config = config;
  }
  function View(config) {
    this.config = config;
  }
  function CanActivate() {}
});
