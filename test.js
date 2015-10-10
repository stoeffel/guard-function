"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var guard = _interopRequire(require("./"));

var sinon = _interopRequire(require("sinon"));

var expect = _interopRequire(require("expect.js"));




describe("guard", function () {
  var spy, stub, T, F, eq;

  beforeEach(function () {
    T = function () {
      return true;
    };
    F = function () {
      return false;
    };
    eq = function (x) {
      return function (y) {
        return x === y;
      };
    };
  });

  it("should call the spy", function () {
    spy = sinon.spy();
    guard(T, spy)();
    expect(spy.called).to.be.ok();

    spy = sinon.spy();
    guard(eq(1), spy)(1);
    expect(spy.called).to.be.ok();
    expect(spy.calledWith(1)).to.be.ok();
  });

  it("should not call the spy", function () {
    spy = sinon.spy();
    guard(F, spy)();
    expect(spy.called).to.not.be.ok();

    spy = sinon.spy();
    guard(eq(0), spy)(1);
    expect(spy.called).to.not.be.ok();
  });

  it("should return the stubs return", function () {
    stub = sinon.stub().returns(42);
    expect(guard(T, stub)()).to.be.eql(42);
    expect(stub.called).to.be.ok();

    stub = sinon.stub().returns(42);
    expect(guard(eq(1), stub)(1)).to.be.eql(42);
    expect(stub.called).to.be.ok();
    expect(stub.calledWith(1)).to.be.ok();
  });

  it("should return undefined or the value provided", function () {
    spy = sinon.spy();
    expect(guard(F, spy)()).to.be(undefined);
    expect(spy.called).to.not.be.ok();

    spy = sinon.spy();
    expect(guard(F, spy, 42)()).to.be(42);
    expect(spy.called).to.not.be.ok();

    spy = sinon.spy();
    expect(guard(F, spy, null)()).to.be(null);
    expect(spy.called).to.not.be.ok();
  });

  it("should throw an Error if Error passed as nothing", function () {
    spy = sinon.spy();
    var err = new Error("ERROR");
    try {
      guard(F, spy, err);
    } catch (e) {
      expect(spy.called).to.not.be.ok();
      expect(e).to.be(err);
    }
  });
});