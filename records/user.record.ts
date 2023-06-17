import {ValidationError} from "../utils/error";
import {v4 as uuid} from "uuid";
import {passwordValidation} from "../utils/passwordValidation";
import {pool} from "../utils/db";
import {emailValidation} from "../utils/emailValidation";
import {FieldPacket} from "mysql2";

type UserRecordResult = [UserRecord[], FieldPacket[]];


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
        emailValidation(email)      // Email validation
        this.id = id ?? uuid();
        this.userName = userName;
        this.email = email;
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
        return this.id;
    }
    static async getOneUser(id: string): Promise<UserRecord> | null {
        const [result] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id,
        }) as UserRecordResult;
        return result.length === 0 ? null : new UserRecord(result[0])
    }
}



// (async () => {
//     const test =await UserRecord.getOneUser('71059da8-5b14-4642-9a36-489b321631ac');
//     await console.log(test);
// })()
// const userTest = new UserRecord({
//     userName: 'test2',
//     password: '12Asaf12a!',
//     email: 'gregorian2@gmail.com'
// } as UserRecord);
//
// (async () => {await userTest.insert();
// console.log(userTest)})();
