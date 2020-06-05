/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'sortOptionsValidator', async: false })
export class SortOptionsValidator implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    if (typeof text !== 'string') {
      return false;
    }

    // Validating duplicated values
    const sortOptions = text.split(',');
    const fields = sortOptions.map(sortOption => sortOption.split('-')[0]);
    if (new Set(fields).size !== fields.length) {
      return false;
    }

    // Validating enum options
    return !sortOptions.some(sort => {
      if (!args.constraints.includes(sort)) {
        return true;
      }
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}: Debe ser una combinación válida de las siguientes opciones: ${args.constraints}`;
  }
}
