"use client";

import { useState } from "react";
import { skillsService } from "@/services/skills.service";

export default function UploadSkillModal({

    open,
    onClose,
    skill,
    reload

}) {

const [file,setFile]=useState(null)

const [loading,setLoading]=useState(false)

if(!open) return null


const uploadImage=async()=>{

if(!file){

alert("Select image")

return

}

try{

setLoading(true)

const formData=new FormData()

formData.append(
"profile_picture",
file
)

await skillsService.uploadImage(
skill.id,
formData
)

reload()

onClose()

}
catch{

alert("Error uploading image")

}
finally{

setLoading(false)

}

}


return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white p-6 rounded-lg w-[450px]">

<h2 className="text-2xl font-bold mb-5">

Upload Image

</h2>


<input

type="file"

accept="image/*"

onChange={(e)=>{

setFile(
e.target.files[0]
)

}}

/>


<button

onClick={uploadImage}

className="w-full mt-5 bg-black text-white p-3 rounded"

>

{

loading ?

"Uploading..."

:

"Save Image"

}

</button>


<button

onClick={onClose}

className="mt-4"

>

Close

</button>

</div>

</div>

)

}