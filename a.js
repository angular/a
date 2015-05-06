module.exports = function createAnnotator() {
  var registry = {};
  var a = {};

  var A = function () {
    this._annotations = [];
  };
  A.prototype.for = function (SomeClass) {
    var annotations = this._annotations;
    if (SomeClass.annotations) {
      SomeClass.annotations = SomeClass.annotations.concat()
    }
    SomeClass.annotations = this._annotations;
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
  return {
    annotator: a,
    register: register
  };
};
