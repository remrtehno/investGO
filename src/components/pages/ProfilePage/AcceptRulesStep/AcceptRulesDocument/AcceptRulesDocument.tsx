import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';

import {useSmsSignApi} from 'src/api/smsApi/useSmsSignApi';
import {useBorrowerAccessionAgreementApi} from 'src/api/userApi/useBorrowerAccessionAgreement';
import {useInvestorAccessionAgreementApi} from 'src/api/userApi/useInvestorAccessionAgreement';
import {useSignDocs} from 'src/api/userApi/useSignDocs';
import {useUserDocuments} from 'src/api/userApi/useUserDocuments';
import {SmsForm} from 'src/components/common/SmsForm';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import type {User} from 'src/types/User';

import s from './AcceptRulesDocument.scss';

const DocIcon: FC = (props) => {
  return (
    <svg width='35' height='41' viewBox='0 0 35 41' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect y='0.605469' width='35' height='40' fill='black' />
      <line x1='27.5117' y1='11.6055' x2='6.94608' y2='11.6055' stroke='white' strokeWidth='2' />
      <line x1='27.5117' y1='20.4199' x2='6.94608' y2='20.4199' stroke='white' strokeWidth='2' />
      <path d='M12.4844 29.2344L6.94387 29.2344' stroke='white' strokeWidth='2' />
    </svg>
  );
};

export declare namespace AcceptRulesDocument {
  export type Props = {
    document?: User.SignDocuments,
    type: string,
    name: string,
  };
}

export const AcceptRulesDocument: FC<AcceptRulesDocument.Props> = (props) => {
  const [loading, setLoading] = useState(!props.document);
  const [, borrowerAccessionAgreementApi, borrowerAccessionAgreementApiResult] = useBorrowerAccessionAgreementApi();
  const [, investorAccessionAgreementApi, investorAccessionAgreementApiResult] = useInvestorAccessionAgreementApi();
  const [, getSignDocuments] = useUserDocuments();
  const [, smsSignApi] = useSmsSignApi();
  const [isSmsModalOpened, setIsSmsModalOpened] = useState(false);
  const [smsCodeError, setSmsCodeError] = useState('');
  const [, signDocsApi, signDocsApiState] = useSignDocs(props.type);

  useEffect(() => {
    if (!props.document) {
      if (props.type === 'borrower_accession_agreement') {
        borrowerAccessionAgreementApi(null);
      }
      if (props.type === 'investor_accession_agreement') {
        investorAccessionAgreementApi(null);
      }
    }
  }, []);

  useEffect(() => {
    if (borrowerAccessionAgreementApiResult.isSuccess) {
      getSignDocuments(null);
      setLoading(false);
    }
  }, [borrowerAccessionAgreementApiResult.isSuccess]);

  useEffect(() => {
    if (investorAccessionAgreementApiResult.isSuccess) {
      setLoading(false);
      getSignDocuments(null);
    }
  }, [investorAccessionAgreementApiResult.isSuccess]);

  function getCode() {
    setSmsCodeError('');
    setIsSmsModalOpened(true);
    smsSignApi({
      entity_id: props.document?.uuid as string,
      entity_type: props.document?.type as string,
    });
  }

  useEffect(() => {
    setIsSmsModalOpened(false);
    setSmsCodeError('');
  }, [signDocsApiState.isSuccess]);

  useEffect(() => {
    setSmsCodeError('Неверный код подтверждения');
  }, [signDocsApiState.error]);

  function sign(code: string) {
    signDocsApi({code: parseInt(code, 10)});
  }

  return (
    <div className={cx('col-sm-12 col-md-6', s.document)}>
      <a
        href={props.document?.file?.url}
        target='_blank'
        style={{display: 'flex', textDecoration: 'none'}}
        className={cx(s.link)}
      >
        <DocIcon />
        { !loading && props.document
          && <Text size={TextSize.body2}>
            { props.name }
          </Text>
        }
        { (loading || !props.document)
          && <Text size={TextSize.body2}>Подождите, документ формируется...</Text>
        }
      </a>
      <div className={s.docButton}>
        { !loading && props.document?.status === 'signed'
          && <span>Документ подписан</span>
        }
        { !loading && props.document?.status !== 'signed'
          && <Button
            className='col-sm-6 col-md-5 col-lg-4'
            size={ButtonSize.m}
            theme={ButtonTheme.black}
            onClick={getCode}
            disabled={!props.document}
          >Подписать</Button>
        }
      </div>
      { isSmsModalOpened ? (
        <SmsForm
          error={smsCodeError}
          onClose={() => {
            setSmsCodeError('');
            setIsSmsModalOpened(false);
          }}
          onCodeEnter={sign}
          onCodeResend={getCode}
        />
      ) : null }
    </div>
  );
};
