import _ from 'lodash';
import type {FC} from 'react';
import React, {useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import {AcceptRulesDocument} from 'src/components/pages/ProfilePage/AcceptRulesStep/AcceptRulesDocument';
import {Text, TextSize} from 'src/components/ui/Text';
import {Role} from 'src/contstants/Role';
import {documentsAtom} from 'src/recoil/documentsAtom';
import {ProfileSteps, uiAtom} from 'src/recoil/uiAtom';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './AcceptRulesStep.scss';

export declare namespace AcceptRulesStep {
  export type Props = {
  };
}

export const AcceptRulesStep: FC<AcceptRulesStep.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const {documents} = useRecoilValue(documentsAtom);
  const [, setProfileStep] = useRecoilState(uiAtom);

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

  function back() {
    setProfileStep({profileStep: ProfileSteps.profile});
  }

  if (!user) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div>
        <span className={s.backLink} onClick={back}>назад</span>
        <div className={s.title}>Присоединение к правилам</div>
        <Text className={s.text} size={TextSize.body2}>
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
    </div>
  );
};
