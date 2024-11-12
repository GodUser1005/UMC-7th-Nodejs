export const bodyToStore = (body) => {
    const {name, address, location_id, category_id} = body;
    return{
        name: name,
        address: address,
        location_id: location_id,
        category_id: category_id,
    };
};

export const responseFromStore = (store) => {
    const {store_id, store_name, location_name, category_name} = store;
    return {
        store: {
            store_id: store_id,
            store_name: store_name,
            location_name: location_name,
            category_name: category_name,
        },
        message: "사장님의 개업을 축하해요!!",
    }
}