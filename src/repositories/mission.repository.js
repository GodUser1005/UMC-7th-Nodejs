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
}