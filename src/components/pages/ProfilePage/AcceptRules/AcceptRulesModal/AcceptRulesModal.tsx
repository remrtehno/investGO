import React, {CSSProperties, FC, useEffect, useMemo, useState} from 'react';
import _ from 'lodash'
import {Text, TextSize} from 'src/components/ui/Text';
import s from '../AcceptRules.scss';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {SmsForm} from 'src/components/common/SmsForm';
import {useRecoilValue} from 'recoil';
import {userAtom} from 'src/recoil/userAtom';
import {documentsAtom} from 'src/recoil/documentsAtom';
import {Modal} from 'src/components/common/Modal/Modal';
import {Role} from 'src/contstants/Role';
import cx from 'classnames';
import {useSignDocs} from 'src/api/userApi/useSignDocs';
import {useSmsSignApi} from 'src/api/smsApi/useSmsSignApi';
import {useUserDocuments} from 'src/api/userApi/useUserDocuments';
import { User } from 'src/types/User';
import { useBorrowerAccessionAgreementApi } from 'src/api/userApi/useBorrowerAccessionAgreement';
import { useInvestorAccessionAgreementApi } from 'src/api/userApi/useInvestorAccessionAgreement';

const DocIcon: FC<{ style: CSSProperties }> = (props) => {
  return (
    <svg width="35" height="41" viewBox="0 0 35 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect y="0.605469" width="35" height="40" fill="black"/>
      <line x1="27.5117" y1="11.6055" x2="6.94608" y2="11.6055" stroke="white" strokeWidth="2"/>
      <line x1="27.5117" y1="20.4199" x2="6.94608" y2="20.4199" stroke="white" strokeWidth="2"/>
      <path d="M12.4844 29.2344L6.94387 29.2344" stroke="white" strokeWidth="2"/>
    </svg>
  )
}

export declare namespace AcceptRulesModal {
  export type Props = {
    onClose(): void,
  };
}

export const AcceptRulesModal: FC<AcceptRulesModal.Props> = (props) => {
  const { user } = useRecoilValue(userAtom);
  const { documents } = useRecoilValue(documentsAtom);
  const [isSmsModalOpened, setIsSmsModalOpened] = useState(false);
  const [, signDocsApi, signDocsApiResult] = useSignDocs();
  const [, smsSignApi] = useSmsSignApi();
  const [, borrowerAccessionAgreementApi, borrowerAccessionAgreementApiResult] = useBorrowerAccessionAgreementApi();
  const [, investorAccessionAgreementApi, investorAccessionAgreementApiResult] = useInvestorAccessionAgreementApi();
  const [borrowerDocLoading, setBorrowerDocLoading] = useState(false);
  const [investorDocLoading, setInvestorDocLoading] = useState(false);
  const [, getSignDocuments] = useUserDocuments();

  const borrowerAccessionAgreement = useMemo(() => {
    return _.find(documents, (doc: User.SignDocuments): boolean => { 
      return doc.type === "borrower_accession_agreement";
    })
  }, [documents]) 

  const investorAccessionAgreement = useMemo(() => {
    return _.find(documents, (doc: User.SignDocuments): boolean => { 
      return doc.type === "investor_accession_agreement";
    })
  }, [documents]) 

  useEffect(() => {
    if (user?.roles.includes(Role.borrower) && !borrowerAccessionAgreement) {
      borrowerAccessionAgreementApi(null)
      setTimeout(() => {
        setBorrowerDocLoading(true)
      }, 10);
    }
  }, [])

  useEffect(() => {
    if (user?.roles.includes(Role.investor) && !investorAccessionAgreement) {
      investorAccessionAgreementApi(null)
      setTimeout(() => {
        setInvestorDocLoading(true)
      }, 10);
    }
  }, [])

  useEffect(() => {
    if (borrowerAccessionAgreementApiResult.isSuccess) {
      getSignDocuments(null);
      setBorrowerDocLoading(false)
    }
  }, [borrowerAccessionAgreementApiResult.isSuccess])

  useEffect(() => {
    if (investorAccessionAgreementApiResult.isSuccess) {
      setInvestorDocLoading(false)
      getSignDocuments(null);
    }
  }, [investorAccessionAgreementApiResult.isSuccess])

  function handleButtonClick() {
    setIsSmsModalOpened(true);
    if (user?.roles.includes(Role.borrower)) {
      smsSignApi({
        entity_id: borrowerAccessionAgreement?.uuid as string,
        entity_type: borrowerAccessionAgreement?.type as string
      })
    } 
    if (user?.roles.includes(Role.investor)) {
      smsSignApi({
        entity_id: investorAccessionAgreement?.uuid as string,
        entity_type: investorAccessionAgreement?.type as string
      })
    } 
  }

  useEffect(() => {
    setIsSmsModalOpened(false);
  }, [signDocsApiResult.isSuccess])

  useEffect(() => {
    setIsSmsModalOpened(false);
  }, [signDocsApiResult.error])

  const isButtonDisabled = useMemo(():boolean => {
    if (user?.roles.includes(Role.investor) && !investorAccessionAgreement) return true;
    if (user?.roles.includes(Role.borrower) && !borrowerAccessionAgreement) return true;
    return false;
  }, [documents])

  if (!user) {
    return null;
  }

  return (
    <Modal width={700} allowClose={true} onClose={props.onClose}>
      <div className='container'>
        <div className={s.modalTitle}>Присоединение к правилам</div>
        <Text style={{ marginBottom: 60 }} size={TextSize.body2}>Ознакомьтесь с документами, сформированными на основе данных, указанных в вашем
          профиле, и нажмите кнопку  "Подписать".
        </Text>
        <div className='row'>
          { user.roles.includes(Role.borrower) && (borrowerDocLoading || !borrowerAccessionAgreement) ? (
            <span style={{ display: 'flex' }} className={cx('col-6', s.link)}>
              <DocIcon style={{ minWidth: 35, marginRight: 20 }}/>
              <Text size={TextSize.body2}>Подождите, документ формируется...</Text>
            </span>
          ) : null }
          { user.roles.includes(Role.borrower) && !borrowerDocLoading && borrowerAccessionAgreement ? (
            <a
              href={borrowerAccessionAgreement?.file.url}
              target='_blank'
              style={{ display: 'flex', textDecoration: 'none' }}
              className={cx('col-6', s.link)}
            >
              <DocIcon style={{ minWidth: 35, marginRight: 20 }}/>
              <Text size={TextSize.body2}>Договор на оказание Оператором Платформы услуг по привлечению инвестиций</Text>
            </a>
          ) : null }
          { user.roles.includes(Role.investor) && (investorDocLoading || !investorAccessionAgreement) ? (
            <span style={{ display: 'flex' }} className={cx('col-6', s.link)}>
              <DocIcon style={{ minWidth: 35, marginRight: 20 }}/>
              <Text size={TextSize.body2}>Подождите, документ формируется...</Text>
            </span>
          ) : null }
          { user.roles.includes(Role.investor) && !investorDocLoading && investorAccessionAgreement ? (
            <a
              href={investorAccessionAgreement?.file.url}
              target='_blank'
              style={{ display: 'flex', textDecoration: 'none' }}
              className={cx('col-6', s.link)}
            >
              <DocIcon style={{ minWidth: 35, marginRight: 20 }}/>
              <Text size={TextSize.body2}>Договор на оказание Оператором Платформы услуг по содействию в инвестировании</Text>
            </a>
          ) : null }
        </div>
        <div className='row' style={{ marginTop: 60 }}>
          <Button
            className='col-4'
            size={ButtonSize.m}
            theme={ButtonTheme.black}
            onClick={handleButtonClick}
            disabled={isButtonDisabled}
          >Подписать</Button>
        </div>
        { isSmsModalOpened ? (
          <SmsForm
            phone={user.phone}
            onConfirm={(code: string) => {
              setIsSmsModalOpened(false);
              signDocsApi({code: parseInt(code)});
            }}
            onClose={() => setIsSmsModalOpened(false)}
            onCodeEnter={(code: string) => {
              signDocsApi({code: parseInt(code)});
            }}
          />
        ) : null }
      </div>
    </Modal>
  );
}
