import { pool } from "../db.config.js";

// User 데이터 삽입

export const addUser = async(userData) => {

        const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });

    try{
        await conn.beginTransaction(); // transaction 시작

        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM users WHERE e_mail = ?) as isExistEmail;`,
            userData.e_mail
        );

        if(confirm[0].isExistEmail){
            throw new Error("이메일이 존재합니다");
        }

        const [result] = await conn.query(
            `INSERT INTO users (name, e_mail, gender, birth, address) VALUES (?,?,?,?,?);`,
            [
                userData.name,
                userData.e_mail,
                userData.gender,
                userData.birth,
                userData.address,
            ]
        );

        await conn.commit();

        return result.insertId;
    }
    catch (err){
        await conn.rollback();
        throw err;
    }
    finally{
        conn.release();
    }
}

export const getUser = async (userId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });
    
    try {
        const [user] = await conn.query(
            `SELECT * FROM users WHERE id = ?;`, userId
        );

        if(user.length == 0){
            throw new Error("존재하지 않는 유저입니다.");
        }

        return user;

    } catch (err) {
        throw err;
    } finally{
        conn.release();
    }
};

export const setPreference = async (userId, foodCategoryId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });
    try{
        await conn.query(
            `INSERT INTO kind_food_categories (user_id, category_id) VALUES (?,?);`,
            [
                userId,
                foodCategoryId
            ]
        );

        return;

    }catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

export const getUserPreferenceByUserId = async(userId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });
    try {
        const [preferences] = await conn.query(
            "SELECT kfc.user_id, kfc.category_id, fc.name " +
            "FROM kind_food_categories kfc " +
            "JOIN food_categories fc ON kfc.category_id = fc.id " +
            "WHERE kfc.user_id = ? ORDER BY kfc.category_id ASC;",
            userId
        );

        return preferences;
    } catch (error) {
        throw error;
    } finally{
        conn.release();
    }
}