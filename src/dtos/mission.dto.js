export const bodyToMission = (body, storeId) => {
    const { contents, point } = body;
    const expiration_date = new Date(body.expiration_date);

    return {
        store_id: storeId,
        contents: contents,
        point: point,
        expiration_date: expiration_date,
    };
};

export const responseFromMission= (mission) => {
    const {mission_id, point, contents, expiration_date, store_id} = mission;
    
    return {
        mission: {
            id: mission_id,
            store_id: store_id,
            point: point,
            contents: contents,
            expiration_date: expiration_date,
        },
        message: "미션이 등록되었습니다.",
    }
}