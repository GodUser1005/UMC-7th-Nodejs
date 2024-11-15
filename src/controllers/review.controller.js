import { StatusCodes } from "http-status-codes";
import { addReviewService, getReviewsFromStoreService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const addReviewController = async (req, res, next) => {
    console.log("리뷰를 작성합니다.!");
    console.log("body: ", req.body);

    try{
        const review = await addReviewService(bodyToReview(req.body, req.params.storeId));
        res.status(StatusCodes.OK).json({result: review});

    }catch(e){
        throw e;
    }
};

export const getReviewsFromStoreController = async (req, res, next) => {
    console.log("리뷰를 조회합니다!");

    try {
        const reviews = await getReviewsFromStoreService(req.params.storeId, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).json({result: reviews});
    } catch (err) {
        throw err;
    }   
}