import {useRef} from 'react';

export const useDebounce = () => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  return (func: (...args: any[]) => void, time: number) =>
    (...args: any[]) => {
      timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(func, time, ...args);
    };
};
