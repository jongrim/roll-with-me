import debounce from 'lodash.debounce';

const debouncedUpdate = (cb: (...args: any[]) => Promise<void>, wait = 1000) =>
  debounce((...args) => {
    cb(...args);
  }, wait);

export default debouncedUpdate;
