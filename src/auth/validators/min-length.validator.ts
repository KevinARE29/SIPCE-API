/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'minLengthValidator', async: false })
export class MinLengthValidator implements ValidatorConstraintInterface {
  validate(minLength: any, args: ValidationArguments) {
    if (typeof minLength !== 'number') {
      return false;
    }
    if (!( minLength == 0||minLength >= 6)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `minLength: Debe ser entero  mayor o igual  a 6`;
  }
}
