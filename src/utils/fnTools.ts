export function compose(...fns: Function[]) {
  let nextResult: any;
  return function compute(k: any): any {
    nextResult = k;
    fns.reverse().forEach((fn) => {
      nextResult = fn(nextResult);
    });
    return nextResult;
  };
}
