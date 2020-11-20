var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        Game.map.visual.text("🧰", creep.pos, {color: '#00dd00', fontSize: 8}); 

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        let flagName = creep.memory.associatedFlagName;
	        
            var targets = !!flagName
                ? [Game.flags[flagName].pos.findClosestByRange(FIND_CONSTRUCTION_SITES)]
                : creep.room.find(FIND_CONSTRUCTION_SITES);
            
            let preferredTarget = targets[0];
            
            if(!!preferredTarget) {
                if(creep.build(preferredTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(preferredTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;