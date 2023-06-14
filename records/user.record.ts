import {ValidationError} from "../utils/error";
import {v4 as uuid} from "uuid";


const emailValidation = (email: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) === false) {
        throw new ValidationError('Invalid email');
    }
    return email
}

console.log(emailValidation('grzegrz@gmail.com'));


// export class UserRecord {
//     public id?: string;
//     public readonly userName: string;
//     public readonly email: string;
//     public readonly password: string;
//     public readonly isLoggedIn: boolean;
//     public readonly age: number;
//
//     constructor(obj: UserRecord) {
//         const {id, email, password, isLoggedIn, age, userName} = obj;
//         if (userName.length <3 && userName >50) {
//             throw new ValidationError(`User name must be at least 3 characters long and not longer than 50 characters. Your fighter name is ${userName.length} characters long.`)
//         }
//
//
//         this.id = id ?? uuid();
//     }
//
//
// }
