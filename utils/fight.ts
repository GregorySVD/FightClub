import {WarriorRecord} from "../records/warrior.record";



export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {  //fast interface
    log: string[];
    winner: WarriorRecord;
} => {
    const log: string[] = [];
  //created object based on WarriorRecord, adding hp = health points and dp = defense points
    const warrior1Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.defence,
        warrior: warrior1,
    };
    const warrior2Obj = {
        hp: warrior2.stamina * 10,
        dp: warrior2.defence,
        warrior: warrior2,
    };

    let attacker = warrior1Obj;
    let defender = warrior2Obj;

    do {
        const attackStrength = attacker.warrior.power;

        if(defender.dp + defender.warrior.agility> attackStrength) {
            defender.dp -= attackStrength;

            if(defender.dp < 0) {
                defender.hp += defender.dp;
            }
        }

        [defender, attacker] = [attacker, defender]; //swap of roles if fight


    } while (defender.hp > 0); //do this loop until defender hp is lower then 0


    const winner = defender.warrior;

    return {
        log,
        winner,
    };
};
