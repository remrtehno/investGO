import {stringify} from 'query-string';

import {config} from 'src/config';

export type Options = Omit<RequestInit, 'body'> & {
    showNotifyOnError?: boolean,
    preventNotifyOn400?: boolean,
    query?: Record<string, any>,
    body?: Record<string, any> | string
}

export declare namespace useApiRequest {
  export type Request<TResponse = any> = (url: string, options: Options) => Promise<TResponse>
}

export const useApiRequest = () => {
  return async <TResponse = any>(url: string, options: Options): Promise<TResponse> => {
    const {showNotifyOnError = true, preventNotifyOn400, ...requestOptions} = options;
    const user = null;

    function getBody() {
      if (!options.body) {
        return undefined;
      }

      return typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    }

    const body = getBody();

    const query = options.query ? stringify(options.query, {
      skipNull: true,
      skipEmptyString: true,
    }) : undefined;

    try {
      requestOptions.mode = 'cors';
      requestOptions.credentials = 'include';
      requestOptions.headers = {
        'Content-Type': 'application/json',
      };


      const response = await fetch(`${config.apiBase}${url}${query ? `?${query}` : ''}`, {
        ...requestOptions,
        body,
      });

      if (!user && response.status === 403) {
        /*
         * showErrorNotify(
         *     intlCommon('sessionExpired'),
         *     intlCommon('signInAgain'),
         * );
         */
      }

      const responseJSON = await response.json();

      if (!responseJSON.status) {
        throw new Error('Incorrect API response');
      }

      if (response.status === 400 && showNotifyOnError && !preventNotifyOn400) {
        /*
         * showErrorNotify(
         *     intlCommon('error'),
         *     intlError(_get(responseJSON, 'result.0.message', 'error')),
         * );
         */
      }

      if (responseJSON.status !== 'ok') {
        throw responseJSON.result;
      }

      return responseJSON.result;
    } catch (err) {
      if (err && err.stack && showNotifyOnError) {
        /*
         * showErrorNotify(
         *     intlCommon('error'),
         *     intlError('something_wrong')
         * );
         */
      }

      throw err;
    }
  };
};
