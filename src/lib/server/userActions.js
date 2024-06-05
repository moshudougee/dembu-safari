'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite"
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_INFO_ID: USER_INFO_ID,
    APPWRITE_BUCKET_ID: BUCKET_ID
} = process.env

export const checkSession = () => {
    try {
        const session = cookies().has('safari-session')
        if (session) return true
        return false
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const getUsers = async() => {
    try {
        const { database } = await createAdminClient();
        const users = await database.listDocuments(
            DATABASE_ID,
            USER_INFO_ID
        )
        if (!users) throw new Error('Error getting users')
        
        return parseStringify(users.documents)
    } catch (error) {
        console.log(error)
    }
} 

export const getUserInfo = async ({ userId }) => {
    try {
        const { database } = await createAdminClient();
        const user = await database.listDocuments(
            DATABASE_ID,
            USER_INFO_ID,
            [Query.equal('userId', userId)]
        )
        if (!user) throw new Error('Error getting user information')
        
        return parseStringify(user.documents[0])
    } catch (error) {
        console.log(error)
    }
    
}

export const login = async ({ email, password }) => {
    try {
       const { account } = await createAdminClient()
       const session = await account.createEmailPasswordSession(email, password)
       
       cookies().set("safari-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
       })
       const user = await getUserInfo({userId: session.userId})
       if (!user) throw new Error('Error getting user information')
    
       return parseStringify(user)
    } catch (error) {
       console.log(error) 
    }
}

export const register = async ({ password, ...userData }) => {
    const { email, firstName, lastName, imageUrl } = userData
    const name = `${firstName} ${lastName}`
    let newUserAccount, avatarUrl
    if (imageUrl) {
        avatarUrl = imageUrl
    }else {
        avatarUrl = '/images/profile.jpeg'
    }
    try {
        const { account, database, avatars } = await createAdminClient()

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if (!newUserAccount) throw new Error('Error creating user')
        
        const newUser = await database.createDocument(
            DATABASE_ID,
            USER_INFO_ID,
            ID.unique(),
            {
                email,
                firstName,
                lastName,
                avatar: avatarUrl,
                userId: newUserAccount.$id,
                avatar:avatarUrl
            }
        )
        if (!newUser) throw new Error('Error creating user information')
        
        const session = await account.createEmailPasswordSession(email, password)

        cookies().set("safari-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
       })

       return parseStringify(newUser)
        
    } catch (error) {
        console.log('Error', error)
    }
}

export const updateUser = async (id, userData) => {
    const { firstName, lastName, imageUrl } = userData
    let avatarUrl
    if (imageUrl) {
        avatarUrl = imageUrl
    }else {
        avatarUrl = '/images/profile.jpeg'
    }
    try {
        const { database } = await createAdminClient()
        const user = await database.updateDocument(
            DATABASE_ID,
            USER_INFO_ID,
            id,
            {
                firstName,
                lastName,
                avatar: avatarUrl
            }
        )
        if (!user) throw new Error('Error updating user')
        return parseStringify(user)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient()
        const result = await account.get()

        const user = await getUserInfo({ userId: result.$id })
        if (!user) throw new Error('Error getting user information')

        return parseStringify(user)
    } catch (error) {
        console.log('No user logged in')
        return null
    }
}

export const logout = async () => {
    try {
        const { account } = await createSessionClient()

        cookies().delete('safari-session')
        await account.deleteSession('current')
        return true
    } catch (error) {
        console.log('Error', error)
        return null
    }
}

export const checkImage = async (fileId) => {
    try {
        const { storage } = await createAdminClient()
        const response = await storage.getFile(
            BUCKET_ID,
            fileId
        )
        if (!response) throw new Error('Error uploading image')
        //console.log(response)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const forgotPassword = async (email) => {
    try {
        const { account, database } = await createAdminClient()
        const response = await database.listDocuments(
            DATABASE_ID,
            USER_INFO_ID,
            [Query.equal('email', [email])]
        )
        if (!response) throw new Error('Error checking email')
        //console.log(response)
        if(response.total > 0) {
            const domain = process.env.NEXT_PUBLIC_SITE_URL
            const url = `${domain}/forgot/reset`
            await account.createRecovery(email, url)
            return true
        } else {
            console.log('Server Error, Email not found')
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

export const resetPassword = async (userId, secret, password, confirmPassword) => {
    try {
        const { account } = await createAdminClient()
        await account.updateRecovery(userId, secret, password, confirmPassword)
        return true
    } catch (error) {
       console.log(error)
       return false 
    }
}