import {FC, useState} from 'react';
import React from 'react';
import { useCreateInvestAgreementApi } from 'src/api/investorApi/useCreateInvestAgreementApi';

import { Modal } from 'src/components/common/Modal/Modal';
import { Borrower } from 'src/types/Borrower';
import {breackpointUp} from 'src/utils/breackpointUtils';
import {formatDate} from 'src/utils/formatDate';
import {formatNumber} from 'src/utils/formatNumber';
import {plural} from 'src/utils/plural';
import { InvestAgreementForm } from './InvestAgreementForm';

import s from './InvestModal.scss';
import { SignInvestAgreementForm } from './SignInvestAgreementForm';

export declare namespace InvestModal {
  export type Props = {
    loan: Borrower.LoanDetails,
    onClose(): void,
  };
}

export const InvestModal: FC<InvestModal.Props> = (props) => {
  const {loan} = props;
  const [investAgreement, setInvestAgreement] = useState(null as useCreateInvestAgreementApi.Response | null)

  function handleInvesAgreementSuccess(investAgreement: useCreateInvestAgreementApi.Response) {
    setInvestAgreement(investAgreement)
  }

  function handleSignInvesAgreementSuccess() {
    console.log('handleSignInvesAgreementSuccess')
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
            onSuccess={handleSignInvesAgreementSuccess}
          />
        ) : null }
      </div>
    </Modal>
  )
}