import { pool } from "../db.config.js";
import { DatabaseError, DataNotFound } from "../error.js";

export const addStore = async (storeData) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });

    try {
        const [result] = await conn.query(
            `INSERT INTO stores (name, address, location_id, category_id) VALUES (?,?,?,?)`,
            [
                storeData.name,
                storeData.address,
                storeData.location_id,
                storeData.category_id
            ]
        ).catch((err) => {
            console.error(err);
            throw new DatabaseError("DB접근 오류 입니다.");
        });

        return result.insertId;

    } catch (err) {
        throw err        
    } finally{
        conn.release();
    }
};

export const getStore = async (storeId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });
    
    try {
        const [store] = await conn.query(
            "SELECT stores.id AS store_id, stores.name AS store_name, location.name AS location_name, food_categories.name AS category_name " + 
            "FROM stores " + 
            "JOIN location ON stores.location_id = location.id " + 
            "JOIN food_categories ON stores.category_id = food_categories.id " +
            `WHERE stores.id = ?;`,
            storeId
        ).catch((err) => {
            console.error(err);
            throw new DatabaseError("DB접근 오류입니다.")
        });

        if(store.length == 0){
            throw new DataNotFound("해당 가게가 없습니다.", store);
        }

        return store;

    } catch (err) {
        throw err;
    } finally{
        conn.release();
    }
}