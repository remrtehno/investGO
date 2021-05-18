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
import {TextWeight} from 'src/components/ui/Text/Text';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import type {Borrower} from 'src/types/Borrower';
import {formatNumber} from 'src/utils/formatNumber';

import s from './ProjectDetails.scss';

export declare namespace ProjectDetails {
  export type Props = {
    loan: Borrower.LoanDetails,
  };
}

export const ProjectDetails: FC<ProjectDetails.Props> = (props) => {
  const {loan} = props;

  return (
    <div className={s.projectDetails}>
      <div className={s.section}>
        <Text size={TextSize.h2} className={s.header}>Карточка компании</Text>
        <div className={s.company}>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              Компания:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower.name }
            </Text>
          </div>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              ИНН / ОРГН:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower.inn } / { loan.borrower.ogrn }
            </Text>
          </div>

          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              Адрес местонахождения:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower.place }
            </Text>
          </div>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              Почтовый адрес:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower.postal_address }
            </Text>
          </div>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              Email:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower?.emails?.map((email, index) => {
                return (
                  <div key={index}>
                    <a href={`mailto:${email}`}>{ email }</a>
                  </div>
                );
              }) }
            </Text>
          </div>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              { loan.borrower?.phones?.length > 1 ? (<span>Телефоны:</span>) : <span>Телефон:</span> }
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower?.phones?.map((phone, index) => {
                return (
                  <div key={index}>
                    { phone }
                  </div>
                );
              }) }
            </Text>
          </div>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              Генеральный директор:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.borrower.director }
            </Text>
          </div>
          <div className={cx('row', s.companyRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-4'>
              Учредители/доли владения:
            </Text>
            <Text size={TextSize.body2} className='col-8'>
              { loan.founders?.map((founder, index) => {
                return (
                  <div key={index}>
                    { founder.name } / { founder.percent }
                  </div>
                );
              }) }
            </Text>
          </div>

        </div>
      </div>
      <div className={s.section}>
        <Text size={TextSize.h2} className={s.header}>Описание</Text>
        <div>{ loan.project.description }</div>
      </div>
      <div className={s.section}>
        <Text size={TextSize.h2} className={s.header}>Контактные данные</Text>
        <div className={s.contacts}>
          <div className={cx('row', s.contactsRow)}>
            <Text size={TextSize.body2} weight={TextWeight.semibold} className='col-5'>
              Сайт:
            </Text>
            <Text size={TextSize.body2} className='col-7'>
              { loan.project.site }
            </Text>
          </div>
        </div>
      </div>
      <div className={s.section}>
        <Text size={TextSize.h2} className={s.header}>Документы</Text>
        <div className={s.documents}>
          { loan.borrower?.document_rule_file ? (
            <div className={cx(s.contactsRow)}>
              <Text size={TextSize.body2} className='col-7'>
                <DocumentIcon />&nbsp;&nbsp;
                <a href={loan.borrower?.document_rule_file?.url} target='_blank'>{ loan.borrower?.document_rule_file?.original_name }</a>
              </Text>
            </div>
          ) : null }
          { loan.borrower?.document_registry_file ? (
            <div className={cx(s.contactsRow)}>
              <Text size={TextSize.body2} className='col-7'>
                <DocumentIcon />&nbsp;&nbsp;
                <a href={loan.borrower?.document_registry_file?.url} target='_blank'>{ loan.borrower?.document_registry_file?.original_name }</a>
              </Text>
            </div>
          ) : null }
          { loan.documents?.map((document, index) => {
            return (
              <div className={cx(s.contactsRow)} key={index}>
                <Text size={TextSize.body2} className='col-7'>
                  <DocumentIcon />&nbsp;&nbsp;
                  <a href={document.url} target='_blank'>{ document.original_name }</a>
                </Text>
              </div>
            );
          }) }
        </div>
      </div>
    </div>
  );
};
