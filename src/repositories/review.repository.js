import { pool, prisma } from "../db.config.js";
import { Prisma } from "@prisma/client";

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
        );

        return result.insertId;

    } catch (err) {
        console.error(err);
        throw err;
    } finally{
        conn.release();
    }
};

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
        );

        if(review.length == 0){
            throw new Error("없는 리뷰입니다.");
        }

        console.log(review);
        return review;
    } catch (err) {
        console.error(err);
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
        });
        
        if(reviews.length == 0){
            throw new Error("아무것도 없어요");
        }

        return reviews
    } catch (err) {
        throw err;
    }
};