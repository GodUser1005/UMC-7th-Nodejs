import { JSONParse, JSONStringify } from "json-with-bigint";

export const bodyToReview = (body, storeId) => {
    const {user_id, score, content} = body;

    return {
        user_id: user_id,
        store_id: storeId,
        score: score,
        content: content
    };
}

export const responseFromReview = (review) => {
    const {review_id, score, content, created_at} = review;
    
    return {
        review: {
            id: review_id,
            score: score,
            content: content,
            created_at: created_at,
        },
        message: "리뷰가 등록되었습니다.",
    }
}

export const responseFromReviewsOfStore = (reviews) => {
    for (let review of reviews){
        review.id = JSONStringify(review.id);
        review.storeId = JSONStringify(review.storeId);
        review.userId = JSONStringify(review.userId);
    } 
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    }
}

export const responseFromReviewsOfUser = (reviews) => {
    for (let review of reviews){
        review.id = JSONStringify(review.id);
        review.storeId = JSONStringify(review.storeId);
        review.userId = JSONStringify(review.userId);
    } 
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    }
}