import {ValidationError} from "./error";


export const emailValidation = (email: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) === false) {
        throw new ValidationError('Invalid email');
    }
    return email
}
