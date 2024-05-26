'use server'

import { ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { createAdminClient } from "./appwrite";


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_CATEGORIES_ID: CATEGORIES_ID,
} = process.env

export const getCategories = async () => {
    try {
        const { database } = await createAdminClient();
        const categories = await database.listDocuments(
            DATABASE_ID,
            CATEGORIES_ID
        )
        if (!categories) throw new Error('Error getting categories')
        return parseStringify(categories.documents)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const getCategory = async (id) => {
    try {
        const { database } = await createAdminClient();
        const category = await database.getDocument(
            DATABASE_ID,
            CATEGORIES_ID,
            id
        )
        if (!category) throw new Error('Error getting category')
        return parseStringify(category)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const createCategory = async (categoryData) => {
    try {
        const { database } = await createAdminClient();
        const category = await database.createDocument(
            DATABASE_ID,
            CATEGORIES_ID,
            ID.unique(),
            categoryData
        )
        if (!category) throw new Error('Error creating category')
        return parseStringify(category)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const updateCategory = async (id, categoryData) => {
    try {
        const { database } = await createAdminClient();
        const category = await database.updateDocument(
            DATABASE_ID,
            CATEGORIES_ID,
            id,
            categoryData
        )
        if (!category) throw new Error('Error updating category')
        return parseStringify(category)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const deleteCategory = async (id) => {
    try {
        const { database } = await createAdminClient()
        await database.deleteDocument(
            DATABASE_ID,
            CATEGORIES_ID,
            id
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}