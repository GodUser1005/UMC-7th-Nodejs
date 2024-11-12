export const bodyToUser = (body) => {
    const {name, e_mail, gender, address, food_categories} = body;
    const birth = new Date(body.birth);

    return {
        name: name,
        e_mail: e_mail,
        gender: gender,
        birth: birth,
        address: address,
        food_categories: food_categories,
    };
};

export const responseFromUser = (user) => {
    const {id, name, e_mail, gender, birth, address, preferences} = user;
    
    return {
        id: id,
        name: name,
        e_mail: e_mail,
        gender: gender,
        birth: birth,
        address: address,
        preferences: preferences,
    };
};