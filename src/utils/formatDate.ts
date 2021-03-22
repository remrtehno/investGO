import moment from 'moment';

export function formatDateForServer(date: Date) {
  return moment(date).format('YYYY-MM-DD');
}

export function formatDate(date: Date) {
  return moment(date).format('DD.MM.YY');
}
