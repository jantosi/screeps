const commander = require('commander');

const roleMapping = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader'),
    explorer: require('role.explorer')
};

const growthStrategyMapping = {
    expandEnergy: require('growth-strategy.expand-energy')
};

module.exports.loop = function () {
	
	_.forEach(Game.spawns, (spawn)=>{
	    if(!!spawn.memory.growthStrategy){
	        growthStrategyMapping[spawn.memory.growthStrategy].run(spawn);
	    } else {
	        //unassigned
	    }
	})
	
	//handle current creeps
	
	_.forEach(Game.creeps, (creep)=>{
	   // console.log("Creep", creep.name, creep.memory.role);
	    if(!!creep.memory.role){
	        roleMapping[creep.memory.role].run(creep);
	    } else {
	        //unassigned
	    }
	})
}