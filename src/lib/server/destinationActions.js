'use server'

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { createAdminClient } from "./appwrite";


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_DESTINATIONS_ID: DESTINATIONS_ID,
} = process.env

export const getDestinations = async () => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID
        )
        if (!destinations) throw new Error('Error getting destinations')
        return parseStringify(destinations.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const countDestinations = async () => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.limit(200)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return destinations.total
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getAdminDestinations = async (offset) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.limit(10), Query.offset(offset)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return parseStringify(destinations.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getClientDestinations = async (offset) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.limit(6), Query.offset(offset)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return parseStringify(destinations.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getPopularDestinations = async (offset) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.equal('popular', ['YES']), Query.limit(6), Query.offset(offset)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return parseStringify(destinations.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const countPopularDestinations = async () => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.equal('popular', ['YES']), Query.limit(200)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return destinations.total
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getDestination = async (id) => {
    try {
        const { database } = await createAdminClient();
        const destination = await database.getDocument(
            DATABASE_ID,
            DESTINATIONS_ID,
            id
        )
        if (!destination) throw new Error('Error getting destination')
        return parseStringify(destination)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getCountyDestinations = async (id, offset) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.equal('countyId', [id]), Query.limit(6), Query.offset(offset)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return parseStringify(destinations.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const countCountyDestinations = async (id) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.equal('countyId', [id]), Query.limit(50)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return destinations.total
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getCategoryDestinations = async (id, offset) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.equal('categoryId', [id]), Query.limit(6), Query.offset(offset)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return parseStringify(destinations.documents)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const countCategoryDestinations = async (id) => {
    try {
        const { database } = await createAdminClient();
        const destinations = await database.listDocuments(
            DATABASE_ID,
            DESTINATIONS_ID,
            [Query.equal('categoryId', [id]), Query.limit(200)]
        )
        if (!destinations) throw new Error('Error getting destinations')
        return destinations.total
    } catch (error) {
        console.log(error)
        return false
    }
}

export const createDestination = async (destinationData) => {
    try {
        const { database } = await createAdminClient()
        const destination = await database.createDocument(
            DATABASE_ID,
            DESTINATIONS_ID,
            ID.unique(),
            destinationData
        )
        if (!destination) throw new Error('Error creating destination')
        return parseStringify(destination)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const updateDestination = async (id, destinationData) => {
    try {
        const { database } = await createAdminClient()
        const destination = await database.updateDocument(
            DATABASE_ID,
            DESTINATIONS_ID,
            id,
            destinationData
        )
        if (!destination) throw new Error('Error updating destination')
        return parseStringify(destination)
    } catch (error) {
        console.log('Error', error)
        return false
    }
}

export const deleteDestination = async (id) => {
    try {
        const { database } = await createAdminClient()
        await database.deleteDocument(
            DATABASE_ID,
            DESTINATIONS_ID,
            id
        )
        return true
    } catch (error) {
        console.log('Error', error)
        return false
    }
}