import cx from 'classnames';
import React, {FC, useEffect} from 'react';
import {useRecoilValue} from 'recoil';

import {useUserDocuments} from 'src/api/userApi/useUserDocuments';
import {Text, TextSize} from 'src/components/ui/Text';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import {userAtom} from 'src/recoil/userAtom';

import s from './SignDocuments.scss';
import {ProfileForms} from "src/components/pages/ProfilePage/ProfileForms";

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
        <div className='row'>
          { signDocuments && signDocuments?.map((item) => {
            if (item.type === 'borrower_accession_agreement') {
              return (<a href={item.file.url} key={item.file.id} className={cx(s.joinDocs, 'col-sm-6')}>
                <DocumentIcon />
                Договор на оказание Оператором Платформы услуг по привлечению инвестиций
              </a>);
            }
            if (item.type === 'investor_accession_agreement') {
              return (<a href={item.file.url} key={item.file.id} className={cx(s.joinDocs, 'col-sm-6')}>
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
