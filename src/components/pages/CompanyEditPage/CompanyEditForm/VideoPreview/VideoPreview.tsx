import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import s from './VideoPreview.scss';

export declare namespace VideoPreview {
  export type Props = {
    videoLink: string
  }
}

export const VideoPreview: FC<VideoPreview.Props> = (props) => {
  const isYoutube = props.videoLink.includes('youtube.com');
  const isVimeo = props.videoLink.includes('vimeo.com');

  function getVideoId() {
    let videoId = null;
    if (isYoutube) {
      const param = props.videoLink.split('=')[1];
      videoId = param.split('&')[0];
    }
    if (isVimeo) {
      const param = props.videoLink.split('vimeo.com/')[1];
      videoId = param.split('/')[0];
    }
    return videoId;
  }

  const videoId = getVideoId();

  if (!videoId) {
    return null;
  }

  return (
    <div className={cx('col-12', s.videoPreview)}>
      { isYoutube ? (
        <iframe width='360' height='200' src={`https://www.youtube.com/embed/${videoId}`} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true} />
      ) : null }
      { isVimeo ? (
        <iframe src={`https://player.vimeo.com/video/${videoId}`} width='360' height='200' frameBorder='0' allow='autoplay; fullscreen; picture-in-picture' allowFullScreen={true} />
      ) : null }
    </div>
  );
};
