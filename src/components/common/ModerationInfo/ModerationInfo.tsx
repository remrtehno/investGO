import React, {FC} from 'react';
import {TimeIcon} from 'src/components/pages/ProfilePage/ProfileForms/forms/PassportForm/TimeIcon';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './ModerationInfo.scss';

export const ModerationInfo: FC = () => {
  return (
    <div className={s.ModerationInfo}>
      <TimeIcon className={s.moderationIcon} />
      <Text size={TextSize.body2}>
        Ваши данные отправлены на проверку. Информация о статусе проверки будет отправлена на ваш электронный адрес.
      </Text>
    </div>
  )
};
