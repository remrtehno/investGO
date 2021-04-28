import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React from 'react';

import {socialNetworks} from 'src/components/pages/CompanyEditPage/CompanyEditForm/fields/SocialsField/SocialsField';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/contstants/Color';
import {CloseIcon} from 'src/icons/CloseIcon';
import {FacebookIcon} from 'src/icons/socials/FacebookIcon';
import {Instagram} from 'src/icons/socials/InstagramIcon';
import {LinkedIn} from 'src/icons/socials/LinkedIn';
import {TelegramIcon} from 'src/icons/socials/TelegramIcon';
import {TwitterIcon} from 'src/icons/socials/TwitterIcon';
import {VKIcon} from 'src/icons/socials/VKIcon';

import type {AddMemberForm} from './AddMemberForm';
import s from './TeamField.scss';

export declare namespace TeamMember {
  export type Props = {
    member: AddMemberForm.Values,
    className?: string,
    index: number,
    onRemove(index: number): void,
  }
}

export const TeamMember: FC<TeamMember.Props> = (props) => {
  const {member} = props;

  function handleRemoveClick() {
    props.onRemove(props.index);
  }

  return (
    <div
      className={cx(
        s.member,
        props.className
      )}
    >
      { member.logo_id ? (
        <div className={s.userpic} style={{backgroundImage: `url(${props.member.logo_id.url})`}} />
      ) : null }
      <div className={s.right}>
        <Text size={TextSize.body2} weight={TextWeight.semibold} className={s.name}>
          { member.full_name }
        </Text>
        <Text size={TextSize.body0} color={Color.label} className={s.post}>
          { member.position }
        </Text>
        { member.description ? (
          <Text size={TextSize.body0} className={s.expirience}>
            { member.description }
          </Text>
        ) : null }
        { !_.isEmpty(member.link) ? (
          <div className={s.memberSocials}>
            { Object.entries(member.link).map((entry, index) => {
              const network = entry[0];
              const link = entry[1];

              return (
                <a href={link} className={s.socialItem} key={index}>
                  { network === socialNetworks.vk ? (<VKIcon />) : null }
                  { network === socialNetworks.telegram ? (<TelegramIcon />) : null }
                  { network === socialNetworks.fb ? (<FacebookIcon />) : null }
                  { network === socialNetworks.linkedin ? (<LinkedIn />) : null }
                  { network === socialNetworks.twitter ? (<TwitterIcon />) : null }
                  { network === socialNetworks.instagram ? (<Instagram />) : null }
                </a>
              );
            }) }
          </div>
        ) : null }
      </div>
      <i className={s.closeButton} onClick={handleRemoveClick}><CloseIcon color={Color.black} /></i>
    </div>
  );
};
