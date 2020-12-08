import React, {CSSProperties, FC, useMemo, useRef} from "react";
import {usePageScroll} from "../../../../hooks/usePageScroll";
import {usePosition} from "../../../../hooks/usePosition";
import {Color} from "../../../../types/Color";
import {Text, TextSize} from "../../../ui/Text";
import {ProfilePage} from "../ProfilePage";
import {ProfileFormType} from "../profilePageTypes";
import s from './ProfileNavigation.scss';
import cx from 'classnames';

export declare namespace ProfileNavigation {
  export type Props = {
    forms: ProfilePage.FormInfo[],
    currentForm: ProfileFormType,
    onChangeCurrentForm(form: ProfileFormType): void,

    className?: string,
  };
}

export const ProfileNavigation: FC<ProfileNavigation.Props> = (props) => {
  const { scrollTop } = usePageScroll();
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
      top: 40
    }
  }, [pos, scrollTop]);

  return (
    <div ref={ref} className={cx(s.navigation, props.className)}>
      <div style={style}>
        {props.forms.map((form) => {
          const isActive = props.currentForm === form.id;
          return (
            <Text
              isBold={isActive}
              size={TextSize.body1}
              color={isActive ? Color.black : Color.label}
              key={form.id}
              className={cx(s.link, { [s.active]: isActive })}
              onClick={() => {
                props.onChangeCurrentForm(form.id);
              }}
            >
              {form.title}
            </Text>
          )
        })}
      </div>
    </div>
  )
};
