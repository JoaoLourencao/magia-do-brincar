import moment from 'moment';

export function age(date) {
  let age = moment(date).fromNow()
  let split = age.split(' ')
  age = age.replace('years ago', split[0] > 1 ? 'anos' : 'ano')
  return age;
}
