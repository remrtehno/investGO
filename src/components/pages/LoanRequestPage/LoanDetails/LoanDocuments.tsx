import cx from 'classnames';
import type {FC} from 'react';
import React, {Fragment} from 'react';

import {Table} from 'src/components/common/Table';
import {Text, TextSize} from 'src/components/ui/Text';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {Document2Icon} from 'src/icons/Document2Icon';
import {DownloadIcon} from 'src/icons/DownloadIcon';
import {FilePdfIcon} from 'src/icons/files/FilePdfIcon';
import type {Borrower} from 'src/types/Borrower';
import {breackpointUp} from 'src/utils/breackpointUtils';
import {downloadFile} from 'src/utils/downloadFile';

import s from './LoanDetails.scss';

export declare namespace LoanDocuments {
  export type Props = {
    loan: Borrower.LoanDetails
  };
}

export const LoanDocuments: FC<LoanDocuments.Props> = (props) => {
  const {loan} = props;

  function downLoadAll() {
    loan.documents.forEach((document) => {
      downloadFile(document.url);
    });
  }

  return (
    <Fragment>
      <Table>
        <tbody>
          { loan.documents.map((document, index) => {
            return (
              <tr key={index} className={s.docTableRow}>
                <td className='ps-0'>
                  { breackpointUp(adaptiveBreackpoints.md) ? (
                    <FilePdfIcon className={s.fileIcon} />
                  ) : (
                    <Document2Icon className={s.fileIcon} />
                  ) }
                  { document.original_name }
                </td>
                <td className='text-end'>
                  <a target='_blank' href={document.url}>
                    <DownloadIcon className={s.downloadIcon} />
                  </a>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </Table>
      <Text size={TextSize.tabMenu} className={cx(s.downloadAll, 'text-end')}>
        <span onClick={downLoadAll}>Скачать все</span>
      </Text>
    </Fragment>
  );
};
