import { useState, useEffect } from 'react';

export function useCounter(initCount = 0) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(initCount);
  }, [initCount]);

  const multiplyByTen = initCount * 10

  return { count, setCount, multiplyByTen } as const
}
