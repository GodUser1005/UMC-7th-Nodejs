import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const addMission = async (missionData) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });
    
    try {
        const [result] = await conn.query(
            `INSERT INTO missions (contents, point, expiration_date, store_id) VALUES (?,?,?,?);`,
            [
                missionData.contents,
                missionData.point,
                missionData.expiration_date,
                missionData.store_id
            ]
        );

        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        conn.release();
    }
};

export const addMissionPrisma = async (missionData) => {
    try {
        const created = await prisma.mission.create({data: missionData});
        return created.id;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getMission = async (missionId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });

    try {
        const [mission] = await conn.query(
            "SELECT id AS mission_id, contents, point, expiration_date, store_id " +
            "FROM missions " + 
            `WHERE missions.id = ?;`,
            missionId
        )

        if(mission.length == 0){
            throw new Error("없는 미션 입니다.");
        }

        console.log(mission);
        return mission;
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        conn.release();
    }
};

export const getMissionPrisma = async (missionId) => {
    try {
        const mission = await prisma.mission.findFirst({
            select : {
                id: true,
                contents: true,
                point:true,
                expirationDate: true,
                storeId: true
            },
            where : {id : missionId},
        })

        if(mission.length == 0){
            throw new Error("없는 미션 입니다.");
        }

        return mission;
        
    } catch (err) {
        throw err;
    }
};

export const tryMission = async (userId, missionId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });

    try {
        await conn.beginTransaction(); // transaction 시작

        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM user_mission WHERE user_id = ? AND mission_id = ?) as isExistChallenge;`,
            [userId, missionId]
        );

        if(confirm[0].isExistChallenge){
            throw new Error("이미 도전중인 미션입니다.");
        }

        const [triedMission] = await conn.query(
            "INSERT INTO user_mission (user_id, mission_id) VALUES (?,?);",
            [ userId, missionId ]
        ).then(async ([result]) => {
            return await conn.query("SELECT mission_id FROM user_mission WHERE id = ?",result.insertId);
        })

        conn.commit();

        console.log(triedMission);

        return triedMission;

    } catch (err) {
        conn.rollback();
        console.error(err);
        throw err;
    } finally {
        conn.release();
    }
}

export const tryMissionPrisma = async (userId, missionId) => {
    try {
        const mission = await prisma.userMission.findFirst({
            where : {missionId : missionId, userId: userId}
        })

        if(mission){
            throw new Error("이미 도전중인 미션입니다.");
        }

        const triedMission = await prisma.userMission.create({
            data : {
                userId : userId,
                missionId : missionId
            }
        }).then(async (result) => {
            return await prisma.userMission.findFirst({
                select : {
                    mission: true,
                },
                where : {
                    id : result.id,
                    status : 1
                }
            })
        })

    
        return triedMission.mission;

    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMissionsFromStore = async (storeId, cursor) => {
    try {
        const missions = await prisma.mission.findMany({
            select: {
                id: true,
                contents: true,
                point: true,
                storeId: true,
                createdAt: true,
                updatedAt: false,
            },
            where: {storeId: storeId, id: {gt: cursor}},
            orderBy: {id: "asc"},
            take: 5,
        });
        
        if(missions.length == 0){
            throw new Error("아무것도 없어요");
        }

        return missions
    } catch (err) {
        throw err;
    }
};