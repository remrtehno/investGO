import _ from 'lodash';
import type {FC} from 'react';
import {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal: FC = (props) => {
  const elRef = useRef<HTMLDivElement | null>(typeof document !== 'undefined' ? document.createElement('div')
    : null);

  const rootRef = useRef<HTMLElement | null>(typeof document !== 'undefined'
    ? document.getElementById('modal-root')
    : null);

  useEffect(() => {
    if (!rootRef.current || !elRef.current) {
      return _.noop;
    }

    rootRef.current.appendChild(elRef.current);

    return () => {
      if (!rootRef.current || !elRef.current) {
        return;
      }
      rootRef.current.removeChild(elRef.current);
    };
  }, []);

  if (!elRef.current) {
    return null;
  }

  return ReactDOM.createPortal(props.children, elRef.current);
};
