import type {FC} from 'react';
import React, {useState} from 'react';

import type {useGetPortfolioProjects} from 'src/api/investorApi/useGetPortfolioProjectsApi';
import {Table} from 'src/components/common/Table';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {Document2Icon} from 'src/icons/Document2Icon';
import {DownloadIcon} from 'src/icons/DownloadIcon';
import {FilePdfIcon} from 'src/icons/files/FilePdfIcon';
import {breackpointUp} from 'src/utils/breackpointUtils';

import s from './LoanDocuments.scss';

declare namespace LoanDocuments {
  export type Props = {
    project: useGetPortfolioProjects.PortfolioProject
  }
}

export const LoanDocuments: FC<LoanDocuments.Props> = (props) => {
  const {project} = props;
  if (!project) {
    return null;
  }

  return (
    <Table>
      <tbody>
        { project.documents.map((document, index) => {
          return (
            <tr className={s.tableRow} key={index}>
              <td style={{width: '90%'}}>
                { breackpointUp(adaptiveBreackpoints.md) ? (
                  <FilePdfIcon className={s.fileIcon} />
                ) : (
                  <Document2Icon className={s.fileIcon} />
                ) }
                { document.original_name }
              </td>
              <td>
                <a href={document.url} target='_blank'>
                  <DownloadIcon className={s.downloadIcon} />
                </a>
              </td>
            </tr>
          );
        }) }
      </tbody>
    </Table>
  );
};
