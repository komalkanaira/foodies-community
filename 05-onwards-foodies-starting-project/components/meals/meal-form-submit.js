'use client';
import {useFormStatus} from 'react-dom'
export default function MealFormSubmit(){
const {pending}=useFormStatus();
<button disabled={pending}>
    {pending?'submitting...':'Share Meal'}
</button>
}