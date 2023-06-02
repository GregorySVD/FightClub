import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]]

export class WarriorRecord {
    public id?: string;
    public readonly name: string; //once given name can't be changed = readonly
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins? : number;

    constructor(obj: WarriorRecord) {
        const {id, name, agility, stamina,  defence, power, wins} = obj;

        const sum = [agility, stamina,  defence, power].reduce((prev, curr) => prev+curr, 0);
        if (sum!== 10) {
            throw new ValidationError(`You must distribute all skill points (sum of skill points= 10 point). 
            You already have distribute ${sum}.`);
        }
        if(name.length <3 && name.length > 50) {
            throw new ValidationError(`Name of fighter needs to be at least 3 characters and not longer than 50 characters. Your fighter name is ${name.length} characters long.`)
        }

        this.id = id;
        this.name = name;
        this.power = power;
        this.agility = agility;
        this.defence = defence;
        this.stamina = stamina
        this.wins = wins;
    }
    // async insert(): Promise<WarriorRecord> {
    //     await pool.execute("INSERT INTO ")
    //
    // }
    async update() {

    }

    static async getOne(id: string) { //static = scan whole database

    }
    static async listAll(): Promise<WarriorRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `warriors`")) as WarriorRecordResult;
    return results.map(obj => new WarriorRecord(obj));
    }
    static async listTop(topCount: number) {

    }
}
