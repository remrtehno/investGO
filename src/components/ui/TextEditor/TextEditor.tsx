import {Editor, EditorState} from 'draft-js';
import type {FC} from 'react';
import React from 'react';
import { Color } from 'src/contstants/Color';
import cx from 'classnames'

import 'src/libs/Draft.css';
import { Text, TextSize } from '../Text/Text';
import s from './TextEditor.scss';
import { TButtonIcon } from 'src/icons/editor/TButtonIcon';
import { ImgIcon } from 'src/icons/editor/ImgIcon';
import { LinkIcon } from 'src/icons/LinkIcon';


export declare namespace TextEditor {
  export type Props = {
    label?: string
  };
}

export const TextEditor: FC<TextEditor.Props> = (props) => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty()
  );

  return (
    <div className={s.wrapper}>
      <Text
        className={s.label}
        size={ TextSize.caption1}
        color={Color.gray4}
      >
        {props.label}
      </Text>
      <div className={s.menu}>
        <span className={s.button}><TButtonIcon /></span>
        <span className={s.separator} />
        <span className={s.button}><ImgIcon /></span>
        <span className={s.button}><LinkIcon /></span>
      </div>
      <div className={s.editor}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};
