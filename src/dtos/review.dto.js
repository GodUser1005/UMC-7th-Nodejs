export const bodyToReview = (body, storeId) => {
    const {user_id, score, content} = body;

    return {
        user_id: user_id,
        store_id: storeId,
        score: score,
        content: content
    };
};

export const responseFromReview= (review) => {
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