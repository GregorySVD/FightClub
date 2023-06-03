import { Router } from "express"


export const warriorRouter = Router();

warriorRouter
    .get('/add-form', async (req, res) => {
        res.render('warrior/add-form.hbs');
    })
    .post('/', async (req, res) => {
        const warrior = await req.body
        console.log(warrior)
        res.render('warrior/warrior-added.hbs');
    });
