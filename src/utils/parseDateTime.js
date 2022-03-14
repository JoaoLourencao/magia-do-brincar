import moment from 'moment';

export function convertDateTime(date) {
  return moment(date).format('DD/MM/YYYY, hh:mm:ss a');
}
