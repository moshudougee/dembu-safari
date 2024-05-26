import { createAdminClient } from "@/lib/server/appwrite"
import { ID, InputFile } from "node-appwrite"

export const POST = async (req) => {
    const BUCKET_ID = process.env.APPWRITE_BUCKET_ID
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT
    try {
        const { storage } = await createAdminClient()
        const data = await req.formData()
        const file = data.get('file')
        if (file) {
            //console.log(file)
            const ext = file.name.split('.').pop()
            const newFileName = `${Date.now()}.${ext}`
            const chunks = []
            for await (const chunk of file.stream()) {
                chunks.push(chunk)
            }
            const buffer = Buffer.concat(chunks)
            const response = await storage.createFile(
                BUCKET_ID,
                ID.unique(),
                InputFile.fromBuffer(buffer, newFileName)
            )
            if (!response) throw new Error('Error uploading file')
            const url = `${endpoint}/storage/buckets/${response.bucketId}/files/${response.$id}/view?project=${project}`
            return Response.json({url})
        }else {
            return new Response('No file uploaded, Cannot get file ', { status: 400 });
        }
    } catch (error) {
        console.log(error)
        return new Response('Internal Server error, Upload Images', { status: 500 });
    }
}

export const DELETE = async(req) => {
    const BUCKET_ID = process.env.APPWRITE_BUCKET_ID
    try {
        const { storage } = await createAdminClient()
        const url = new URL(req.url)
        const fileId = url.searchParams.get('fileId')
        await storage.deleteFile(BUCKET_ID, fileId)
        return Response.json(true)
        
    } catch (error) {
        console.log(error)
        return new Response('Internal Server error, Delete Image', { status: 500 });
    }
}