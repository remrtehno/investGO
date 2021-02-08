import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ReactSelect from 'react-select';

import s from './Select.scss';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';

export declare namespace Select {
  export type Props = {
    onChange(value: string | null, option: Option | null, name: string | null): void,
    value: string | Option | null,

    isAsync?: boolean,
    options?: Option[],
    inputValue?: string,
    name?: string | null,
    className?: string,
    label?: string,
    placeholder?: string,
    isClearable?: boolean,
    isSearchable?: boolean,
    loadOptions?: LoadOptions,
    cacheOptions?: boolean,
    error?: string | null,
    noOptionsMessage?(opts: { inputValue: string }): string | null,
  };

  export type LoadOptions = (inputValue: string) => Promise<Option[]>;

  export type Option = {
    value: string,
    label: string,
  };
}

export const Select: FC<Select.Props> = (props) => {
  const [inputValue, setInputValue] = useState(props.inputValue || '');
  const [options, setOptions] = useState<Select.Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const noOptionsMessage = useMemo(() => {
    return props.noOptionsMessage || (() => 'Ничего не найдено');
  }, []);

  const value = useMemo(() => {
    if (_.isString(props.value)) {
      if (!props.options) {
        return null;
      }
      return props.options.find((option) => option.value === props.value);
    }

    return props.value;
  }, [props.value]);

  const onChange = useCallback((newValue: Select.Option | null) => {
    props.onChange(newValue ? newValue.value : null, newValue, props.name || null);
  }, [props.onChange]);

  useEffect(() => {
    const loadOptions = async() => {
      if (!props.loadOptions || !props.isAsync) {
        return;
      }

      setIsLoading(true);
      try {
        const newOptions = await props.loadOptions(inputValue);
        setOptions(newOptions);
      } catch (e) {

      }

      setIsLoading(false);
    };

    loadOptions();
  }, [inputValue]);

  return (
    <div style={{
      position: 'relative'
    }}>
      <ReactSelect
        className={cx(s.Select, props.className, { [s.withError]: Boolean(props.error) })}
        placeholder={props.placeholder || props.label}
        options={props.options || options}
        inputValue={inputValue}
        value={value}
        isLoading={isLoading}
        onInputChange={(newInputValue) => setInputValue(newInputValue)}
        isSearchable={props.isSearchable}
        onChange={onChange as any}
        isClearable={props.isClearable == null ? true : props.isClearable}
        classNamePrefix='select'
        noOptionsMessage={noOptionsMessage}
      />
      { props.error ? (
        <Text size={TextSize.bodyMini} color={Color.red} className={s.error} style={{
          position: 'absolute',
          bottom: -18,
          right: 0
        }}>
          {props.error}
        </Text>
      ) : null }
    </div>
  );
};
