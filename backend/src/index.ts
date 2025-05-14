import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './user';
import { blogRouter } from './blog';


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.use(cors())
app.get('/',(c)=>{
	return c.text("Hello noni");
})

app.route('/api/v1/',userRouter)
app.route('/api/v1/blog',blogRouter)


export default app;