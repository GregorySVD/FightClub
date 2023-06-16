import {ValidationError} from "./error";

export const passwordValidation = (password: string): string => {
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*()\-=_+[\]{}|\\,.<>/?]/;


// Check if the password meets the criteria
    if (password.length < 8 || password.length > 255) {
        throw new ValidationError(`password must be at least 8 characters long and not longer than 50 characters. Your fighter name is ${password.length} characters long.`)
    }
    if (uppercasePattern.test(password) === false) {
        throw new ValidationError(`Your password needs to have at least one Uppercase character (A-Z).`);
    }
    if (lowercasePattern.test(password) === false) {
        throw new ValidationError(`Your password needs to have at least one Lowercase character (a-z).`);
    }
    if (numberPattern.test(password)===false) {
        throw new ValidationError(`Your password needs to have at least one number (0-9)`);
    }
    if (specialCharPattern.test(password) === false) {
       throw new ValidationError(`Your password needs to have at least one special character (!@#$%^&*()-=_+[]{}|,.<>/?)`) ;
    }


// Return password if all criteria are met, otherwise return ValidationError
    return password;
}
