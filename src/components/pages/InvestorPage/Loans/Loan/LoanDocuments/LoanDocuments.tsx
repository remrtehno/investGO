import type {FC} from 'react';
import React, {useState} from 'react';

import {Table} from 'src/components/common/Table';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {Document2Icon} from 'src/icons/Document2Icon';
import {DownloadIcon} from 'src/icons/DownloadIcon';
import {FilePdfIcon} from 'src/icons/files/FilePdfIcon';
import {breackpointUp} from 'src/utils/breackpointUtils';

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
            { breackpointUp(adaptiveBreackpoints.md) ? (
              <FilePdfIcon className={s.fileIcon} />
            ) : (
              <Document2Icon className={s.fileIcon} />
            ) }
            Договор займа
          </td>
          <td>
            <a href='#'>
              <DownloadIcon className={s.downloadIcon} />
            </a>
          </td>
        </tr>
        <tr className={s.tableRow}>
          <td>
            { breackpointUp(adaptiveBreackpoints.md) ? (
              <FilePdfIcon className={s.fileIcon} />
            ) : (
              <Document2Icon className={s.fileIcon} />
            ) }
            Договор займа
          </td>
          <td>
            <a href='#'>
              <DownloadIcon className={s.downloadIcon} />
            </a>
          </td>
        </tr>
        <tr className={s.tableRow}>
          <td>
            { breackpointUp(adaptiveBreackpoints.md) ? (
              <FilePdfIcon className={s.fileIcon} />
            ) : (
              <Document2Icon className={s.fileIcon} />
            ) }
            Договор займа
          </td>
          <td>
            <a href='#'>
              <DownloadIcon className={s.downloadIcon} />
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
