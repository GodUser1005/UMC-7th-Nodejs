export const bodyToUser = (body) => {
    const {name, email, gender, address} = body;
    const birth = new Date(body.birth);

    return {
        name: name,
        email: email,
        gender: gender,
        birth: birth,
        address: address,
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

export const responseFromUserPrisma = (user) => {
    const {id, name, email, gender, birth, address, preferences} = user;
    const preferFoods = preferences.map((preference) => preference.foodCategory.name);
    
    return {
        id: id,
        name: name,
        e_mail: email,
        gender: gender,
        birth: new Date(birth),
        address: address,
        preferCategory: preferFoods,
    };
};