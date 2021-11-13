import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import { UserRole } from 'src/user/user-role.enum';

export function IsRoleExist(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRoleExistConstraint,
        });
    };
}

@ValidatorConstraint({async: true})
export class IsRoleExistConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        return value in UserRole ? true : false;
    }

}