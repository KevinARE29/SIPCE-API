export const validator = {
  isNotEmpty: '$property: No debe ser nulo',
  isEmail: '$property: Debe ser un email válido (i.e. user@mail.com)',
  isString: '$property: Debe ser una cadena de carecteres',
  isInt: '$property: Debe ser un número entero',
  isPositive: '$property: Debe ser un entero positivo',
  isJwt: '$property: Debe ser un JSON Web Token válido',
  isBoolean: '$property: Debe ser un booleano',
  isMin: '$property: Debe ser mayor o igual a $constraint1',
  isMax: '$property: Debe ser menor o igual a $constraint1',
  isDateString: '$property: Debe ser una fecha en ISOString',
};
