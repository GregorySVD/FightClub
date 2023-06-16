import {ValidationError} from "../utils/error";
import {v4 as uuid} from "uuid";
import {passwordValidation} from "../utils/passwordValidation";
import {pool} from "../utils/db";


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
        if (userName.length < 3 || userName.length > 50) {
            throw new ValidationError(`User name must be at least 3 characters long and not longer than 50 characters. Your fighter name is ${userName.length} characters long.`)
        }

        passwordValidation(password); // Password validation

        this.id = id ?? uuid();
        this.userName = userName;
        this.email = emailValidation(email);
        this.password = password;
    }
    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `users` (`id`, `userName`, `email`, `password`) VALUES(:id, :userName," +
            " :email, :password)", {
            id: this.id,
            userName: this.userName,
            email: this.email,
            password: this.password,
        })
    }
}
// const Gregorian = new UserRecord({
//     userName: 'mis',
//     password: '12Asaf12a!',
//     email: 'gregorian@gmail.com'
// } as UserRecord);
