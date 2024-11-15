import {
    addReview,
    getReview,
    getReviewsFromStore
} from "../repositories/review.repository.js";
import { responseFromReview, responseFromReviewsOfStore } from "../dtos/review.dto.js";

export const addReviewService = async (reviewData) => {

    try {
        const reviewId = await addReview(reviewData);
        const [review] = await getReview(reviewId);

        return responseFromReview(review);

    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getReviewsFromStoreService = async(storeId, cursor) => {
    try {
        const reviews = await getReviewsFromStore(storeId, cursor);
        return responseFromReviewsOfStore(reviews);

    } catch (err) {
        throw err;
    }
}