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
	        let selectedStrategy = growthStrategyMapping[spawn.memory.growthStrategy];
	        if(!selectedStrategy){ console.log("Spawn "+spawn.name+" has null strategy."); return; }
	        selectedStrategy.run(spawn);
	    } else {
	        //unassigned
	    }
	})
	
	//handle current creeps
	
	_.forEach(Game.creeps, (creep)=>{
	   // console.log("Creep", creep.name, creep.memory.role);
	    if(!!creep.memory.role){
	        let selectedRole = roleMapping[creep.memory.role];
	        if(!selectedRole){ console.log("Creep "+creep.name+" has null role."); return; }
	        selectedRole.run(creep);
	    } else {
	        //unassigned
	    }
	})
}