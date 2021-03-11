import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {userAtom} from 'src/recoil/userAtom';
import {Text, TextSize} from 'src/components/ui/Text';
import {Role} from 'src/contstants/Role';
import {roleLabels} from 'src/contstants/rolesLabels';
import {Color} from 'src/contstants/Color';
import {CheckBox} from 'src/components/ui/CheckBox';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import s from './AcceptRules.scss';
import {AcceptRulesModal} from 'src/components/pages/ProfilePage/AcceptRules/AcceptRulesModal';

export declare namespace AcceptRules {
  export type Props = {};
}

export function AcceptRules(props: AcceptRules.Props) {
  const { user } = useRecoilValue(userAtom);
  const [checkBoxes, setCheckBoxes] = useState([false, false, false]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className={s.AcceptRules} style={{ marginBottom: 60 }}>
      <div className={s.header}>
        <Text size={TextSize.tabMenu}>
          {user.roles.includes(Role.investor) ? roleLabels[Role.investor] : roleLabels[Role.borrower]}
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
        <Text size={TextSize.h2} style={{ marginBottom: 10 }}>
          Теперь вы можете присоединиться к правилам платформы InvestGo.
        </Text>
        <Text size={TextSize.body0} style={{ marginBottom: 50 }}>
          Присоединение к правилам предполагает предоставляние необходимых документов и заключение договора между Вами (индивидуальным предпринимателем) и платформой.
        </Text>
        <div>
          <div>
            <CheckBox
              style={{ marginBottom: 20 }}
              value={checkBoxes[0]}
              onChange={(checked) => setCheckBoxes([checked, checkBoxes[1], checkBoxes[2]])}
              label={
                <Text size={TextSize.body0}>Сформировать заявление на присоединение к <a onClick={(e) => e.stopPropagation()} className={s.link} href='#'>Правилам</a>.</Text>
              }/>
            <CheckBox
              style={{ marginBottom: 20 }}
              value={checkBoxes[1]}
              onChange={(checked) => setCheckBoxes([checkBoxes[0], checked, checkBoxes[2]])}
              label={
                <Text size={TextSize.body0}>Сформировать договор на оказание Оператором Платформы услуг по
                  {user.roles.includes(Role.borrower) ? 'привлечению инвестиций' : 'содействию в инвестировании'}.</Text>
              }/>
            { user.roles.includes(Role.borrower) ? (
              <CheckBox
              style={{ marginBottom: 20 }}
              value={checkBoxes[2]}
              onChange={(checked) => setCheckBoxes([checkBoxes[0], checkBoxes[1], checked])}
              label={
                <Text size={TextSize.body0}>Принимаю условия <a onClick={(e) => e.stopPropagation()} className={s.link} href='#'>Декларации о рисках</a>.</Text>
              }/>
            ) : null }
          </div>
          
            <div className='row justify-content-center' style={{ paddingBottom: 20 }}>
              <Button
                disabled={(() => {
                  if (!checkBoxes[0] || !checkBoxes[1]) {
                    return true;
                  }

                  return user.roles.includes(Role.borrower) && !checkBoxes[2];
                })()}
                className='col-6'
                size={ButtonSize.m}
                onClick={() => setIsModalOpened(true)}
                theme={ButtonTheme.black}
              >Присоединиться к правилам</Button>
            </div>
          
        </div>
      </div>
      { isModalOpened ? (
        <AcceptRulesModal onClose={() => setIsModalOpened(false)} />
      ) : null }
    </div>
  );
}
