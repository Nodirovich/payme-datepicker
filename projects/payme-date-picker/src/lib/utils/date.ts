import * as moment from 'moment';

export interface IGetDate {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export enum DateType {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date',
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
  MILLISECONDS = 'milliseconds',
}

export function getDate(value: string | number, options: DateType[]): IGetDate {
  const res: IGetDate = {};
  options.forEach((option: DateType) => {
    res[option] = moment(value).get(option);
  });
  return res;
}
