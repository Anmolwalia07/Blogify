import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signinInput , signupInput} from '@anmolwalia07/medium-common'



export const userRouter=new Hono<
{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
    Variables:Variables
}>()

type Variables={
  userId:string
}

userRouter.post('/register', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());


	const body = await c.req.json();

    const response=signupInput.safeParse(body);

  if(!response.success){
    c.status(400)
    return c.json({message:"Invaild Details"});
  }
	try {

    const existUser=await prisma.user.findFirst({
      where:{
        email:body.email
      }
    })

    if(existUser){
      c.status(400)
      return c.json({message :"Email already exists"});
    }

		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
        name:body.name
			}
		});
    c.status(201)
		return c.json({message:"SignUp Successfully"})
	} catch(e) {
		c.status(403);
		return c.json({ message: "Internal Error"});
	}
})


userRouter.post("/login",async(c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  const body=await c.req.json();
  const response=signinInput.safeParse(body)
  if(!response.success){
    c.status(401)
    return c.json({message:"Invaild Details"});
  }
  const {email,password}=body
  try{
    const user=await prisma.user.findUnique({
      where:{
        email:email
      }
    })
    if(!user){
      c.status(401)
      return c.json({message :"Invaild Email"})
    }
  
    const isMatch=(user.password===password);
    if(!isMatch){
      c.status(400)
      return c.json({message :"Invaild Password"});
    }

    const jwt = await sign({ id: user.id ,exp: Math.floor(Date.now() / 1000) + 60 * 60}, c.env.JWT_SECRET,);
		c.status(201)
    return c.json({ jwt });
  }
  catch(e){
    c.status(401);
    return c.json({message:"Internal Error"})
  }
})

userRouter.use("/user/*",async(c,next)=>{
  const token=c.req.header("Authorization")?.split(" ")[1];
  if(!token){
    return c.json({message :"No token"})
  }
  try{
    const decode=await verify(token,c.env.JWT_SECRET);
  if(!decode){
    return c.json({message:"Unauthorised"})
  }

  c.set('userId',String(decode.id))
  await next();
  }catch(e){
    return c.json({message:"unauthorised"})
  }
})

userRouter.post("/user/saveblog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = Number(c.get("userId")); // Ensure "userId" is set in the context
  const body = await c.req.json(); // Should contain postId

  try {
    const response = await prisma.savedPost.create({
      data: {
        userId: id,
        postId: body.postId,
      },
    });
     c.status(201)
     return c.json({ message: "Saved" });
  } catch (e) {
     c.status(400)
     return c.json({ message: "Error saving post", error: e });
  }
});


userRouter.delete("/user/unsaveblog/:postId",async(c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const id=Number(c.get("userId"));
  const postId=Number(c.req.param("postId"))
  try{
    const response=await prisma.savedPost.delete({
      where:{
        userId_postId:{
          userId:id,
          postId:postId,
        }
      }
    })
    c.status(201)
    return c.json({message:"UnSaved"})
  }catch(e){
    c.status(401)
    return c.json({message:"Internal Error"})
  }
})

userRouter.delete("/user/unlikeblog/:postId",async(c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const id=Number(c.get("userId"));
  const postId=Number(c.req.param("postId"))
  try{
    const response=await prisma.likedPost.delete({
      where:{
        userId_postId:{
          userId:id,
          postId:postId,
        }
      }
    })
    c.status(201)
    return c.json({message:"UnSaved"})
  }catch(e){
    c.status(401)
    return c.json({message:"Internal Error"})
  }
})

userRouter.post("/user/likeblog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = Number(c.get("userId")); // Ensure "userId" is set in the context
  const body = await c.req.json(); // Should contain postId

  try {
    const response = await prisma.likedPost.create({
      data: {
        userId: id,
        postId: body.postId,
      },
    });

     c.status(201)
     return c.json({ message: "Saved" });
  } catch (e) {
     c.status(400)
     return c.json({ message: "Error saving post", error: e });
  }
});

userRouter.get("/user/profile",async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const id=Number(c.get("userId"));
  try{
    const user=await prisma.user.findUnique({
      where:{
        id:id
      },
      include:{
        savedPosts:{
          select:{
            postId:true,
          }
        },
        likedPosts:{
          select:{
            postId:true
          }
        },
        posts:{
          select:{
            id:true
          }
        }
      }
    })

    return c.json({user:user})
  }
  catch(e){
    return c.json({message:"Internal Error"})
  }
})

userRouter.put("/user/updateProfile",async(c)=>{
   const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const id=Number(c.get("userId"));
  const body=await c.req.json()
  try{
    await prisma.user.update({
    where:{
      id:id
    },
    data:{
      name:body.name,
      bio:body.bio,
      picture:body.picture,
    }
  })

  c.status(201)
  return c.json({message:"Updated Successfully"})
  }
  catch(e){
    c.status(401)
    return c.json({message:"Internal Error"})
  }
})

userRouter.get("/user/profile/:id",async(c)=>{
   const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  const id=Number(c.req.param("id"))
  try{
    const user=await prisma.user.findUnique({
      where:{
        id:id,
      },
      include:{
        posts:{
          select:{
            id:true,
            likeCount:true,
            title:true,
            content:true,
            author:true,
            updatedAt:true,
            authorId:true,
          }
        },
      }
    })

    c.status(201)
    return c.json({user:user})
  }catch(err){
    c.status(401)
    c.json({message:"Internal Server"})
  }
})