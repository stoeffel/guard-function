'use strict';


let apply = (fn, args) => fn.apply(null, args);


export default function(pred, fn, nothing) {
  return (...args) => 
    apply(pred, args)?
    apply(fn, args):
    nothing;
}
