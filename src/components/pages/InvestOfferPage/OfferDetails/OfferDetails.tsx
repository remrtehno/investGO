import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import {Modal} from 'src/components/common/Modal/Modal';
import {InvestModal} from 'src/components/pages/InvestOfferPage/InvestModal';
import {LoanConditions} from 'src/components/pages/LoanRequestPage/LoanDetails/LoanConditions';
import {LoanDocuments} from 'src/components/pages/LoanRequestPage/LoanDetails/LoanDocuments';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import type {Borrower} from 'src/types/Borrower';
import {formatNumber} from 'src/utils/formatNumber';

import s from './OfferDetails.scss';

export declare namespace OfferDetails {
  export type Props = {
    loan: Borrower.LoanDetails,
    onSignInvestAgreement(): void,
  };
}

export const OfferDetails: FC<OfferDetails.Props> = (props) => {
  const {loan} = props;
  const [activeTab, setActiveTab] = useState('1');
  const [isInvestModalOpened, setIsInvestModalOpened] = useState(false);
  const [isSignSuccessModalOpened, setIsSignSuccessModalOpened] = useState(false);

  const tabs = [
    {id: '1', label: 'Условия'},
    {id: '2', label: 'Документы'},
  ];

  function handleInvestButton() {
    setIsInvestModalOpened(true);
  }

  function handleInvestModalClose() {
    setIsInvestModalOpened(false);
  }

  function handleSignInvestAgreement() {
    setIsInvestModalOpened(false);
    setIsSignSuccessModalOpened(true);
    props.onSignInvestAgreement();
  }

  function handleSignSuccessModalClose() {
    setIsSignSuccessModalOpened(false);
  }

  return (
    <div className={s.loan}>
      <div className={s.stats}>
        <div className={cx('row')}>
          <div className={cx(s.amount, 'col-9')}>{ formatNumber(loan.received_amount) } ₽</div>
          <div className='col-3 text-end'>
            <Button theme={ButtonTheme.red} size={ButtonSize.s} onClick={handleInvestButton}>
              Инвестировать
            </Button>
          </div>
        </div>
        <div className={cx('row', s.statsRow)}>
          <div className='col'>Из <b>{ formatNumber(loan.amount) } ₽</b></div>
          <div className='col text-end'>
            Инвесторов <b>{ loan.investors.length }</b>
          </div>
        </div>
        <div className={s.statsLine}>
          <div
            className={s.statsFill}
            style={{width: `${loan.received_amount * 100 / loan.amount}%`}}
          />
        </div>
      </div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        activeColor='red'
      />
      { activeTab === '1' ? (
        <LoanConditions loan={loan} />
      ) : null }
      { activeTab === '2' && loan.documents.length ? (
        <LoanDocuments loan={loan} />
      ) : null }

      { isInvestModalOpened ? (
        <InvestModal
          loan={loan}
          onClose={handleInvestModalClose}
          onSignInvestAgreement={handleSignInvestAgreement}
        />
      ) : null }
      { isSignSuccessModalOpened ? (
        <Modal
          allowClose={true}
          onClose={handleSignSuccessModalClose}
          className={s.successModal}
        >
          <div>
            <Text size={TextSize.h4} className='mb-20px'>Договор подписан</Text>
            <div className={s.successModalText}>
              В течение 5 (пяти) рабочих дней вы вправе отказаться от договора инвестирования,
              но не позднее дня завершения сбора инвестиций.
            </div>
            <div className='row justify-content-center'>
              <div className='col-4'>
                <Button size={ButtonSize.m} theme={ButtonTheme.black} onClick={handleSignSuccessModalClose}>
                  Ок
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null }
    </div>
  );
};
