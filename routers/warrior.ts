import { Router } from "express"
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/error";


export const warriorRouter = Router();

warriorRouter
    .get('/add-form', async (req, res) => {
        res.render('warrior/add-form.hbs');
    })
    .post('/',  async (req, res) => {
        const {agility, power, defence, stamina, name} = req.body;

        if(await WarriorRecord.isNameTaken(name)) {
            throw new ValidationError(`Name ${name} is already taken, choose another name`);
        }
        //req.body returns string, so it is necessary to convert stats to Number
        const warrior = new WarriorRecord({
            ...req.body,
            power: Number(power),
            defence: Number(defence),
            stamina: Number(stamina),
            agility: Number(agility),
            name: name,
        });
        await warrior.insert();
        res.render('warrior/warrior-added.hbs', {
            id: warrior.id,
            name: warrior.name,
        });
    });
