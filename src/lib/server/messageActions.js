'use server'
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite"
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_MESSAGES_ID: MESSAGES_ID,
} = process.env

export const getMessages = async (offset=0) => {
    try {
        const { database } = await createAdminClient()
        const messages = await database.listDocuments(
            DATABASE_ID,
            MESSAGES_ID,
            [Query.orderDesc('$createdAt'), Query.limit(10), Query.offset(offset)]
        )
        if (!messages) throw new Error('Error getting messages')
        return parseStringify(messages.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const countMessages = async () => {
    try {
        const { database } = await createAdminClient()
        const messages = await database.listDocuments(
            DATABASE_ID,
            MESSAGES_ID,
            [Query.limit(200)]
        )
        if (!messages) throw new Error('Error getting messages')
        return messages.total
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getUserMessages = async (userId, offset=0) => {
    try {
        const { database } = await createAdminClient()
        const messages = await database.listDocuments(
            DATABASE_ID,
            MESSAGES_ID,
            [Query.equal('userId', [userId]), Query.orderDesc('$createdAt'), Query.limit(10), Query.offset(offset)]
        )
        if (!messages) throw new Error('Error getting messages')
        return parseStringify(messages.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const countUserMessages = async (userId) => {
    try {
        const { database } = await createAdminClient()
        const messages = await database.listDocuments(
            DATABASE_ID,
            MESSAGES_ID,
            [Query.equal('userId', [userId]), Query.limit(100)]
        )
        if (!messages) throw new Error('Error getting messages')
        return messages.total
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getSingleMessage = async (id) => {
    try {
        const { database } = await createAdminClient()
        const message = await database.getDocument(
            DATABASE_ID,
            MESSAGES_ID,
            id
        )
        if (!message) throw new Error('Error getting message')
        return parseStringify(message)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const createMessage = async (messageData) => {
    try {
        const { database } = await createAdminClient()
        const message = await database.createDocument(
            DATABASE_ID,
            MESSAGES_ID,
            ID.unique(),
            messageData
        )
        if (!message) throw new Error('Error creating message')
        return parseStringify(message)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateMessage = async (id, messageData) => {
    try {
        const { database } = await createAdminClient()
        const message = await database.updateDocument(
            DATABASE_ID,
            MESSAGES_ID,
            id,
            messageData
        )
        if (!message) throw new Error('Error updating message')
        return parseStringify(message)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteMessage = async (id) => {
    try {
        const { database } = await createAdminClient()
        await database.deleteDocument(
            DATABASE_ID,
            MESSAGES_ID,
            id
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}