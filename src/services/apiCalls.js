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

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Error en la respuesta del servidor');
        }

        return data;
    } catch (error) {
        console.error('Error en la función LoginUser:', error);
        throw error;
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

export const GetProfile = async (credentials) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
    };

    try {
        const response = await fetch(`${root}users/profile`, options);
        const data = await response.json();

        if (response.status !== 200 || !data.success) {
            throw new Error(data.message || 'Error en la solicitud al servidor');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        throw error;
    }
};




export const UpdateProfile = async (credentials, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/profile`, options);
        const data = await response.json();

        if(!data.success) {
            throw new Error(data.message)
        }

        return data;
    } catch (error) {
        return error;
    }
}; 

export const GetPosts = async (credentials) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        
    };

    try {
        const response = await fetch(`${root}posts`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        const postData = data.data;

        return postData;
    } catch (error) {
        return error;
    }
}


export const GetOwnPosts = async (credentials) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        
    };

    try {
        const response = await fetch(`${root}posts/own`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        const postData = data.data;
        return postData;
    } catch (error) {
        return error;
    }
}

export const DeletePost = async (credentials, postId) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials}`
        },
    };

    try {
        const response = await fetch(`${root}posts/${postId}`, options);
        const responseData = await response.json();

        console.log("data de respuesta:", responseData);

        if (!response.ok) {
            throw new Error(responseData.message || 'Error en la solicitud DELETE');
        }

        if (!responseData.success) {
            throw new Error(responseData.message || 'Error eliminando el post');
        }

        return responseData;
    } catch (error) {
        console.error("Error en la solicitud DELETE:", error);
        throw error; 
    }
};

export const CreatePost = async (credentials, data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}posts`, options);
        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(responseData.message);
        }

        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const GetUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}users`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        const servicesData = data.data;
        return servicesData;
    } catch (error) {
        throw new Error(error);
    }
}

export const DeleteUser = async (token, data) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/${data.id}`, options);
        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(responseData.message);
        }

        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const PostLikes = async (credentials, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}posts/${data.id}`, options);
        const data = await response.json();

        if(!data.success) {
            throw new Error(data.message)
        }

        return data;
    } catch (error) {
        return error;
    }
}; 





