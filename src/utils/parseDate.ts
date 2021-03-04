import moment from 'moment';

export function parseDate(date: string) {
  return moment(date, 'YYYY-MM-DD').toDate();
}
