import {createPool} from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'fight_club',
    namedPlaceholders: true,
    decimalNumbers: true,

})
