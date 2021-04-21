import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect, useRef, useState} from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {NextIcon} from 'src/icons/NextIcon';
import type {FilePrimitive} from 'src/types/FilePrimitive';

import s from './PhotoSlider.scss';

export declare namespace PhotoSlider {
  export type Props = {
    images: [FilePrimitive],
    onClose(): void,
    startImageIndex?: number
  }
}

export const PhotoSlider: FC<PhotoSlider.Props> = (props) => {
  const startIndex = props.startImageIndex || 0;
  const [current, setCurrent] = useState(startIndex);
  const contentRef = useRef<HTMLDivElement | null>(null);

  function next() {
    let next = current + 1;
    if (next > props.images.length - 1) {
      next = 0;
    }
    setCurrent(next);
  }

  function prev() {
    let prev = current - 1;
    if (prev < 0) {
      prev = props.images.length - 1;
    }
    setCurrent(prev);
  }

  function handleKey(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'ArrowRight') {
      next();
    } else if (key === 'ArrowLeft') {
      prev();
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKey);
    return () => {
      window.removeEventListener('keyup', handleKey);
    };
  });

  useOnClickOutside(contentRef, () => {
    props.onClose();
  });

  return (
    <div className={s.photoSlider}>
      <div className={s.content} ref={contentRef}>
        <div className={s.items}>
          <span className={cx(s.button, s.buttonPrev)} onClick={prev}><NextIcon /></span>
          <span className={cx(s.button, s.buttonNext)} onClick={next}><NextIcon /></span>
          { props.images.map((image: FilePrimitive, index: number) => {
            return (
              <div className={cx(s.item, index === current && s.active)} key={index}>
                <img src={image.url} />
              </div>
            );
          }) }
        </div>
        <Text size={TextSize.bodyMini} color={Color.label} className={s.count}>
          { current + 1 } из { props.images.length }
        </Text>
      </div>
    </div>
  );
};
