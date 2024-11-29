import { pool, prisma } from "../db.config.js";
import { DatabaseError, DataNotFound } from "../error.js";

export const addReview = async (reviewData) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });

    try {
        const [result] = await conn.query(
            `INSERT INTO reviews (store_id, user_id, score, content) VALUES (?,?,?,?);`,
            [
                reviewData.store_id,
                reviewData.user_id,
                reviewData.score,
                reviewData.content
            ]
        ).catch((err) => {
            throw new DatabaseError("DB접근 오류입니다.");
        });

        return result.insertId;

    } catch (err) {
        throw err;
    } finally{
        conn.release();
    }
}

export const getReview = async (reviewId) => {
    const conn = await pool.getConnection()
            .catch(err => {
                Promise.reject(err);
            });

    try {
        const [review] = await conn.query(
            "SELECT id AS review_id, score, content, created_at " +
            "FROM reviews " +
            `WHERE reviews.id = ?;`,
            reviewId
        ).catch((err) => {
            throw new DatabaseError("DB 접근 오류입니다.");
        });

        if(review.length == 0){
            throw new DataNotFound("리뷰가 없습니다.");
        }

        return review;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export const getReviewsFromStore = async (storeId, cursor) => {
    try {
        const reviews = await prisma.review.findMany({
            select: {
                id: true,
                score: true,
                content: true,
                storeId: true,
                userId: true,
                createdAt: true,
                updatedAt: false,
            },
            where: {storeId: storeId, id: {gt: cursor}},
            orderBy: {id: "asc"},
            take: 5,
        }).catch((err) => {
            throw new DatabaseError("DB접근 오류입니다.")
        });
        
        if(reviews.length == 0){
            throw new DataNotFound("리뷰가 없습니다.");
        }

        return reviews
    } catch (err) {
        throw err;
    }
}

export const getReviewsFromUser = async (userId, cursor) => {
    try {
        const reviews = await prisma.review.findMany({
            select: {
                id: true,
                score: true,
                content: true,
                storeId: true,
                userId: true,
                createdAt: true,
                updatedAt: false,
            },
            where: {userId: userId, id: {gt: cursor}},
            orderBy: {id: "asc"},
            take: 5,
        }).catch((err) => {
            throw new DatabaseError("DB접근 오류입니다.");
        });
        
        if(reviews.length == 0){
            throw new DataNotFound("리뷰가 없습니다.");
        }

        return reviews
    } catch (err) {
        throw err;
    }
}
