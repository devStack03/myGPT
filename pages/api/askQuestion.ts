// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "firebase-admin"
import { adminDB } from '../../firebaseAdmin';
import query from '../../lib/queryAPI';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { prompt, chatId, model, session } = req.body;
    if(!prompt){
        res.status(400).json({
            answer : "Please kindly provide a prompt"
        })
    }
    if(!chatId){
        res.status(400).json({
            answer : "Please kindly provide a prompt"
        })
    }

const response = await query(prompt, chatId, model);
console.log("the response is", response)
const message : Message = {
    text : response || "ChatGPT no get am oo",
    createdAt : admin.firestore.Timestamp.now(),
    user : {
        _id : "ChatGPT",
        name : "ChatGPT",
        avatar : "https://links.papareact.com/89k"
    }
}

await adminDB
.collection("users")
.doc(session?.user?.email!)
.collection("chats")
.doc(chatId)
.collection("messages")
.add(message)


res.status(200).json({
    answer  : message.text 
})
}
