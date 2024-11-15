import {
    addMission,
    getMission,
    tryMission,
    addMissionPrisma,
    getMissionPrisma,
    tryMissionPrisma,
    getMissionsFromStore,
    getMissionsFromUser
} from "../repositories/mission.repository.js";
import { 
    responseFromMission, 
    responseFromTriedMission, 
    responseFromMissionsOfStore,
    responseFromMissionsOfUser 
} from "../dtos/mission.dto.js";

export const addMissionService = async (missionData) => {

    try {
        const missionId = await addMissionPrisma(missionData);
        const mission = await getMissionPrisma(missionId);

        return responseFromMission(mission);

    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const tryMissionService = async (userId, missionId) => {
    try{
        const triedMission = await tryMissionPrisma(userId, missionId);
        return responseFromTriedMission(triedMission)

    } catch (err) {
        throw err;
    }
}

export const getMissionsFromStoreService = async(storeId, cursor) => {
    try {
        const missions = await getMissionsFromStore(storeId, cursor);
        return responseFromMissionsOfStore(missions);

    } catch (err) {
        throw err;
    }
};

export const getMissionsFromUserService = async(userId, status, cursor) => {
    try {
        console.log(status);
        const missions = await getMissionsFromUser(userId, status ,cursor);
        return responseFromMissionsOfUser(missions);

    } catch (err) {
        throw err;
    }
};