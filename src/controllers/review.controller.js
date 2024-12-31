import { StatusCodes } from "http-status-codes";
import { addReviewService, getReviewsFromStoreService, getReviewsFromUserService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const addReviewController = async (req, res, next) => {
    console.log("리뷰를 작성합니다.!");
    console.log("body: ", req.body);

    try{
        const review = await addReviewService(bodyToReview(req.body, req.params.storeId));
        res.status(StatusCodes.CREATED).success(review);

    }catch(e){
        throw e;
    }
};

export const getReviewsFromStoreController = async (req, res, next) => {
    console.log("리뷰를 조회합니다!");

    try {
        const reviews = await getReviewsFromStoreService(req.params.storeId, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        throw err;
    }   
};

export const getReviewsFromUserController = async (req, res, next) => {
    console.log("해당 유저의 리뷰를 조회합니다!");

    try {
        const reviews = await getReviewsFromUserService(req.params.userId, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        throw err;
    }   
};

