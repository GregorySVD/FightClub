import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

// export interface WarriorEntity {
//     id?: string;
//     readonly name: string; //once given name can't be changed = readonly
//     readonly power: number;
//     readonly defence: number;
//     readonly stamina: number;
//     readonly agility: number;
//     wins?: number;
// }

export class WarriorRecord {
    public id?: string;
    public readonly name: string; //once given name can't be changed = readonly
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) { //omit a
        // specific fields from WarriorRecord to create new WarriorRecord
        const {id, name, agility, stamina, defence, power, wins} = obj;

        const stats = [agility, stamina, defence, power];

        const sum = stats.reduce((prev, curr) => prev + curr, 0);

        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError(`Stat must be at least 1. Please set ${stat} at least at 1`)
            }
        }

        if (sum !== 10) {
            throw new ValidationError(`You must distribute all skill points (sum of skill points must be 10). 
            You already have distribute ${sum}.`);
        }
        if (name.length < 3 && name.length > 50) {
            throw new ValidationError(`Name of fighter needs to be at least 3 characters and not longer than 50 characters. Your fighter name is ${name.length} characters long.`)
        }

        this.id = id ?? uuid(); //validation by nullish operator
        this.wins = wins ?? 0;
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.stamina = stamina
        this.agility = agility;
    }

    async insert(): Promise<string> { //return string for id

        await pool.execute("INSERT INTO `warriors` (`id`, `name`, `power`, `agility`, `defence`,`stamina`, `wins`)VALUES(:id,:name,:power,:agility, :defence, :stamina, :wins)", {
            id: this.id,
            name: this.name,
            power: this.power,
            agility: this.agility,
            defence: this.defence,
            stamina: this.stamina,
            wins: this.wins,
        })
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins` = :wins WHERE `id` = :id", {
            id: this.id,
            wins: this.wins,

        });
    }

    static async getOne(id: string): Promise<WarriorRecord | null> { //static = scan whole database
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` =:id", {
            id,
        }) as WarriorRecordResult;
        return results.length === 0 ? null : new WarriorRecord(results[0]); // validation
    }


    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `warriors`")) as WarriorRecordResult;
        return results.map(obj => new WarriorRecord(obj)); //without this we get pure table, so it is necessary to
        // map results to return WarriorRecord
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount,
        }) as WarriorRecordResult;
        return results.map(obj => new WarriorRecord(obj));
    }
    static async isNameTaken(name: string):Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `name` =:name", {
            name,
        }) as WarriorRecordResult;
        return results.length > 0;  // validation
    }

}
