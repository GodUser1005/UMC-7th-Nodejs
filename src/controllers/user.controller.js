import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUpService } from "../services/user.service.js";
import { JSONStringify } from "json-with-bigint";

export const userSignUpController = async (req, res, next) => {
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