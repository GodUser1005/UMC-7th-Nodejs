import {
    addMission,
    getMission,
    tryMission
} from "../repositories/mission.repository.js";
import { responseFromMission, responseFromTriedMission } from "../dtos/mission.dto.js";

export const addMissionService = async (missionData) => {

    try {
        const missionId = await addMission(missionData);
        const [mission] = await getMission(missionId);

        return responseFromMission(mission);

    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const tryMissionService = async (userId, missionId) => {
    try{
        const [triedMission] = await tryMission(userId, missionId);
        const [mission] = await getMission(triedMission.mission_id);

        return responseFromTriedMission(mission);

    } catch (err) {
        console.error(err);
        throw err;
    }
}