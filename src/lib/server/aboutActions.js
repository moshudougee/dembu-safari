'use server'

import { ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { createAdminClient } from "./appwrite";


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_ABOUT_ID: ABOUT_ID,
} = process.env

export const getAbout = async () => {
    try {
        const { database } = await createAdminClient()
        const about = await database.listDocuments(
            DATABASE_ID,
            ABOUT_ID
        )
        if (!about) throw new Error('Error getting about')
        return parseStringify(about.documents[0])
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getSingleAbout = async (id) => {
    try {
        const { database } = await createAdminClient()
        const about = await database.getDocument(
            DATABASE_ID,
            ABOUT_ID,
            id
        )
        if (!about) throw new Error('Error getting about')
        return parseStringify(about)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const createAbout = async (aboutData) => {
    try {
        const { database } = await createAdminClient()
        const about = await database.createDocument(
            DATABASE_ID,
            ABOUT_ID,
            ID.unique(),
            aboutData
        )
        if (!about) throw new Error('Error creating about')
        return parseStringify(about)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateAbout = async (id, aboutData) => {
    try {
        const { database } = await createAdminClient()
        const about = await database.updateDocument(
            DATABASE_ID,
            ABOUT_ID,
            id,
            aboutData
        )
        if (!about) throw new Error('Error updating about')
        return parseStringify(about)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteAbout = async (id) => {
    try {
        const { database } = await createAdminClient()
        await database.deleteDocument(
            DATABASE_ID,
            ABOUT_ID,
            id
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}