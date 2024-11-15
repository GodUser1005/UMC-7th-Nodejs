import {
    addMission,
    getMission,
    tryMission,
    addMissionPrisma,
    getMissionPrisma,
    tryMissionPrisma,
    getMissionsFromStore
} from "../repositories/mission.repository.js";
import { responseFromMission, responseFromTriedMission, responseFromMissionsOfStore } from "../dtos/mission.dto.js";

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