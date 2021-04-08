import type {FC} from 'react';
import React, {useState} from 'react';

import {Table} from 'src/components/common/Table';
import {DownloadIcon} from 'src/icons/DownloadIcon';
import {FilePdfIcon} from 'src/icons/files/FilePdfIcon';

import s from './LoanDocuments.scss';

declare namespace LoanDocuments {
  export type Props = {}
}

export const LoanDocuments: FC<LoanDocuments.Props> = (props) => {
  return (
    <Table>
      <tbody>
        <tr className={s.tableRow}>
          <td style={{width: '90%'}}>
            <FilePdfIcon className={s.fileIcon} />
            Договор займа
          </td>
          <td><a href='#'><DownloadIcon className={s.downloadIcon} /></a></td>
        </tr>
        <tr className={s.tableRow}>
          <td>
            <FilePdfIcon className={s.fileIcon} />
            Договор займа
          </td>
          <td><a href='#'><DownloadIcon className={s.downloadIcon} /></a></td>
        </tr>
        <tr className={s.tableRow}>
          <td>
            <FilePdfIcon className={s.fileIcon} />
            Договор займа
          </td>
          <td><a href='#'><DownloadIcon className={s.downloadIcon} /></a></td>
        </tr>
      </tbody>
    </Table>
  );
};
