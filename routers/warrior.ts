import { Router } from "express"
import {WarriorRecord} from "../records/warrior.record";


export const warriorRouter = Router();

warriorRouter
    .get('/add-form', async (req, res) => {
        const warriorsList = await WarriorRecord.listAll();
        res.render('warrior/add-form.hbs');
        console.log(warriorsList);
    })
    .post('/', async (req, res) => {
        res.render('warrior/warrior-added');
    });
