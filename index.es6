'use strict';


let apply = (fn, args) => fn.apply(null, args);


export default function(pred, fn, nothing) {
  return (...args) =>  {
    if (apply(pred, args))
      return apply(fn, args);

    if (nothing instanceof Error)
      throw nothing;

    return nothing;
  };
}
