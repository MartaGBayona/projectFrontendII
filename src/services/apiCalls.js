const root = "http://localhost:4000/api/"

export const LoginUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    try {
        const response = await fetch(`${root}auth/login`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        // if(data.message === "Token Error"){
        //     dispatch(logout({ credentials: "" }))
        //   }

        return data;
    } catch (error) {
        return error;
    }
};

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    try {
        const response = await fetch(`${root}auth/register`, options)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};