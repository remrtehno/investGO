import type {DetailedHTMLProps, HTMLAttributes} from 'react';

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type InputProps = DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type SvgProps = DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement>;

export enum RequestStatus {
  initial = 'initial',
  loading = 'loading',
  failed = 'failed',
  success = 'success',
}

export type RequestError = any;
