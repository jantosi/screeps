const findPreferredSource = function(){
    
};

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        Game.map.visual.text("⛏︎", creep.pos, {color: '#00dd00', fontSize:  2}); 
        
	    if(creep.store.getFreeCapacity() > 0) {
	        let flagName = creep.memory.associatedFlagName;
	        
            var sources = !!flagName
                ? [Game.flags[flagName].pos.findClosestByRange(FIND_SOURCES_ACTIVE)]
                : creep.room.find(FIND_SOURCES);
            
            let preferredSource = sources[0];
            
            // console.log("Creep "+creep.name+" source "+preferredSource);
            
            if(creep.harvest(preferredSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(preferredSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.say("No targets")
            }
        }
	}
};

module.exports = roleHarvester;