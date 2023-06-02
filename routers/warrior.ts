import { Router } from "express"
import {WarriorRecord} from "../records/warrior.record";

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', async (req, res) => {
        const warriorsList = await  WarriorRecord.listAll();
        console.log(warriorsList);
        res.render('warrior/add-form.hbs')
    })
    .post('/', (req, res) => {
        res.render('warrior/warrior-added')
    });
