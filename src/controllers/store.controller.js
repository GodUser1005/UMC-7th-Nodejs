import { StatusCodes } from "http-status-codes";
import {addStoreService} from "../services/store.service.js";
import {bodyToStore} from "../dtos/store.dto.js";

export const addStoreController = async (req, res, next) => {
    console.log("가게를 추가합니다!");
    console.log("body: ", req.body);

    try{
        const store = await addStoreService(bodyToStore(req.body));
        res.status(StatusCodes.OK).success(store);

    }catch(e){
        throw e;
    }
}