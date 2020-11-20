var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.moveTo(new RoomPosition(24, 27, "W7N5"));
        let unclaimedControllers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTROLLER && structure.owner === undefined);
            }
        });
        
        if(unclaimedControllers.length > 0){
            creep.say("some targets")
            creep.moveTo(unclaimedControllers[0].pos);
        } else {
            creep.say("no targets")
        }
	}
};

module.exports = roleExplorer;