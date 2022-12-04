import {useRef} from 'react';

export const useDebounce = () => {
  const timeoutIdRef = useRef<number>();

  const debounce =
    (func: () => void, time: number) =>
    (...args) => {
      timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(func, time, ...args);
    };

  return debounce;
};
