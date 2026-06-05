import api from "@/lib/api"

export const userService={

getMe:()=>{

return api.get(

"/users/me/"

)

}

}