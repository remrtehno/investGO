import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect, useRef, useState} from 'react';

import s from './RangeInput.scss';

export declare namespace Range {
  export type Props = {
    value: number,
    min: number,
    max: number,
    onChange: (value: number) => void;
  };
}

export const Range: FC<Range.Props> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderInnerRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const diff = useRef(0);

  function getPercentage(current: number, max: number) {
    let percentage = (100 * current) / max;
    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage > 100) {
      percentage = 100;
    }
    return percentage;
  }

  function getValue(percentage: number, max: number) {
    return (max / 100) * percentage;
  }

  function format(value: number) {
    return Math.round(value);
  }

  function moveThumb(percentage: number) {
    if (!sliderRef.current || !thumbRef.current || !sliderInnerRef.current) {
      return;
    }
    const px = sliderRef.current.offsetWidth / 100 * percentage;
    thumbRef.current.style.transform = `translate(${px - 10}px, -10px)`;
    sliderInnerRef.current.style.background
    = `linear-gradient(to right, rgb(0, 0, 0) 0%, 
      rgb(0, 0, 0) ${percentage}%, 
      rgba(0, 0, 0, 0) ${percentage}%, 
      rgba(0, 0, 0, 0) 100%)`;
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) {
      return;
    }
    if (!sliderRef.current || !thumbRef.current) {
      return;
    }

    let newX
      = event.clientX
      - diff.current
      - sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, end);
    moveThumb(newPercentage);
    const newValue = format(getValue(newPercentage, props.max));
    props.onChange(newValue);
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  function handleMouseDown(event: any) {
    setIsDragging(true);
    if (!thumbRef.current) {
      return;
    }
    diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left;
  }

  function handleClick(event: any) {
    if (isDragging) {
      return;
    }
    if (!sliderRef.current || !thumbRef.current) {
      return;
    }
    const newX = event.clientX - sliderRef.current.getBoundingClientRect().left;
    const end = sliderRef.current.offsetWidth;
    const newPercentage = getPercentage(newX, end);
    moveThumb(newPercentage);
    const newValue = format(getValue(newPercentage, props.max - props.min));
    props.onChange(newValue);
  }

  useEffect(() => {
    const newPercentage = getPercentage(props.value, props.max - props.min);
    moveThumb(newPercentage);
  }, [props.value]);

  return (
    <div className={s.range}>
      <div
        onClick={handleClick}
        className={s.track}
        ref={sliderRef}
      >
        <div
          className={s.trackInner}
          ref={sliderInnerRef}
        >
          <div
            className={s.thumb}
            ref={thumbRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div
              className={cx(s.thumbInner)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
