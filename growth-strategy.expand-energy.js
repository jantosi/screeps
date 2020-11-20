/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('growth-strategy.expand-energy');
 * mod.thing == 'a thing'; // true
 */

var commander = require('commander');

//todo useme
var creepList = [
    [WORK, CARRY, MOVE],
    [WORK, CARRY, MOVE, MOVE]
];

module.exports = {
    run: function(spawn){
        if(!spawn.memory.expandEnergy){
            spawn.memory.expandEnergy = { stage: 0 };
        }
        
        const strategyMemory = spawn.memory.expandEnergy;
        
        let creepsInThisRoom = _.filter(_.values(Game.creeps), (creep)=>creep.room === spawn.room).length;
        strategyMemory.stage = creepsInThisRoom;
        
        Game.map.visual.text("E", spawn.pos, {color: '#dd0000', fontSize: 8}); 
        if(spawn.store.getUsedCapacity(RESOURCE_ENERGY) > 200 && !!creepList[strategyMemory.stage]){
            commander.createCreep();
            strategyMemory.stage++;
            Game.map.visual.text("mkcrep", spawn.pos, {color: '#dd0000', fontSize: 8}); 
        }
    }
};