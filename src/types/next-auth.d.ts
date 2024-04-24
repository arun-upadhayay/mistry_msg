
import 'next-auth'

declare module 'next-auth' {
    interface User{
        _id?:string
        isverified?:boolean
        isAccepingMessages?:boolean
        username?:string
        email?:string
        password?:string
        // image?:string
        // bio?:string
        // followers?:string[]
        // following?:string[]
        // createdAt?:string
        // updatedAt?:string
    }
    interface Session{
        user:{
            _id?:string
            isverified?:boolean
            isAccepingMessages?:boolean
            username?:string
            email?:string
            password?:string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string
            isverified?:boolean
            isAccepingMessages?:boolean
            username?:string
            email?:string
            password?:string
    }
}