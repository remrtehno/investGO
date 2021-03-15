import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Page} from 'src/components/common/Page';
import {withAuth} from 'src/components/hocs/withAuth';
import s from './BorrowerPage.scss'

export declare namespace BorrowerPage {
}

export const BorrowerPage = withAuth(() => {
  return (
    <Page>
      <div className={s.borrowerPage}></div>
    </Page>
  );
});