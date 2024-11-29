import { StatusCodes } from "http-status-codes";
import { addReviewService, getReviewsFromStoreService, getReviewsFromUserService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const addReviewController = async (req, res, next) => {
    /*
    #swagger.tags = ["Review"]
    #swagger.summary = "리뷰 생성 API"
    #swagger.parameters['storeId'] = {
        in: "path",
        required: true,
        description: "리뷰 생성하려는 가게 ID",
        type: "integer",
        example: 13
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    "type": "object",
                    "properties": {
                        "user_id": { type: "integer" },
                        "score" : { type : "integer"},
                        "content": { type: "string" }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    }
  */
    console.log("리뷰를 작성합니다.!");
    console.log("body: ", req.body);

    try{
        const review = await addReviewService(bodyToReview(req.body, req.params.storeId));
        res.status(StatusCodes.CREATED).success(review);

    }catch(e){
        throw e;
    }
}

export const getReviewsFromStoreController = async (req, res, next) => {
  /*
    #swagger.tags = ["Review"]
    #swagger.summary = "상점 리뷰 목록 조회 API"
    #swagger.parameters['storeId'] = {
      in: "path",
      required: true,
      description: "조회하려는 유저의 ID",
      type: "string",
      example: "12345"
    }
    #swagger.parameters['cursor'] = {
      in: "query",
      required: false,
      description: "페이지 네이션",
      type: "string",
      example: "2"
    }
    #swagger.responses[200] = {
      description: "리뷰 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data : { 
                    type : "array", 
                    items : {
                      type : "object",
                      properties: {
                        id : {type : "string"},
                        score : {type : "integer"},
                        storeId : {type : "string"},
                        userId : {type : "string"},
                        createdAt : {type : "string", format : date}
                      }
                    } 
                  },
                  pagenation : { type : "object", properties: { cursor : {type : string}}}
                }
              }
            }
          }
        }
      }
    }
  */
    console.log("리뷰를 조회합니다!");

    try {
        const reviews = await getReviewsFromStoreService(req.params.storeId, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        throw err;
    }   
}

export const getReviewsFromUserController = async (req, res, next) => {
    /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    */
    console.log("해당 유저의 리뷰를 조회합니다!");

    try {
        const reviews = await getReviewsFromUserService(req.params.userId, typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
        res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        throw err;
    }   
}

