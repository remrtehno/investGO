import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';

import {useUserDocuments} from 'src/api/userApi/useUserDocuments';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms';
import {Text, TextSize} from 'src/components/ui/Text';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './SignDocuments.scss';

export declare namespace SignDocumentsForm {
  export type Props = ProfileForms.FormProps;
}

export const SignDocuments: FC<SignDocumentsForm.Props> = (props) => {
  const [signDocuments, getSignDocuments] = useUserDocuments();
  const {user} = useRecoilValue(userAtom);

  useEffect(() => {
    getSignDocuments(null);
  }, []);

  if (!user || !signDocuments?.length) {
    return null;
  }

  return (
    <div ref={props.formRef}>
      <Text size={TextSize.h2}>Договоры присоединения</Text>
      { user.company && user.company.status === ModerationStatus.approved ? (
        <div className={cx(s.row, 'row')}>
          { signDocuments && signDocuments?.map((item: User.SignDocuments) => {
            if (item.type === 'borrower_accession_agreement') {
              return (<a href={item.file?.url} key={item.file?.id} className={cx(s.joinDocs, 'col-md-6')}>
                <DocumentIcon />
                Договор на оказание Оператором Платформы услуг по привлечению инвестиций
              </a>);
            }
            if (item.type === 'investor_accession_agreement') {
              return (<a href={item.file?.url} key={item.file?.id} className={cx(s.joinDocs, 'col-md-6')}>
                <DocumentIcon />
                Договор на оказание Оператором Платформы услуг по содействию
                в инвестировании
              </a>);
            }
          }) }
        </div>
      ) : null }
    </div>
  );
};
