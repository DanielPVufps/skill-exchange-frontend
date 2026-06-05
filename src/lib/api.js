import axios from "axios"

const api = axios.create({

baseURL:

process.env
.NEXT_PUBLIC_API_BASE_URL

})


api.interceptors.request.use(

(config)=>{

const token=

typeof window!=="undefined"

?

localStorage.getItem(
"access_token"
)

:

null


if(token){

config.headers.Authorization=

`Bearer ${token}`

}

return config

}

)



api.interceptors.response.use(

(response)=>response,

async(error)=>{

const originalRequest=

error.config


if(

error.response?.status===401

&&

!originalRequest._retry

){

originalRequest._retry=true


try{

const refresh=

localStorage.getItem(

"refresh_token"

)


const response=

await axios.post(

`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`,

{

refresh

}

)


localStorage.setItem(

"access_token",

response.data.access

)


originalRequest.headers.Authorization=

`Bearer ${response.data.access}`


return api(

originalRequest

)

}

catch(err){

localStorage.removeItem(
"access_token"
)

localStorage.removeItem(
"refresh_token"
)

window.location.href=

"/login"

}

}


return Promise.reject(
error
)

}

)



export default api