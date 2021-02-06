import React, {FC} from 'react';
import {TimeIcon} from 'src/components/pages/ProfilePage/ProfileForms/forms/PassportForm/TimeIcon';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './ModerationInfo.scss';

export const ModerationInfo: FC = () => {
  return (
    <div className={s.ModerationInfo}>
      <TimeIcon className={s.moderationIcon} />
      <Text size={TextSize.body2}>
        Ожидайте. Ваши данные в обработке. Это может занять до 15 минут. Вы получите СМС после ее завершения проверки.
      </Text>
    </div>
  )
};
