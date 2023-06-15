import {ValidationError} from "../utils/error";
import {v4 as uuid} from "uuid";


const emailValidation = (email: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) === false) {
        throw new ValidationError('Invalid email');
    }
    return email
}


export class UserRecord {
    public id?: string;
    public readonly userName: string;
    public readonly email: string;
    public readonly password: string;

    constructor(obj: UserRecord) {
        const {id, email, password, userName} = obj;
        if (userName.length < 3 && userName.length > 50) {
            throw new ValidationError(`User name must be at least 3 characters long and not longer than 50 characters. Your fighter name is ${userName.length} characters long.`)
        }
        if (password.length < 3 && password.length > 50) {
            throw new ValidationError(`password must be at least 3 characters long and not longer than 50 characters. Your fighter name is ${password.length} characters long.`)
        }


        this.id = id ?? uuid();
        this.userName = userName;
        this.email = emailValidation(email);
        this.password = password;
    }
}
const Gregorian = new UserRecord({
    userName: 'Gregorian',
    password: '12',
    email: 'gregorian@gmail.com'
} as UserRecord);

console.log(Gregorian)
