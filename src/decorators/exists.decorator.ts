import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}

@ValidatorConstraint({async: true})
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        return User.findOne({
            where: {email: value}
        }).then(user => {
            if(user) return false;
            return true;
        });
    }

}