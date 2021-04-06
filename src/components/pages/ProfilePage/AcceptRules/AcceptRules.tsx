import cx from 'classnames';
import React, {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {CheckBox} from 'src/components/ui/CheckBox';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {Role} from 'src/contstants/Role';
import {roleLabels} from 'src/contstants/rolesLabels';
import {ProfileSteps, uiAtom} from 'src/recoil/uiAtom';
import {userAtom} from 'src/recoil/userAtom';

import s from './AcceptRules.scss';


export declare namespace AcceptRules {
  export type Props = {
  };
}

export function AcceptRules(props: AcceptRules.Props) {
  const {user} = useRecoilValue(userAtom);
  const [checkBoxes, setCheckBoxes] = useState([false, false, false]);
  const [, setProfileStep] = useRecoilState(uiAtom);

  if (!user) {
    return null;
  }

  function handleSubmit() {
    setProfileStep({profileStep: ProfileSteps.rules});
  }

  return (
    <div className={s.AcceptRules}>
      <div className={s.header}>
        <Text size={TextSize.tabMenu}>
          { user.roles.includes(Role.investor) ? roleLabels[Role.investor] : roleLabels[Role.borrower] }
        </Text>
        <Text size={TextSize.tabMenu} color={Color.label}>
          { (function() {
            if (user.roles.includes(Role.ur)) {
              return roleLabels[Role.ur];
            }

            if (user.roles.includes(Role.fl)) {
              return roleLabels[Role.fl];
            }

            return roleLabels.ip;
          })() }
        </Text>
      </div>
      <div>
        <Text size={TextSize.h2} className={s.title}>
          Теперь вы можете присоединиться к правилам платформы InvestGo.
        </Text>
        <Text size={TextSize.body0} className={s.text}>
          Присоединение к правилам предполагает предоставляние
          необходимых документов и заключение договора между Вами (индивидуальным предпринимателем) и платформой.
        </Text>
        <div>
          <div>
            <CheckBox
              className={s.checkbox}
              value={checkBoxes[0]}
              onChange={(checked) => setCheckBoxes([checked, checkBoxes[1], checkBoxes[2]])}
              label={
                <Text size={TextSize.body0}>Сформировать заявление на присоединение к <a onClick={(e) => e.stopPropagation()} className={s.link} href='#'>Правилам</a>.</Text>
              } />
            <CheckBox
              className={s.checkbox}
              value={checkBoxes[1]}
              onChange={(checked) => setCheckBoxes([checkBoxes[0], checked, checkBoxes[2]])}
              label={
                <Text size={TextSize.body0}>Сформировать договор на оказание Оператором Платформы услуг по
                  { user.roles.includes(Role.borrower) ? 'привлечению инвестиций' : 'содействию в инвестировании' }.</Text>
              } />
            { user.roles.includes(Role.borrower) ? (
              <CheckBox
                className={s.checkbox}
                value={checkBoxes[2]}
                onChange={(checked) => setCheckBoxes([checkBoxes[0], checkBoxes[1], checked])}
                label={
                  <Text size={TextSize.body0}>Принимаю условия <a onClick={(e) => e.stopPropagation()} className={s.link} href='#'>Декларации о рисках</a>.</Text>
                } />
            ) : null }
          </div>

          <div className={cx(s.actions, 'row justify-content-center')}>
            <div className='col-sm-12 col-md-7 col-xl-5 col-xxl-3'>
              <Button
                disabled={(() => {
                  if (!checkBoxes[0] || !checkBoxes[1]) {
                    return true;
                  }

                  return user.roles.includes(Role.borrower) && !checkBoxes[2];
                })()}
                size={ButtonSize.m}
                onClick={handleSubmit}
                theme={ButtonTheme.black}
              >Присоединиться к правилам</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
