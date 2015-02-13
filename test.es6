import guard from './';

import sinon from 'sinon';
import expect from 'expect.js';


describe('guard', () => {
  var spy, stub, T, F, eq;

  beforeEach(() => {
    T = () => true;
    F = () => false;
    eq = (x) => (y) => x === y;
  });

  it('should call the spy', () => {
    spy = sinon.spy();
    guard(T, spy)();
    expect(spy.called).to.be.ok();

    spy = sinon.spy();
    guard(eq(1), spy)(1);
    expect(spy.called).to.be.ok();
    expect(spy.calledWith(1)).to.be.ok();
  });

  it('should not call the spy', () => {
    spy = sinon.spy();
    guard(F, spy)();
    expect(spy.called).to.not.be.ok();

    spy = sinon.spy();
    guard(eq(0), spy)(1);
    expect(spy.called).to.not.be.ok();
  });

  it('should return the stubs return', () => {
    stub = sinon.stub().returns(42);
    expect(guard(T, stub)()).to.be.eql(42);
    expect(stub.called).to.be.ok();

    stub = sinon.stub().returns(42);
    expect(guard(eq(1), stub)(1)).to.be.eql(42);
    expect(stub.called).to.be.ok();
    expect(stub.calledWith(1)).to.be.ok();
  });

  it('should return undefined or the value provided', () => {
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
});
