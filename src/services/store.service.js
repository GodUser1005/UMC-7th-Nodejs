import {
    addStore,
    getStore
} from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";


export const addStoreService = async (storeData) => {
    try{

        const addStoreId = await addStore(storeData);
        const [store] = await getStore(addStoreId);

        return responseFromStore(store);
    }catch(err){
        console.error(err.message);
        throw err;
    }
}