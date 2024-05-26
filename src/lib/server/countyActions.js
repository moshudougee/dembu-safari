'use server'

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { createAdminClient } from "./appwrite";


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_COUNTIES_ID: COUNTIES_ID,
} = process.env

export const getCounties = async () => {
    try {
        const { database } = await createAdminClient()
        const counties = await database.listDocuments(
            DATABASE_ID,
            COUNTIES_ID,
            [Query.limit(50)]
        )
        if (!counties) throw new Error('Error getting counties')
        //console.log(counties.total)
        return parseStringify(counties.documents)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const countCounties = async () => {
    try {
        const { database } = await createAdminClient()
        const counties = await database.listDocuments(
            DATABASE_ID,
            COUNTIES_ID,
            [Query.limit(50)]
        )
        if (!counties) throw new Error('Error getting counties')
        return counties.total
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const getPageCounties = async (offset=0) => {
    try {
        const { database } = await createAdminClient()
        const counties = await database.listDocuments(
            DATABASE_ID,
            COUNTIES_ID,
            [Query.limit(10), Query.offset(offset)]
        )
        if (!counties) throw new Error('Error getting counties')
        return parseStringify(counties.documents)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const getCounty = async (id) => {
    try {
        const { database } = await createAdminClient()
        const county = await database.getDocument(
            DATABASE_ID,
            COUNTIES_ID,
            id
        )
        if (!county) throw new Error('Error getting county')
        return parseStringify(county)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const createCounty = async (countyData) => {
    try {
        const { database } = await createAdminClient()
        const county = await database.createDocument(
            DATABASE_ID,
            COUNTIES_ID,
            ID.unique(),
            countyData
        )
        if (!county) throw new Error('Error creating county')
        return parseStringify(county)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const updateCounty = async (id, countyData) => {
    try {
        const { database } = await createAdminClient()
        const county = await database.updateDocument(
            DATABASE_ID,
            COUNTIES_ID,
            id,
            countyData
        )
        if (!county) throw new Error('Error updating county')
        return parseStringify(county)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const deleteCounty = async (id) => {
    try {
        const { database } = await createAdminClient()
        await database.deleteDocument(
            DATABASE_ID,
            COUNTIES_ID,
            id
        )
        return true
    } catch (error) {
        console.log('Error', error)
        return false
    }
}