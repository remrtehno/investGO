import cx from 'classnames';
import type {CSSProperties, FC} from 'react';
import React, {useMemo, useRef} from 'react';

import type {ProfilePage} from 'src/components/pages/ProfilePage/ProfilePage';
import type {ProfileFormType} from 'src/components/pages/ProfilePage/profilePageTypes';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {usePageScroll} from 'src/hooks/usePageScroll';
import {usePosition} from 'src/hooks/usePosition';
import {Color} from 'src/types/Color';

import s from './ProfileNavigation.scss';

export declare namespace ProfileNavigation {
  export type Props = {
    forms: ProfilePage.FormInfo[],
    currentForm: ProfileFormType,
    onChangeCurrentForm(form: ProfileFormType): void,

    className?: string,
  };
}

export const ProfileNavigation: FC<ProfileNavigation.Props> = (props) => {
  const {scrollTop} = usePageScroll();
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = usePosition(ref);

  const style = useMemo((): CSSProperties => {
    if (!pos) {
      return {};
    }

    if (pos.top - scrollTop > 40) {
      return {};
    }

    return {
      position: 'fixed',
      top: 40,
    };
  }, [pos, scrollTop]);

  return (
    <div ref={ref} className={cx(s.navigation, props.className)}>
      <div style={style}>
        { props.forms.map((form) => {
          const isActive = props.currentForm === form.id;
          return (
            <Text
              weight={isActive ? TextWeight.bold : TextWeight.normal}
              size={TextSize.body1}
              color={isActive ? Color.black : Color.label}
              key={form.id}
              className={cx(s.link, {[s.active]: isActive})}
              onClick={() => {
                props.onChangeCurrentForm(form.id);
              }}
            >
              { form.title }
            </Text>
          );
        }) }
      </div>
    </div>
  );
};
