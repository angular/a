module.exports = function createAnnotator() {
  var registry = {};
  var a = {};

  var A = function () {
    this._annotations = [];
    this._factories = [];
  };
  A.prototype.for = function (SomeClass) {
    var annotations = this._annotations;
    if (SomeClass.annotations) {
      SomeClass.annotations = SomeClass.annotations.concat()
    }
    SomeClass.annotations = this._annotations;
    this._factories.forEach(function (fn, params) {
      fn(SomeClass, params);
    });
    return SomeClass;
  }

  var register = function (name, impl) {
    registry[name] = impl;
    A.prototype[name] = function (param) {
      var Annotation = registry[name];
      if (typeof param === 'function') {
        this._annotations.push(new Annotation());
        return this.for(param);
      }
      var Annotation = registry[name];
      this._annotations.push(new Annotation(param));

      // chaining
      return this;
    };
    a[name] = function (param) {
      var instance = new A();
      return instance[name](param);
    }
  };

  var registerFactory = function (name, impl) {
    registry[name] = impl;
    A.prototype[name] = function () {
      var args = arguments;
      var fn = registry[name];
      this._factories.push(function (SomeClass) {
        fn(SomeClass, args);
      });

      // chaining
      return this;
    };
    a[name] = function (param) {
      var instance = new A();
      return instance[name](param);
    }
  }

  return {
    annotator: a,
    register: register,
    registerFactory: registerFactory
  };
};
