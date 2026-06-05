"use client"

import { useEffect, useState } from "react"

import api from "@/lib/api"

export default function UsersPage() {

const [user,setUser]=useState(null)

const [loading,setLoading]=useState(true)

const [error,setError]=useState("")


useEffect(()=>{

const loadUser=async()=>{

try{

const token=

localStorage.getItem(
"access_token"
)

console.log(
"TOKEN:",
token
)

const response=

await api.get(
"/users/me/"
)

console.log(
response.data
)

setUser(
response.data
)

}
catch(err){

console.log(
err.response?.data
)

setError(
"Error loading user"
)

}
finally{

setLoading(false)

}

}

loadUser()

},[])


if(loading){

return(

<div className="p-6">

Loading...

</div>

)

}


if(error){

return(

<div className="p-6 text-red-500">

{error}

</div>

)

}


return(

<div className="p-6">

<h1 className="text-4xl font-bold mb-8">

User Profile

</h1>

<div className="border rounded p-6 space-y-2 max-w-xl">

<p>

<strong>ID:</strong>

{user.id}

</p>

<p>

<strong>Name:</strong>

{user.first_name}

{" "}

{user.last_name}

</p>

<p>

<strong>Email:</strong>

{user.email}

</p>

<p>

<strong>Language:</strong>

{user.profile?.primary_language}

</p>

<p>

<strong>Bio:</strong>

{user.profile?.bio}

</p>

<p>

<strong>Reputation:</strong>

{user.profile?.reputation_points}

</p>

</div>

</div>

)

}