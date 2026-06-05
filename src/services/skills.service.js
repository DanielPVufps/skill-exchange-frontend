import api from "@/lib/api";

export const skillsService = {

getAllSkills(){

return api.get("/skills/");

},

getSkillById(id){

return api.get(`/skills/${id}/`);

},

uploadImage(skillId,formData){

return api.patch(

`/skills/${skillId}/`,

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

)

}

}