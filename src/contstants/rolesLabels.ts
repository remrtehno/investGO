import {Role} from './Role';

export const roleLabels: Record<Role, string> = {
  [Role.fl]: 'Физическое лицо',
  [Role.ip]: 'Индивидуальный предприниматель',
  [Role.ur]: 'Юридическое лицо',
  [Role.investor]: 'Инвестор',
  [Role.borrower]: 'Заемщик',
};
