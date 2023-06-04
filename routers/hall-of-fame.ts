import {Router} from "express"
import {WarriorRecord} from "../records/warrior.record";

export const hallOfFameRouter = Router();

hallOfFameRouter
    .get('/', async (req, res) => {
        const hallOfFameList = (await WarriorRecord.listTop(10)).map((warrior, index) => {
                return {
                    place: index + 1,
                    warrior

                }
            }
        );
        console.log(hallOfFameList);

        res.render('./hall-of-fame/list.hbs', {
            hallOfFameList
        });
    });
