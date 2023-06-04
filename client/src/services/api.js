import axios from 'axios';

const baseUrl = 'http://localhost:5000'

export const signUpUser = async ({email, password,name,age})=>{
   try { 
        const user =  await axios.post(
                    `${baseUrl}/api/users/signup`, 
                    {email,password,name,age});
    return user.data;
    } catch(error){
        return error.response.data.message;
    }
}

export const loginUser =  async ({email, password,})=>{
    try {
        const token =  await axios.post(
                        `${baseUrl}/api/users/login`,
                        {email,password});
        localStorage.clear();
        localStorage.setItem('token', token.data);
    } catch (error) {
            return 'An error occurred while logging in.'    
    }
}

export const logoutUser = async ()=>{
    try {
        localStorage.clear();
    } catch (error) {
        // return error.response.data.message;
    }
}
