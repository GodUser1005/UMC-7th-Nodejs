import {
    addReview,
    getReview
} from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

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