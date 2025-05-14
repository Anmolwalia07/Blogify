import React, { createContext, useState, type ReactNode } from 'react';

// 1. User type
interface User {
  name: string;
  email: string;
}

interface Post {
  title: string;
  content: string;
}

// 2. Context type
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  post :Post;
  setPost:React.Dispatch<React.SetStateAction<Post>>;
}



// 3. Create context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Props for provider
interface UserProviderProps {
  children: ReactNode;
}

// 5. Provider component
export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({ name: '', email: '' });
  const [post, setPost] = useState<Post>({ title: '',content: ''})

  return (
    <UserContext.Provider value={{ user, setUser ,post ,setPost}}>
      {children}
    </UserContext.Provider>
  );
}
