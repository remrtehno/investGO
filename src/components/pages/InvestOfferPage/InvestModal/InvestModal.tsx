import type {FC} from 'react';
import React, {useState} from 'react';

import type {useCreateInvestAgreementApi} from 'src/api/investorApi/useCreateInvestAgreementApi';
import {Modal} from 'src/components/common/Modal/Modal';
import type {Borrower} from 'src/types/Borrower';

import {InvestAgreementForm} from './InvestAgreementForm';
import s from './InvestModal.scss';
import {SignInvestAgreementForm} from './SignInvestAgreementForm';

export declare namespace InvestModal {
  export type Props = {
    loan: Borrower.LoanDetails,
    onClose(): void,
    onSignInvestAgreement(): void,
  };
}

export const InvestModal: FC<InvestModal.Props> = (props) => {
  const {loan} = props;
  const [investAgreement, setInvestAgreement] = useState(null as useCreateInvestAgreementApi.Response | null);

  function handleInvesAgreementSuccess(investAgreement: useCreateInvestAgreementApi.Response) {
    setInvestAgreement(investAgreement);
  }

  function cancelAgreement() {
    setInvestAgreement(null);
  }

  return (
    <Modal className={s.investModal} allowClose={true} onClose={props.onClose}>
      <div className={s.modalInner}>
        { !investAgreement ? (
          <InvestAgreementForm loan={loan} onSuccess={handleInvesAgreementSuccess} />
        ) : null }
        { investAgreement ? (
          <SignInvestAgreementForm
            loan={loan}
            agreement={investAgreement}
            onSignInvestAgreement={props.onSignInvestAgreement}
            onBack={cancelAgreement}
          />
        ) : null }
      </div>
    </Modal>
  );
};
