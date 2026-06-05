"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import {

ArrowLeft,

Code2,

Palette,

MessageSquare,

Users,

Briefcase,

Sprout,

Clock,

Hash,

} from "lucide-react"

import Link from "next/link"

import { skillsService } from "@/services/skills.service"


const ICONS={

technical:Code2,

creative:Palette,

communication:MessageSquare,

leadership:Users,

business:Briefcase,

personal_development:Sprout,

}


const CATEGORY_LABELS={

technical:"Technical",

creative:"Creative",

communication:"Communication",

leadership:"Leadership",

business:"Business",

personal_development:"Personal Development",

}


function Badge({level}){

const styles={

beginner:{

bg:"#dcfce7",

color:"#16a34a",

},

intermediate:{

bg:"#dbeafe",

color:"#2563eb",

},

advanced:{

bg:"#ffedd5",

color:"#ea580c",

},

}

const s=

styles[level]

||

{

bg:"#f1f5f9",

color:"#64748b",

}


return(

<div

style={{

padding:"6px 14px",

borderRadius:"999px",

background:s.bg,

color:s.color,

fontWeight:600,

fontSize:"13px",

display:"inline-block",

}}

>

{

level?.charAt(0).toUpperCase()

+

level?.slice(1)

}

</div>

)

}


export default function SkillDetail(){


const params=

useParams()

const id=

params.id


const [skill,setSkill]=

useState(null)

const [loading,setLoading]=

useState(true)


useEffect(()=>{

const load=async()=>{

try{

const response=

await skillsService

.getSkillById(id)

setSkill(

response.data

)

}

catch(err){

console.log(err)

}

finally{

setLoading(false)

}

}

if(id){

load()

}

},[id])


if(loading){

return(

<div>

Cargando...

</div>

)

}


if(!skill){

return(

<div>

Skill no encontrada

</div>

)

}


const Icon=

ICONS[skill.category]

||

Code2


return(

<div

style={{

maxWidth:"900px",

margin:"0 auto",

display:"flex",

flexDirection:"column",

gap:"24px",

}}

>

<Link

href="/dashboard/skills"

style={{

display:"flex",

alignItems:"center",

gap:"8px",

textDecoration:"none",

color:"#64748b",

fontWeight:500,

}}

>

<ArrowLeft size={18}/>

Volver a skills

</Link>


<div

style={{

background:"#ffffff",

border:"1px solid #e2e8f0",

borderRadius:"24px",

padding:"40px",

boxShadow:

"0 4px 14px rgba(0,0,0,.05)",

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

flexWrap:"wrap",

gap:"20px",

}}

>

<div

style={{

display:"flex",

alignItems:"center",

gap:"20px",

}}

>

<div

style={{

width:"90px",

height:"90px",

borderRadius:"22px",

background:"#eff6ff",

display:"flex",

alignItems:"center",

justifyContent:"center",

}}

>

<Icon

size={42}

color="#2563eb"

/>

</div>


<div>

<h1

style={{

fontSize:"36px",

fontWeight:700,

margin:0,

}}

>

{skill.name}

</h1>


<p

style={{

marginTop:"10px",

color:"#64748b",

fontSize:"15px",

}}

>

{

CATEGORY_LABELS[

skill.category

]

}

</p>

</div>

</div>


<Badge

level={skill.level}

/>

</div>


<div

style={{

marginTop:"40px",

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(220px,1fr))",

gap:"18px",

}}

>

<Card

icon={<Hash size={20}/>}

title="Skill ID"

value={skill.id}

/>


<Card

icon={<Clock size={20}/>}

title="Created"

value={

new Date(

skill.created_at

)

.toLocaleDateString()

}

/>


<Card

icon={<Icon size={20}/>}

title="Category"

value={

CATEGORY_LABELS[

skill.category

]

}

/>


<Card

icon={<Code2 size={20}/>}

title="Level"

value={

skill.level

? skill.level.charAt(0).toUpperCase()

+ skill.level.slice(1)

: "-"

}

/>

</div>

</div>

</div>

)

}


function Card({

icon,

title,

value,

}){

return(

<div

style={{

background:"#ffffff",

border:"1px solid #e2e8f0",

padding:"24px",

borderRadius:"18px",

boxShadow:

"0 2px 6px rgba(0,0,0,.03)",

}}

>

<div

style={{

display:"flex",

alignItems:"center",

gap:"10px",

color:"#64748b",

marginBottom:"16px",

}}

>

{icon}

<span>

{title}

</span>

</div>


<h3

style={{

fontSize:"22px",

margin:0,

color:"#0f172a",

}}

>

{value}

</h3>

</div>

)

}