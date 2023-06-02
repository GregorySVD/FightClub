import { Router } from "express"
import {WarriorRecord} from "../records/warrior.record";


export const warriorRouter = Router();

warriorRouter
    .get('/add-form', async (req, res) => {
        const warriorsList = await WarriorRecord.listAll();
        res.render('warrior/add-form.hbs');
        const foundOneWarrior = await WarriorRecord.getOne('a82b4781-0097-11ee-9535-54ee75df9c6e')
        console.log(foundOneWarrior.name);
    })
    .post('/', async (req, res) => {
        res.render('warrior/warrior-added');
    });
