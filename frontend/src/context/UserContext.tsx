import React, { createContext, useState, type ReactNode } from 'react';
import type { item, LikedPosts, SavedPosts } from '../App';

// 1. User type
interface User {
  id:number,
  name:string,
  email:string,
  bio:string,
  picture:string,
  password:string,
  likedPosts:LikedPosts[],
  savedPosts:SavedPosts[],
  posts:item[]
}



interface Post {
  title: string;
  content: string;
}

type DraftedCount=number


type Blog=object[]
// 2. Context type

export interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  post :Post;
  setPost:React.Dispatch<React.SetStateAction<Post>>;
  blog:Blog,
  setBlog:React.Dispatch<React.SetStateAction<Blog>>;
  draftedCount:DraftedCount,
  setDraftedCount:React.Dispatch<React.SetStateAction<DraftedCount>>;
}



// 3. Create context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Props for provider
interface UserProviderProps {
  children: ReactNode;
}

// 5. Provider component
export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({ name: '', email: '' ,id:0,bio:'',picture:'',password:'',posts:[],likedPosts:[],savedPosts:[]});
  const [post, setPost] = useState<Post>({ title: '',content: ''})
  const [blog, setBlog]=useState<Blog>([]);
  const [draftedCount, setDraftedCount] = useState<DraftedCount>(0)

  return (
    <UserContext.Provider value={{ user, setUser ,post ,setPost,blog,setBlog,draftedCount,setDraftedCount}}>
      {children}
    </UserContext.Provider>
  );
}
