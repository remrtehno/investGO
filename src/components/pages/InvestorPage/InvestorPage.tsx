import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Page} from 'src/components/common/Page';
import {withAuth} from 'src/components/hocs/withAuth';
import s from './InvestorPage.scss'

export declare namespace InvestorPage {
}

export const InvestorPage = withAuth(() => {
  return (
    <Page>
      <div className={s.investorPage}></div>
    </Page>
  );
});