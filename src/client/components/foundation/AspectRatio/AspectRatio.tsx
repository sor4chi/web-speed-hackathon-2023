import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import * as styles from './AspectRatio.styles';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState<number>(0);

  const observer = new ResizeObserver(() => {
    const width = containerRef.current?.getBoundingClientRect().width ?? 0;
    const height = (width * ratioHeight) / ratioWidth;
    setClientHeight(height);
  });

  useEffect(() => {
    if (containerRef.current == null) return;
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container({ clientHeight })}>
      {children}
    </div>
  );
};
