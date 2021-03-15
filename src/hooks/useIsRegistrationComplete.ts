import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import _ from "lodash"

import {documentsAtom} from 'src/recoil/documentsAtom';
import type {User} from 'src/types/User';

export function useIsRegistrationComplete() {
  const {documents} = useRecoilValue(documentsAtom);

  return useMemo(() => {
    const investorAgreement = "investor_accession_agreement"
    const borrowerAgreement = "borrower_accession_agreement"
    
    const relevantDocs = _.filter(documents, (doc: User.SignDocuments): boolean => { 
      return doc.type === investorAgreement || doc.type === borrowerAgreement;
    });
    if (!relevantDocs.length) return false;

    const unsignedDocs = _.filter(relevantDocs, (doc: User.SignDocuments): boolean => { 
      return doc.status !== "signed"
    });
    if (unsignedDocs.length) return false;

    return true;
  }, [documents]);
}