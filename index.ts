import * as express from "express";
import 'express-async-errors';
import * as methodOverride from "method-override";
import {static as eStatic, urlencoded} from "express"; //static is reserved so we need to use static as eStatic
import {engine} from "express-handlebars";
import {homeRouter} from "./routers/home";
import {warriorRouter} from "./routers/warrior";
import {arenaRouter} from "./routers/arena";
import {hallOfFameRouter} from "./routers/hall-of-fame";
import './utils/db';
import {WarriorRecord} from "./records/warrior.record"; //for instance connect to database;

const app = express();

app.use(methodOverride('_method')) //if we use _method we can override methods for REST api
app.use(urlencoded({ //our project will use forms for example to create a warrior
    extended: true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({ //view engine
    extname: '.hbs',
    // helpers:
}));

app.set('view engine', '.hbs');

//Routers
app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

const w = new WarriorRecord({
    name: 'Box',
    power: 2,
    defence: 3,
    stamina: 3,
    agility: 2,
})

console.log(w)

// app.use(handleError):

app.listen(3000, 'localhost', () => {
    console.log('listening on http://localhost:3000');
})
