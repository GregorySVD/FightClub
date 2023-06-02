import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

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

        this.id = obj.id;
        this.name = obj.name;
        this.power = obj.power;
        this.defence = obj.defence;
        this.stamina = obj.stamina
        this.agility = obj.agility;
        this.wins = obj.wins;
    }

    async insert(): Promise<string|number> {
        if(!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `warriors` (`id`, `name`, `power`, `agility`, `defence`,`stamina`, `wins`" +
            " )VALUES(:id,:name,:power,:agility, :defence, :stamina, :wins)", {
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
    //async update() {

    //}

    static async getOne(id: string) { //static = scan whole database

    }
    static async listAll(): Promise<WarriorRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `warriors`")) as WarriorRecordResult;
    return results.map(obj => new WarriorRecord(obj));
    }
    static async listTop(topCount: number) {

    }
}