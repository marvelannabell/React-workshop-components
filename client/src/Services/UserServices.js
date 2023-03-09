const baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const responce = await fetch(baseUrl);
    const result = await responce.json();
    // console.log(result);

    return result.users;
};

export const getOne = async (userId) => {
    const responce = await fetch(`${baseUrl}/${userId}`);
    const result = await responce.json();
    // console.log(result.user);

    return result.user;
};

export const create = async (userData) => {
    // const data={
    //     firstName:userData.firstName,
    //     lastName: userData.lastName,
    //     email: userData.email,
    //     imageUrl: userData.imageUrl,
    //     phoneNumber: userData.phoneNumber,
    //     address: {
    //       country: userData.country,
    //       city: userData.city,
    //       street: userData.street,
    //       streetNumber: Number(userData.streetNumber),
    //     }
    //   }

    // const data={
    //     address:{
    //         streetNumber: userData.streetNumber,
    //         street: userData.street,
    //         city: userData.city,
    //         country: userData.country
    //     },
    //     firstName:userData.firstName,
    //     lastName: userData.lastName,
    //     email: userData.email,
    //     imageUrl: userData.imageUrl,
    //     phoneNumber: userData.phoneNumber,
    // }


    const { country, city, street, streetNumber, ...data } = userData
    data.address = {
        country,
        city,
        street,
        streetNumber,
    };
    // console.log(userData);

    console.log(data);

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result.user;
};

export const remove=async(userId)=>{
    const responce = await fetch(`${baseUrl}/${userId}`,{
        method: "DELETE",
    });

    const result = await responce.json();
    return result;
}