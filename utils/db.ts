import {createPool} from "mysql2/promise"; //remember for promises!!


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'fight_club',
    namedPlaceholders: true, //for use of :id VALUES
    decimalNumbers: true,
});
