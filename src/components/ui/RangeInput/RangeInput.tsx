import cx from 'classnames';
import type {ChangeEvent, FC} from 'react';
import React, {useCallback, useMemo} from 'react';
import {getTrackBackground, Range} from 'react-range';

import {Input} from 'src/components/ui/Input';
import {integerRegExp} from 'src/contstants/regExp';

import s from './RangeInput.scss';

export declare namespace RangeInput {
  // export type Props = Omit<Input.Props, 'mask' | 'regExp'>;
  export type Props = {
    value: number,
    name?: string,
    min: number,
    max: number,
    onChange: (value: number, name: string | null) => void;
    step?: number,
    rtl?: boolean,
  };
}

export const RangeInput: FC<RangeInput.Props> = (props) => {
  const {value, min, max, rtl} = props;

  const onChangeInput: Input.OnChange = useCallback((value, name) => {
    props.onChange(parseInt(value, 10), name);
  }, [props.onChange]);

  function onChangeRange(values:number[]): void {
    props.onChange(values[0], props.name || null);
  }

  return (
    <div className={s.rangeInput}>
      <Input
        {...props}
        value={value.toString()}
        onChange={onChangeInput}
        regExp={integerRegExp}
      />
      <div className={s.range}>
        <Range
          values={[value]}
          step={props.step}
          min={props.min}
          max={props.max}
          rtl={props.rtl}
          onChange={onChangeRange}
          renderTrack={({props, children}) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className={s.track}
            >
              <div
                ref={props.ref}
                className={s.trackInner}
                style={{
                  background: getTrackBackground({
                    values: [value],
                    colors: ['#000', 'rgba(0, 0, 0, 0)'],
                    min,
                    max,
                    rtl,
                  }),
                }}
              >
                { children }
              </div>
            </div>
          )}
          renderThumb={({props, isDragged}) => (
            <div
              {...props}
              className={s.thumb}
              style={{
                ...props.style,
              }}
            >
              <div
                className={cx(s.thumbInner, isDragged && s.thumbIsDragged)}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};
