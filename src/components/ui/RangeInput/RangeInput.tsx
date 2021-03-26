import cx from 'classnames';
import type {FC, ReactNode} from 'react';
import React, {useCallback} from 'react';

import {Input} from 'src/components/ui/Input';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {integerRegExp} from 'src/contstants/regExp';
import type {Plurals} from 'src/utils/plural';

import {Range} from './Range';
import s from './RangeInput.scss';

export declare namespace RangeInput {
  export type Props = {
    value: number,
    min: number,
    max: number,
    onChange: (value: number, name: string | null) => void;
    name?: string,
    label?: string,
    error?: string | null,
    postfix?: ReactNode | Plurals
  };
}

export const RangeInput: FC<RangeInput.Props> = (props) => {
  const {value, min, max} = props;


  const onChangeInput: Input.OnChange = useCallback((value, name) => {
    let val = parseInt(value, 10);
    if (val > props.max) {
      val = props.max;
    }
    props.onChange(val, name);
  }, [props.onChange]);

  function onChangeRange(value:number): void {
    props.onChange(value, props.name || null);
  }


  return (
    <div className={s.rangeInput}>
      { props.label ? (
        <Text
          className={cx(s.label)}
          size={TextSize.tabMenu}
          color={Color.gray4}
        >
          { props.label }
        </Text>
      ) : null }
      <Input
        value={value ? value?.toString() : ''}
        onChange={onChangeInput}
        regExp={integerRegExp}
        postfix={props.postfix}
        className={s.textInput}
        error={props.error}
      />
      <Range value={value} min={min} max={max} onChange={onChangeRange} />
    </div>
  );
};
