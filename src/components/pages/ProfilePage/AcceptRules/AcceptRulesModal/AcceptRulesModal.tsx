import _ from 'lodash';
import type {FC} from 'react';
import React, {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {Modal} from 'src/components/common/Modal/Modal';
import {AcceptRulesDocument} from 'src/components/pages/ProfilePage/AcceptRules/AcceptRulesDocument';
import {Text, TextSize} from 'src/components/ui/Text';
import {Role} from 'src/contstants/Role';
import {documentsAtom} from 'src/recoil/documentsAtom';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from '../AcceptRules.scss';

export declare namespace AcceptRulesModal {
  export type Props = {
    onClose(): void,
  };
}

export const AcceptRulesModal: FC<AcceptRulesModal.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const {documents} = useRecoilValue(documentsAtom);

  const borrowerAccessionAgreement = useMemo(() => {
    return _.find(documents, (doc: User.SignDocuments): boolean => {
      return doc.type === 'borrower_accession_agreement';
    });
  }, [documents]);

  const investorAccessionAgreement = useMemo(() => {
    return _.find(documents, (doc: User.SignDocuments): boolean => {
      return doc.type === 'investor_accession_agreement';
    });
  }, [documents]);

  if (!user) {
    return null;
  }

  return (
    <Modal width={700} allowClose={true} onClose={props.onClose}>
      <div className='container'>
        <div className={s.modalTitle}>Присоединение к правилам</div>
        <Text style={{marginBottom: 60}} size={TextSize.body2}>
          Ознакомьтесь с документами, сформированными на основе данных, указанных в вашем
          профиле, и нажмите кнопку  "Подписать".
        </Text>
        <div className='row'>
          { user.roles.includes(Role.borrower) ? (
            <AcceptRulesDocument
              document={borrowerAccessionAgreement}
              type='borrower_accession_agreement'
              name='Договор на оказание Оператором Платформы услуг по привлечению инвестиций'
            />
          ) : null }
          { user.roles.includes(Role.investor) ? (
            <AcceptRulesDocument
              document={investorAccessionAgreement}
              type='investor_accession_agreement'
              name='Договор на оказание Оператором Платформы услуг по содействию в инвестировании'
            />
          ) : null }
        </div>
      </div>
    </Modal>
  );
};
