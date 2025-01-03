import { JSONStringify } from "json-with-bigint";

export const bodyToMission = (body, storeId) => {
    const { contents, point } = body;
    const expiration_date = new Date(body.expiration_date);

    return {
        storeId: storeId,
        contents: contents,
        point: point,
        expirationDate: expiration_date,
    };
};

export const responseFromMission = (mission) => {
    const {id, point, contents, expirationDate, storeId} = mission;
    
    return {
        mission: {
            mission_id: JSONStringify(id),
            store_id: JSONStringify(storeId),
            point: point,
            contents: contents,
            expiration_date: expirationDate,
        },
        message: "미션이 등록되었습니다.",
    }
};

export const responseFromTriedMission = (mission) => {
    const {id, point, contents, expirationDate, storeId} = mission;
    
    return {
        mission: {
            mission_id: JSONStringify(id),
            store_id: JSONStringify(storeId),
            point: point,
            contents: contents,
            expiration_date: expirationDate,
        },
        message: "다음미션을 도전합니다.",
    }
};

export const responseFromMissionsOfStore = (missions) => {
    for (let mission of missions){
        mission.id = JSONStringify(mission.id);
        mission.storeId = JSONStringify(mission.storeId);
    } 
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    }
};

export const responseFromMissionsOfUser = (missions) => {
    for (let userMission of missions){
        userMission.id = JSONStringify(userMission.id);
        userMission.mission.id = JSONStringify(userMission.mission.id);
        userMission.mission.storeId = JSONStringify(userMission.mission.storeId);
    } 
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    }
}