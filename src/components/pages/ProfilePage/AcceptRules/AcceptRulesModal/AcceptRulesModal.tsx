import React, {CSSProperties, FC, useState} from 'react';
import {Text, TextSize} from 'src/components/ui/Text';
import s from '../AcceptRules.scss';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {SmsForm} from 'src/components/pages/SignPage/SignForm/SmsForm';
import {useRecoilValue} from 'recoil';
import {userAtom} from 'src/recoil/userAtom';
import {Modal} from 'src/components/common/Modal/Modal';
import {Role} from 'src/contstants/Role';
import cx from 'classnames';
import {useSignDocs} from 'src/api/userApi/useSignDocs';

const DocIcon: FC<{ style: CSSProperties }> = (props) => {
  return (
    <svg width="35" height="41" viewBox="0 0 35 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect y="0.605469" width="35" height="40" fill="black"/>
      <line x1="27.5117" y1="11.6055" x2="6.94608" y2="11.6055" stroke="white" strokeWidth="2"/>
      <line x1="27.5117" y1="20.4199" x2="6.94608" y2="20.4199" stroke="white" strokeWidth="2"/>
      <path d="M12.4844 29.2344L6.94387 29.2344" stroke="white" strokeWidth="2"/>
    </svg>
  )
}

export declare namespace AcceptRulesModal {
  export type Props = {
    onClose(): void,
  };
}

export const AcceptRulesModal: FC<AcceptRulesModal.Props> = (props) => {
  const { user } = useRecoilValue(userAtom);
  const [isSmsModalOpened, setIsSmsModalOpened] = useState(false);
  const [, signDocsApi] = useSignDocs();

  if (!user) {
    return null;
  }

  return (
    <Modal width={700} allowClose={true} onClose={props.onClose}>
      <div className='container'>
        <div className={s.modalTitle}>Присоединение к правилам</div>
        <Text style={{ marginBottom: 60 }} size={TextSize.body2}>Ознакомьтесь с документами, сформированными на основе данных, указанных в вашем
          профиле, и нажмите кнопку  "Подписать".
        </Text>
        <div className='row'>
          { user.roles.includes(Role.borrower) ? (
            <a
              href='/api/borrower/accession-agreement'
              target='_blank'
              style={{ display: 'flex', textDecoration: 'none' }}
              className={cx('col-6', s.link)}
            >
              <DocIcon style={{ minWidth: 35, marginRight: 20 }}/>
              <Text size={TextSize.body2}>Договор на оказание Оператором Платформы услуг по привлечению инвестиций</Text>
            </a>
          ) : null }
          { user.roles.includes(Role.investor) ? (
            <a
              href='/api/investor/accession-agreement'
              target='_blank'
              style={{ display: 'flex', textDecoration: 'none' }}
              className={cx('col-6', s.link)}
            >
              <DocIcon style={{ minWidth: 35, marginRight: 20 }}/>
              <Text size={TextSize.body2}>Договор на оказание Оператором Платформы услуг по содействию в инвестировании</Text>
            </a>
          ) : null }
        </div>
        <div className='row' style={{ marginTop: 60 }}>
          <Button
            className='col-4'
            size={ButtonSize.m}
            theme={ButtonTheme.black}
            onClick={() => setIsSmsModalOpened(true)}
          >Подписать</Button>
        </div>
        { isSmsModalOpened ? (
          <SmsForm
            phone={user.phone}
            onConfirm={() => {
              setIsSmsModalOpened(false);
              signDocsApi();
            }}
            onClose={() => setIsSmsModalOpened(false)}
          />
        ) : null }
      </div>
    </Modal>
  );
}
