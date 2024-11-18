import { responseFromUser, responseFromUserPrisma } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferenceByUserId,
    setPreference,
    addUserPrisma,
    getUserPrisma,
    getUserPreferenceByUserIdPrisma,
    setPreferencePrisma,
} from "../repositories/user.repository.js";

export const userSignUpService = async (userData, food_categories) => {
<<<<<<< HEAD

    const joinUserId = await addUserPrisma(userData)
        .catch((err) => {
            err.data.food_categories = food_categories;
            return Promise.reject(err);
        })

    for (const category_id of food_categories){
        await setPreferencePrisma(joinUserId, category_id);
=======
    
    try{
        const joinUserId = await addUserPrisma(userData);

        for (const category_id of food_categories){
            await setPreferencePrisma(joinUserId, category_id);
        }

        const user = await getUserPrisma(joinUserId);
        user.preferences = await(getUserPreferenceByUserIdPrisma(joinUserId));

        return responseFromUserPrisma(user);
    } catch(err){
        console.error(err.message);
        throw err;
>>>>>>> feature/mission-06
    }

    const user = await getUserPrisma(joinUserId);
    user.preferences = await(getUserPreferenceByUserIdPrisma(joinUserId));
    
    return responseFromUserPrisma(user);
}
