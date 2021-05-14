import {FC, useState} from 'react';
import React from 'react';
import { useInvestAgreementApi } from 'src/api/investorApi/useInvestAgreementApi';

import { Modal } from 'src/components/common/Modal/Modal';
import { Borrower } from 'src/types/Borrower';
import {breackpointUp} from 'src/utils/breackpointUtils';
import {formatDate} from 'src/utils/formatDate';
import {formatNumber} from 'src/utils/formatNumber';
import {plural} from 'src/utils/plural';
import { InvestAgreementForm } from './InvestAgreementForm';

import s from './InvestModal.scss';

export declare namespace InvestModal {
  export type Props = {
    loan: Borrower.LoanDetails,
    onClose(): void,
  };
}

export const InvestModal: FC<InvestModal.Props> = (props) => {
  const {loan} = props;
  const [investAgreement, setInvestAgreement] = useState(null as useInvestAgreementApi.Response | null)

  function handleInvesAgreementSuccess(investAgreement: useInvestAgreementApi.Response) {
    setInvestAgreement(investAgreement)
  }

  return (
    <Modal className={s.investModal} allowClose={true} onClose={props.onClose}>
      <div className={s.modalInner}>
        { !investAgreement ? (
          <InvestAgreementForm loan={loan} onSuccess={handleInvesAgreementSuccess} />
        ) : null }
        { investAgreement ? (
          <div>!!!</div>
        ) : null }
      </div>
    </Modal>
  )
}