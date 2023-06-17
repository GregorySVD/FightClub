import {Router} from "express";


export const userRouter = Router();

userRouter
.get('/', async (req, res) => {
    res.render('./user/login.hbs');
})
