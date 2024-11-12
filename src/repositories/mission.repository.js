import { pool } from "../db.config.js";

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