import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';

import {Modal} from 'src/components/common/Modal/Modal';
import {Input} from 'src/components/ui/Input';
import {FacebookIcon} from 'src/icons/socials/FacebookIcon';
import {Instagram} from 'src/icons/socials/InstagramIcon';
import {LinkedIn} from 'src/icons/socials/LinkedIn';
import {TelegramIcon} from 'src/icons/socials/TelegramIcon';
import {TwitterIcon} from 'src/icons/socials/TwitterIcon';
import {VKIcon} from 'src/icons/socials/VKIcon';

import {socialNetworks} from './SocialsField';
import s from './SocialsField.scss';

export declare namespace SocialNetwork {
  export type Props = {
    network: socialNetworks,
    link: string,
    onChange(network: socialNetworks, value: string): void,
  };

  export type Values = {
    code: string,
  };
}

export const SocialNetwork: FC<SocialNetwork.Props> = (props) => {
  const network = props.network;
  const [isModalOpened, setIsModalOpened] = useState(false);

  function handleClick() {
    setIsModalOpened(true);
  }

  function handleClose() {
    setIsModalOpened(false);
  }

  function handleChange(value: string) {
    props.onChange(props.network, value);
  }

  return (
    <div
      className={cx(s.network, !props.link && s.inactive)}
      onClick={handleClick}
    >
      { network === socialNetworks.vk ? (<VKIcon />) : null }
      { network === socialNetworks.telegram ? (<TelegramIcon />) : null }
      { network === socialNetworks.fb ? (<FacebookIcon />) : null }
      { network === socialNetworks.linkedin ? (<LinkedIn />) : null }
      { network === socialNetworks.twitter ? (<TwitterIcon />) : null }
      { network === socialNetworks.instagram ? (<Instagram />) : null }

      { isModalOpened ? (
        <Modal
          className={s.modal}
          allowClose={true}
          onClose={handleClose}
        >
          <Input value={props.link} className={s.input} onChange={handleChange} />
        </Modal>
      ) : null }
    </div>

  );
};
