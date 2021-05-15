export function compose(...fns: Function[]) {
  let nextResult: any;
  return function compute(...args: any[]): any {
    nextResult = args;
    fns.reverse().forEach((fn) => {
      nextResult = Array.isArray(nextResult)
        ? fn(...nextResult)
        : fn(nextResult);
    });
    return nextResult;
  };
}
