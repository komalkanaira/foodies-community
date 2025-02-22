import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs'

const db=sql('meals.db');
export   function  getMeals(){
   return  db.prepare('SELECT * FROM meals').all();
}
export function getmeal(slug){
   return db.prepare('SELECT * FROM meals WHERE slug= ?').get(slug);
}

export async function savemeal(meal){
meal.slug=slugify(meal.title,{lower:true});
meal.instructions=xss(meal.instructions);
const extension=meal.image.name.split('.').pop();
const filename=`${meal.slug}.${extension}`;

const stream=fs.createWriteStream(`public/images/${filename}`);
const bufferedimage=await meal.image.arrayBuffer();

stream.write(Buffer.from(bufferedimage),(error)=>{
if(error){
   throw new Error('Saving Image Filed');
}
});
meal.image=`/images/${filename}`;

db.prepare(`
  INSERT INTO meals 
  (title,summary ,instructions,creator,creator_email,image,slug) 
  VALUES
  ( @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug)
   `).run(meal);
}