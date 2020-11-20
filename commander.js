/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('commander');
 * mod.thing == 'a thing'; // true
 */

let listSpawns = () => _.values(Game.spawns);


module.exports = {
    listCreepNames: () => _.keys(Game.creeps),
    listCreeps: () => _.values(Game.creeps),
    
    listSpawnNames: () => _.keys(Game.spawns),
    listSpawns: listSpawns,
    
    createCreep: function(body, opts, spawn){
        if(!body){
            body = [WORK, CARRY, MOVE];
        }
        
        let defaultOpts = {
            memory: {role: 'harvester'}
        };
        opts = _.merge(defaultOpts, opts);
        
        if(!spawn){
            spawn = listSpawns()[0];
        }
        
        let name = spawn.name + "_" + "Creep" + _.random(1000,9999);
        return spawn.spawnCreep(body, name, opts);
    },
    
    setAllRoleTo: function(desiredRole){
      _.forIn(Game.creeps, (v,k)=>{
          v.memory.role = desiredRole;
      });
    },
    
    cleanupCreepMemory: function(){
      let aliveCreeps = _.keys(Game.creeps);
      let memoryCreeps = _.keys(Memory.creeps);
      
      let obsoleteCreeps = _.difference(memoryCreeps, aliveCreeps);
      console.log("obsoleteCreeps", obsoleteCreeps);
      obsoleteCreeps.forEach((name) => {
          Memory.creeps[name] = undefined;
      });
    },
    
    init: function(){
        module.exports.createCreep();
        module.exports.createCreep();
    }
};