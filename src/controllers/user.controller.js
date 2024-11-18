import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUpService } from "../services/user.service.js";

export const userSignUpController = async (req, res, next) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body: ", req.body);

    try{
<<<<<<< Updated upstream
        const user = await userSignUpService(bodyToUser(req.body));
        res.status(StatusCodes.OK).json({result: user});
=======
        const user = await userSignUpService(bodyToUser(req.body),req.body.food_categories);
        user.id = JSONStringify(user.id);
        res.status(StatusCodes.OK).success(user);
>>>>>>> Stashed changes
    }
    catch(err){
        throw err;
    }


}