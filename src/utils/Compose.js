export function pipe(...functions) {
  return function(args) {
    return functions.reduce((arg, fn) => fn(arg), args);
  };
}

export function compose(...functions) {
  return pipe(...functions.reverse());
}
