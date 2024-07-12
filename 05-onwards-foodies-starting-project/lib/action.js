'use server';

import { revalidatePath } from "next/cache";
import { savemeal } from "./meals";
import {redirect} from 'next/navigation'
function isInvalidText(text){
return !text||text.trim()==='';
}
 export async function sharemeal(prevstate,formdata){
    
const meal={
title:formdata.get('title'),
summary:formdata.get('summary'),
instructions:formdata.get('instructions'),
image:formdata.get('image'),
creator:formdata.get('name'),
creator_email:formdata.get('email')
};

if(
    isInvalidText(meal.title)||
    isInvalidText(meal.summary)||
    isInvalidText(meal.instructions)||
    isInvalidText(meal.creator)||
    isInvalidText(meal.creator_email)||
    !meal.creator_email.includes('@')||
    !meal.image||
   meal.image.size===0
){
   return{
    message:'Invalid Input'
   }
}
await savemeal(meal);
revalidatePath('/meals');
redirect('/meals');
}