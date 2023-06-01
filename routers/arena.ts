import { Router } from "express"

export const arenaRouter = Router();

arenaRouter
    .get('/fight-form', (req, res) => {
        res.render('./arena/fight-form')
    })
    .post('/fight', (req, res) => {
        res.send('FIGHT!')
    }) //POST/ arena/ fight
