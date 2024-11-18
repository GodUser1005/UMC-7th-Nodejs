import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferenceByUserId,
    setPreference,
} from "../repositories/user.repository.js";

export const userSignUpService = async (userData, food_categories) => {

    const joinUserId = await addUserPrisma(userData)
        .catch((err) => {
            err.data.food_categories = food_categories;
            return Promise.reject(err);
        })

    for (const category_id of food_categories){
        await setPreferencePrisma(joinUserId, category_id);
    }

    const user = await getUserPrisma(joinUserId);
    user.preferences = await(getUserPreferenceByUserIdPrisma(joinUserId));
    
    return responseFromUserPrisma(user);
}
