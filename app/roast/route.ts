import {GoogleGenerativeAI} from "@google/generative-ai"
export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get("resume") as File
    if(file === null){
        return Response.json({error:"something went wrong"}, {status:400})
    }
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString("base64")
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"})
}