import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import type {useCreateInvestAgreementApi} from 'src/api/investorApi/useCreateInvestAgreementApi';
import {Modal} from 'src/components/common/Modal/Modal';
import {BalanceForm} from 'src/components/pages/InvestOfferPage/BalanceForm';
import {InvestAgreementForm} from 'src/components/pages/InvestOfferPage/InvestAgreementForm';
import {SignInvestAgreementForm} from 'src/components/pages/InvestOfferPage/SignInvestAgreementForm';
import {LoanConditions} from 'src/components/pages/LoanRequestPage/LoanDetails/LoanConditions';
import {LoanDocuments} from 'src/components/pages/LoanRequestPage/LoanDetails/LoanDocuments';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import {WarningIcon} from 'src/icons/WarningIcon';
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
  const [investAgreement, setInvestAgreement] = useState(null as useCreateInvestAgreementApi.Response | null);
  const [isLowBalanceModalOpened, setIsLowBalanceModalOpened] = useState(false);
  const [isBalanceFormOpened, setIsBalanceFormOpened] = useState(false);

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

  function handleInvesAgreementSuccess(investAgreement: useCreateInvestAgreementApi.Response) {
    setInvestAgreement(investAgreement);
  }

  function cancelAgreement() {
    setInvestAgreement(null);
  }

  function handleSignInvestAgreement() {
    setIsInvestModalOpened(false);
    setIsSignSuccessModalOpened(true);
    setInvestAgreement(null);
    props.onSignInvestAgreement();
  }

  function handleSignSuccessModalClose() {
    setIsSignSuccessModalOpened(false);
  }

  function handleLowBalanceError() {
    setIsInvestModalOpened(false);
    setIsLowBalanceModalOpened(true);
  }

  function handleLowBalanceModalClose() {
    setIsLowBalanceModalOpened(false);
  }

  function handleLowBalanceClick() {
    setIsLowBalanceModalOpened(false);
    setIsBalanceFormOpened(true);
  }

  function handleBalanceFormClose() {
    setIsBalanceFormOpened(false);
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
        <Modal className={s.investModal} allowClose={true} onClose={handleInvestModalClose}>
          { !investAgreement ? (
            <InvestAgreementForm
              loan={loan}
              onSuccess={handleInvesAgreementSuccess}
              onLowBalanceError={handleLowBalanceError}
            />
          ) : null }
          { investAgreement ? (
            <SignInvestAgreementForm
              loan={loan}
              agreement={investAgreement}
              onSignInvestAgreement={handleSignInvestAgreement}
              onBack={cancelAgreement}
            />
          ) : null }
        </Modal>
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
      { isLowBalanceModalOpened ? (
        <Modal
          allowClose={true}
          onClose={handleLowBalanceModalClose}
          className={s.errorModal}
        >
          <div className={cx(s.errorModalInner, 'text-center')}>
            <WarningIcon />
            <div className='mt-3'>
              На вашем счете недостаточно средств для инвестирования
              данного проекта.
            </div>
            <div className='row justify-content-center mt-20px'>
              <div className='col-5'>
                <Button
                  size={ButtonSize.s}
                  theme={ButtonTheme.black}
                  onClick={handleLowBalanceClick}
                >
                  Пополнить счет
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null }
      { isBalanceFormOpened ? (
        <Modal
          allowClose={true}
          onClose={handleBalanceFormClose}
          className={s.balanceModal}
        >
          <BalanceForm />
        </Modal>
      ) : null }
    </div>
  );
};
