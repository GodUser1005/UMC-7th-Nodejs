import { StatusCodes } from "http-status-codes";
import { addMissionService, tryMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const addMissionController = async (req, res, next) => {
    console.log("미션을 생성합니다.!");
    console.log("body: ", req.body);

    try{
        const mission = await addMissionService(bodyToMission(req.body, req.params.storeId));
        res.status(StatusCodes.CREATED).success(mission);

    }catch(e){
        throw e;
    }
};

export const tryMissionController = async (req, res, next) => {
    console.log("미션을 도전합니다.!");

    try {
        const mission = await tryMissionService(parseInt(req.params.userId), parseInt(req.params.missionId));
        res.status(StatusCodes.CREATED).success(mission);

    } catch (err) {
        throw err;
    }
};

export const getMissionsFromStoreController = async (req, res, next) => {
    console.log("해당 식당의 미션들을 조회합니다!");

    try {
        const missions = await getMissionsFromStoreService(req.params.storeId, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).success(missions);
    } catch (err) {
        throw err;
    }   
};

export const getMissionsFromUserController = async (req, res, next) => {
    let status;
    if(typeof req.query.status === "string" && req.query.status === "ongoing"){
        console.log("유저의 진행중인 미션들을 조회합니다!");
        status = 1;
    }
    else{
        console.log("유저의 미션들을 조회합니다!");
        status = 0;
    }

    try {
        const missions = await getMissionsFromUserService(req.params.userId, status, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).success(missions);
    } catch (err) {
        throw err;
    }   
};


