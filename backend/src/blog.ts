import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "./generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {createPostInput, updatePostInput} from "@anmolwalia07/medium-common"

export const blogRouter=new Hono<
{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string,
    },
    Variables:Variables
}>()

type Variables={
    userId:string
}




blogRouter.use("/*",async(c,next)=>{
    const token=c.req.header("Authorization")?.split(" ")[1];
    if(!token){
      return c.json({message:"No token"});
    }
    try{
      const decode= await verify(token,c.env.JWT_SECRET);
    if(decode){
    console.log(decode.id)
      c.set('userId', String(decode.id));
      await next();
    }
    }
    catch(e){
      return c.json({message:"Unauthorized"})
    }
  })

blogRouter.post('/create', async (c) => {
	const userId = c.get('userId'); 
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try{
    const body = await c.req.json();
    const response=createPostInput.safeParse(body);
    if(!response.success){
        c.status(400)
        return c.json({message:"Insufficient content"})
    }
    console.log(body)
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
            published:body.publish || false,
			authorId: Number(userId),
		}
	});
	return c.json({
        message:"Uploaded Successfully",
		id: post.id
	});
    }catch(e){
        c.status(400)
        return c.json({message:"Internal Server Error"})
    }
})

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({});

	return c.json(posts);
})

blogRouter.get("/:id",async(c)=>{
    const id=Number(c.req.param("id"));
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
    const response=await prisma.post.findUnique({
        where:{
            id:id
        }
    })

    return c.json({
        response
    })

    }catch(e){
        return c.json({
            message:e
        })
    }

})


blogRouter.put('/update', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const response=updatePostInput.safeParse(body);
    if(!response.success){
        return c.json({message:"Invaild details"})
    }
	try{
        prisma.post.update({
            where: {
                id: body.id,
                authorId: Number(userId)
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        c.status(201);
        return c.json({message:'updated post'});
    }catch(e){
        c.status(400)
        return c.json({error:"error"})
    }
});

