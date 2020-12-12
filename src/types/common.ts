import {DetailedHTMLProps, HTMLAttributes} from "react";

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export enum RequestStatus {
  initial = 'initial',
  loading = 'loading',
  failed = 'failed',
  success = 'success',
}

export type RequestError = {
  code: string,
  message: string,
}
