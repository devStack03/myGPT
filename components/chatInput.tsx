"use client"
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import toast from 'react-hot-toast'
import ModelSelection from './ModelSelection'
import useSWR from "swr"
type Props = {
    chatId  : string
}
const ChatInput = ({chatId}: Props) => {

    const [prompt, setPrompt ] = useState("")
    const { data : session } = useSession()

    // useSWR TO GET MODEL
    const{ data : model} = useSWR("model", {
        fallbackData : "text-davinci-003"
      })

    const sendMessage = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!prompt) return;
        const input = prompt.trim()
        setPrompt("");
        const message : Message = {
            text : input,
            createdAt : serverTimestamp(),
            user : {
                _id : session?.user?.email!,
                name : session?.user?.name!,
                avatar : session?.user?.image! || `https://ui-avatars.com/api/${session?.user?.name}`
            }
        }

        await addDoc(
            collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
            message)


            // Toast Notification
            const notification = toast.loading("Abeg, wait make i cook finish...")

            // our api to get Data
            await fetch('/api/askQuestion', {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify({
                    prompt : input, chatId, model, session
                })
            }).then(()=>{
                toast.success("Egbon! i don cook finish oo", {
                    id : notification
                })
            })
    }
  return ( 
    <div className='bg-gray-700/50 text-green-400 rounded-lg text-sm'>
        <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
            <input type="text"  className='focus:outline-none bg-transparent flex-1
            disabled:cursor-not-allowed disabled:text-gray-300'
            disabled={!session}
            value={prompt}
            onChange={(e)=> setPrompt(e.target.value)}
            placeholder='Egbon! Ask your question here...'
            />
            <button type='submit'
            className='bg-[#11837F] hover:opacity-70 font-bold text-white rounded px-4 py-2 cursor-pointer
            disabled:cursor-not-allowed disabled:text-gray-300'
            disabled={!prompt || !session}>
                <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
            </button>
        </form>

        {/* Model selection goes here */}
        <div className='md:hidden'>
        <ModelSelection />
        </div>
    </div>
  )
}

export default ChatInput