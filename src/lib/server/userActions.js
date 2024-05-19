'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite"
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_INFO_ID: USER_INFO_ID,
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
    const { email, firstName, lastName } = userData
    const name = `${firstName} ${lastName}`
    let newUserAccount
    try {
        const { account, database, avatars } = await createAdminClient()

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if (!newUserAccount) throw new Error('Error creating user')
        const avatarUrl = '/images/prof1small.jpg'
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