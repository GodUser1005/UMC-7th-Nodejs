import {
    addMission,
    getMission
} from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const addMissionService = async (missionData) => {

    try {
        const missionId = await addMission(missionData);
        const [mission] = await getMission(missionId);

        return responseFromMission(mission);

    } catch (err) {
        console.error(err);
        throw err;
    }
}