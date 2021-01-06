import _ from 'lodash';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useLatestRef} from 'src/hooks/useLatestRef';
import type {FilePrimitive} from 'src/types/FilePrimitive';
import {convertFileToBase64} from 'src/utils/convertFileToBase64';

type UseUploadFileOptions = {
    onProgress?(progress: number): void
};

type UploadFilePayload = {
    file: File,
}

export const useUploadFileApi = (options: UseUploadFileOptions = {}) => {
  const onProgressRef = useLatestRef(options.onProgress || _.noop);

  return useApi<UploadFilePayload, FilePrimitive | null>((
    payload
  ) => new Promise<FilePrimitive>(async(resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      onProgressRef.current(event.loaded / event.total);
    };

    xhr.withCredentials = true;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response).result);
        } else {
          reject(JSON.parse(xhr.response));
        }
      }
    };

    xhr.open('POST', `/api${api.common.uploadFile()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const data = await convertFileToBase64(payload.file);

    xhr.send(JSON.stringify({
      data,
      filename: payload.file.name,
    }));
  }), null);
};
