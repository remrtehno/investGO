import cx from 'classnames';
import type {FC} from 'react';
import React, {Fragment, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {Table} from 'src/components/common/Table';
import {InvestModal} from 'src/components/pages/InvestOfferPage/InvestModal';
import {LoanConditions} from 'src/components/pages/LoanRequestPage/LoanDetails/LoanConditions';
import {LoanDocuments} from 'src/components/pages/LoanRequestPage/LoanDetails/LoanDocuments';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {LoanModerationStatus} from 'src/contstants/ModerationStatus';
import {Role} from 'src/contstants/Role';
import {Document2Icon} from 'src/icons/Document2Icon';
import {DownloadIcon} from 'src/icons/DownloadIcon';
import {FilePdfIcon} from 'src/icons/files/FilePdfIcon';
import {userAtom} from 'src/recoil/userAtom';
import type {Borrower} from 'src/types/Borrower';
import {breackpointUp} from 'src/utils/breackpointUtils';
import {formatDate} from 'src/utils/formatDate';
import {formatNumber} from 'src/utils/formatNumber';
import {plural} from 'src/utils/plural';

import s from './OfferDetails.scss';

export declare namespace OfferDetails {
  export type Props = {
    loan: Borrower.LoanDetails
  };
}

export const OfferDetails: FC<OfferDetails.Props> = (props) => {
  const {loan} = props;
  const {user} = useRecoilValue(userAtom);
  const company = user?.company;
  const [activeTab, setActiveTab] = useState('1');
  const [isInvestModalOpened, setIsInvestModalOpened] = useState(false);

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
        <InvestModal loan={loan} onClose={handleInvestModalClose} />
      ) : null }
    </div>
  );
};
