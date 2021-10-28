import { Pipe, PipeTransform } from '@angular/core';

export interface IErrorMessage {
  [key: string]: string;
}

export const ErrorMessages: IErrorMessage = {
  required: 'Обязательное поле',
  email: 'Email некорректен',
  phone: 'Телефон должен быть 9XXXXXXXXXXX',
  mismatch: 'Пароли не совпадают',
  pattern: 'Некорректно',
  number: 'Допустимы только цифры',
};

@Pipe({ name: 'controlErrors' })
export class ControlErrosPipe implements PipeTransform {
  transform(errors: any): string[] {
    if (errors) {
      return Object.keys(errors).map((key: string) => ErrorMessages[key]);
    }
    return [];
  }
}
