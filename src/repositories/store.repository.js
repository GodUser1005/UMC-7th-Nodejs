import { pool } from "../db.config.js";

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
        );

        return result.insertId;

    } catch (err) {
        console.error(err);
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
        );

        if(store.length == 0){
            throw new Error("해당 가게가 없습니다.");
        }

        console.log(store);

        return store;

    } catch (err) {
        console.error(err);
        throw err;
    } finally{
        conn.release();
    }
}