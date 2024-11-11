import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferenceByUserId,
    setPreference,
} from "../repositories/user.repository.js";

export const userSignUpService = async (userData) => {
    
    try{
        const joinUserId = await addUser(userData);

        for (const category_id of userData.food_categories){
            await setPreference(joinUserId, category_id);
        }

        const user = await getUser(joinUserId);
        user.preferences = await(getUserPreferenceByUserId(joinUserId));

        return responseFromUser(user);
    } catch(err){
        console.error(err.message);
        throw err;
    }
}
