'use server'
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite"
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_MESSAGE_REPLIES_ID: MESSAGE_REPLIES_ID,
} = process.env

export const getMessageReplies = async (messageId) => {
    try {
        const { database } = await createAdminClient()
        const messageReplies = await database.listDocuments(
            DATABASE_ID,
            MESSAGE_REPLIES_ID,
            [Query.equal('messageId', [messageId])]
        )
        if (!messageReplies) throw new Error('Error getting message replies')
        return parseStringify(messageReplies.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const createMessageReply = async (replyData) => {
    try {
        const { database } = await createAdminClient()
        const reply = await database.createDocument(
            DATABASE_ID,
            MESSAGE_REPLIES_ID,
            ID.unique(),
            replyData
        )
        if (!reply) throw new Error('Error creating message reply')
        return parseStringify(reply)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateMessageReply = async (id, replyData) => {
    try {
        const { database } = await createAdminClient()
        const reply = await database.updateDocument(
            DATABASE_ID,
            MESSAGE_REPLIES_ID,
            id,
            replyData
        )
        if (!reply) throw new Error('Error updating message reply')
        return parseStringify(reply)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteMessageReply = async (id) => {
    try {
        const { database } = await createAdminClient()
        await database.deleteDocument(
            DATABASE_ID,
            MESSAGE_REPLIES_ID,
            id
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}