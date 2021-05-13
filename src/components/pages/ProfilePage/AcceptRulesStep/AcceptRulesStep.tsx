import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import {useState} from 'react';
import React, {useEffect, useMemo} from 'react';
import {useHistory} from 'react-router';
import {useRecoilState, useRecoilValue} from 'recoil';

import {RoutePaths} from 'src/components/common/App/routes';
import {Modal} from 'src/components/common/Modal/Modal';
import {AcceptRulesDocument} from 'src/components/pages/ProfilePage/AcceptRulesStep/AcceptRulesDocument';
import {Text, TextSize} from 'src/components/ui/Text';
import {Role} from 'src/contstants/Role';
import {useIsRegistrationComplete} from 'src/hooks/useIsRegistrationComplete';
import {BackArrowIcon} from 'src/icons/BackArrowIcon';
import {InfoMessageIcon} from 'src/icons/InfoMessageIcon';
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
  const isRegistrationComplete = useIsRegistrationComplete();
  const history = useHistory();

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

  function getIsLoading(): boolean {
    let loading = true;
    if (user?.roles.includes(Role.borrower) && user?.roles.includes(Role.investor)) {
      if (borrowerAccessionAgreement && investorAccessionAgreement) {
        loading = false;
      }
      return loading;
    }
    if (user?.roles.includes(Role.borrower) && borrowerAccessionAgreement) {
      loading = false;
    }
    if (user?.roles.includes(Role.investor) && investorAccessionAgreement) {
      loading = false;
    }
    return loading;
  }

  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(getIsLoading());

  useEffect(() => {
    setIsLoadingModalOpen(getIsLoading());
  }, [documents]);

  function back() {
    setProfileStep({profileStep: ProfileSteps.profile});
  }

  useEffect(() => {
    if (isRegistrationComplete) {
      if (user && user.roles.includes(Role.borrower)) {
        history.push(RoutePaths.borrowerDashboard);
      } else {
        history.push(RoutePaths.investorDashboard);
      }
    }
  }, [documents]);

  function handleModalClose() {
    setIsLoadingModalOpen(false);
  }

  if (!user) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div>
        <span className={s.backLink} onClick={back}>
          <BackArrowIcon />
          назад
        </span>
        <div className={s.title}>Присоединение к правилам</div>
        <Text className={s.text} size={TextSize.body2}>
          Ознакомьтесь с документами, сформированными на основе данных, указанных в вашем
          профиле, и нажмите кнопку  &quot;Подписать&quot;.
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
      { isLoadingModalOpen ? (
        <Modal className={s.successModal} allowClose={true} onClose={handleModalClose}>
          <div className={cx(s.modalInner, 'text-center')}>
            <InfoMessageIcon />
            <Text size={TextSize.body2} className={s.modalText}>
              Подождите...
            </Text>
            <Text size={TextSize.body2}>
              Формируются договоры присоединения.
            </Text>
          </div>
        </Modal>
      ) : null }
    </div>
  );
};
