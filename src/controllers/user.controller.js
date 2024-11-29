import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUpService } from "../services/user.service.js";
import { JSONStringify } from "json-with-bigint";

export const userSignUpController = async (req, res, next) => {
    /*
    #swagger.tags = ["User"]
    #swagger.summary = "회원 가입 API"
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    "type": "object",
                    "properties": {
                        "email": { type: "string" },
                        "name": { type: "string" },
                        "gender": { type: "integer" },
                        "birth": { type: "string", format: "date" },
                        "address": { type: "string" },
                        "food_categories": { type: "array", items: { type: "integer" } }
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
                                id: {type: "integer"},
                                name: {type: "string"},
                                e_mail: { type: "string" },
                                gender : {type : "integer"},
                                birth : {type : "string", format : "date"},
                                address : {type : "string"},
                                preferCategory: { type: "array", items: { type: "string" } }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "회원 가입 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U001" },
                                reason: { type: "string" },
                                data: { 
                                    type: "object", 
                                    properties: {
                                        email: { type: "string" },
                                        name: { type: "string" },
                                        gender: { type: "integer" },
                                        birth: { type: "string", format: "date" },
                                        address: { type: "string" },
                                        food_categories: { type: "array", items: { type: "integer" } }
                                    }
                                }
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                } 
            }
        }
    }
*/
    console.log("회원가입을 요청했습니다!");
    console.log("body: ", req.body);

    try{
        const user = await userSignUpService(bodyToUser(req.body),req.body.food_categories);
        user.id = JSONStringify(user.id);
        res.status(StatusCodes.OK).success(user);
    }
    catch(err){
        throw err;
    }


}