import { Router } from "express"

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', (req, res) => {
        res.render('./warrior/add-form.hbs')
    })
    .post('/add-form', (req, res) => {
        res.send('Adding warrior ....')
    });
