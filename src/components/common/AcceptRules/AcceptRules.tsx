import React from 'react';
import {Text, TextSize} from 'src/components/ui/Text';
import {useRecoilValue} from 'recoil';
import {userAtom} from 'src/recoil/userAtom';
import {Role} from 'src/contstants/Role';
import {roleLabels} from 'src/contstants/rolesLabels';

export declare namespace AcceptRules {
  export type Props = {};
}

export function AcceptRules(props: AcceptRules.Props) {
  const { user } = useRecoilValue(userAtom);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Text size={TextSize.tabMenu}>
          { user.roles.includes(Role.borrower) ? roleLabels[Role.borrower] : roleLabels[Role.investor] }
        </Text>
        <Text size={TextSize.tabMenu}>
          { (function() {
            if (user.roles.includes(Role.ur)) {
              return roleLabels[Role.ur];
            }

            if (user.roles.includes(Role.fl)) {
              return roleLabels[Role.fl];
            }

            return roleLabels.ip;
          })() }
        </Text>
      </div>
    </div>
  );
}
