/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const specialChars = '!#$%&()*+,-./:<=>?@[]^_{|}~';

@ValidatorConstraint({ name: 'typeSpecialValidator', async: false })
export class TypeSpecialValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (typeof text !== 'string') {
      return false;
    }
    for (const char of text.split('')) {
      if (!specialChars.includes(char)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `typeSpecial: Debe estar en ${specialChars}`;
  }
}
