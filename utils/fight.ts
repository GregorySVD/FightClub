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

        log.push(`${attacker.warrior.name} will attack ${defender.warrior.name} with strength of ${attackStrength}`);

        if(defender.dp + defender.warrior.agility> attackStrength) {
            log.push(`${defender.warrior.name} reflected damage from ${attacker.warrior.name}`)
            defender.dp -= attackStrength;

            if(defender.dp < 0) {
                log.push(`${attacker.warrior.name} broke defense of ${defender.warrior.name} and deals ${defender.dp} points of damage`)
                defender.hp += defender.dp;
            }
        } else {
            defender.hp -= attackStrength;
            log.push(`${attacker.warrior.name} deals ${defender.dp} points of damage to ${defender.warrior.name}` )
            defender.hp += defender.dp;
        }

        [defender, attacker] = [attacker, defender]; //swap of roles if fight


    } while (defender.hp > 0); //do this loop until defender hp is lower then 0


    const winner = defender.warrior;
    log.push(`${winner.name} is a winner!`);
    return {
        log,
        winner,
    };
};
