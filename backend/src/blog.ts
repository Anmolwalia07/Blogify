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
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
            published:body.publish || false,
			authorId: Number(userId),
		}
	});
	if(post.published){
        return c.json({
            message:"Uploaded Successfully",
            id: post.id
        });
    }else{
        return c.json({
            message:"Saved Successfully",
            id: post.id
        })
    }
    }catch(e){
        c.status(400)
        return c.json({message:"Internal Server Error"})
    }
})

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const skip = parseInt(c.req.query('skip') || '0');
    const take = parseInt(c.req.query('take') || '4');
	const posts = await prisma.post.findMany({
        skip,
        take,
        orderBy:{createdAt:'desc'},
        where:{
            published:true
        },
        include:{
            author:{
                select:{
                    name:true,
                    id:true,
                    picture:true
                }
            },
            savedBy:{
                select:{
                    postId:true,
                    userId:true,
                }
            },
            likedBy:{
                select:{
                    postId:true,
                    userId:true
                }
            }
        }
    });

	return c.json({posts:posts});
})

blogRouter.get('/myblogs', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const id= Number(c.get('userId'))
    const skip = parseInt(c.req.query('skip') || '0');
    const take = parseInt(c.req.query('take') || '4');
	const posts = await prisma.post.findMany({
        skip,
        take,
        orderBy:{createdAt:'desc'},
        where:{
            published:true,
            authorId:id
        },
       include:{
            author:{
                select:{
                    name:true,
                    id:true,
                    picture:true
                }
            },
            savedBy:{
                select:{
                    postId:true,
                    userId:true,
                }
            },
            likedBy:{
                select:{
                    postId:true,
                    userId:true
                }
            }
        }
    });

	return c.json({posts:posts});
})

blogRouter.get('/drafted/count',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const userId=c.get('userId')
	try{
        const posts = await prisma.post.findMany({
            where:{
                authorId:Number(userId),
                published:false,
            }
        });

        if(!posts){
             c.status(201)
             return c.json({totalPost:0})
        }
        c.status(201)
	    return c.json({totalPost:posts.length});
    }catch(e){
        c.status(400)
        return c.json({message:"Internal Error"})
    }
})

blogRouter.get('/drafted',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const userId=c.get('userId')
	try{
        const posts = await prisma.post.findMany({
            where:{
                authorId:Number(userId),
                published:false,
            }
        });

        if(!posts){
             c.status(201)
             return c.json({message:"No post"})
        }
        c.status(201)
	    return c.json({posts:posts});
    }catch(e){
        c.status(400)
        return c.json({message:"Internal Error"})
    }
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
        },
        include:{
            savedBy:{
                select:{
                    userId:true,
                    postId:true
                }
            },
            likedBy:{
                select:{
                    userId:true,
                    postId:true
                }
            }
        }
    })
    c.status(201)
    return c.json({
        blog:response
    })

    }catch(e){
        c.status(401)
        return c.json({
            message:e
        })
    }

})

blogRouter.put('/updateLikeCount/:id',async(c)=>{
    const id=Number(c.req.param("id"))
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body=await c.req.json();
   try{
     await prisma.post.update({
        where:{
            id:id,
        },
        data:{
            likeCount:body.likeCount,
        }
    })
    c.status(200);
    return c.json({message:"Like Updated"})
   }catch(err){
    c.status(401);
    return c.json({message:"Internal Error"})
   }
	
})

blogRouter.put('/blogedit/:id', async (c) => {
	const userId = c.get('userId');
    const id=Number(c.req.param("id"))
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const response=updatePostInput.safeParse(body);
    if(!response.success){
        return c.json({message:"Invaild details"})
    }
	try{
        await prisma.post.update({
            where: {
                id:id,
                authorId: Number(userId)
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        c.status(201);
        return c.json({message:'updated blog'});
    }catch(e){
        c.status(400)
        return c.json({error:"error"})
    }
});


blogRouter.put("/drafted-to-publish",async(c)=>{
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body=await c.req.json();

    try{
        await prisma.post.update({
            where: {
                id: body.id,
                authorId: Number(userId)
            },
            data: {
                published:true,
            }
        });
        c.status(201);
        return c.json({message:'Publish Successfully'});
    }catch(e){
        c.status(400)
        return c.json({error:"Internal error"})
    }
})

blogRouter.delete('/delete/:id',async(c)=>{
    const userId = c.get('userId');
    const id=Number(c.req.param("id"))
    console.log(id)
    console.log(userId)
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate()); 
    try{
        if(prisma.post.fields.published){
            await prisma.savedPost.deleteMany({
                where:{
                    postId:id,
                }
            })
            await prisma.likedPost.deleteMany({
                where:{
                    postId:id
                }
            })
        }
        await prisma.post.delete({
            where: {
                id: id,
                authorId: Number(userId)
            }
        })
        c.status(201);
        return c.json({message:'Blog Deleted'});
    }catch(e){
        c.status(400)
        console.log(e)
        return c.json({error:"error"})
    }
})


blogRouter.get("blogedit/:id",async(c)=>{
    const id=Number(c.req.param("id"));
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
    const response=await prisma.post.findUnique({
        where:{
            id:id
        },
        select:{
            authorId:true,
            id:true,
            title:true,
            content:true
        }
    })
    c.status(201)
    return c.json({
        blog:response
    })

    }catch(e){
        c.status(401)
        return c.json({
            message:"Internal Error"
        })
    }

})
