import { StatusCodes } from "http-status-codes";
import { addMissionService, tryMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const addMissionController = async (req, res, next) => {
    console.log("미션을 생성합니다.!");
    console.log("body: ", req.body);

    try{
        const mission = await addMissionService(bodyToMission(req.body, req.params.storeId));
        res.status(StatusCodes.OK).json({result: mission});

    }catch(e){
        throw e;
    }
};

export const tryMissionController = async (req, res, next) => {
    console.log("미션을 도전합니다.!");

    try {
        const mission = await tryMissionService(parseInt(req.params.userId), parseInt(req.params.missionId));
        res.status(StatusCodes.OK).json({result: mission});

    } catch (err) {
        throw err;
    }
};