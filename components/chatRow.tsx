"use client"
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

type Props = {
    id : string
}
const ChatRow = ({id} : Props) => {
    const pathName = usePathname();
    const router = useRouter();
    const { data : session } = useSession();
    const [active, setActive ] = useState(false)

    const [messages]  = useCollection(session && query(collection(db, "users", session.user?.email!, "chats",
    id, "messages"), orderBy("createdAt", "asc") ))
    useEffect(()=>{
        if(!pathName) return;
        setActive(pathName.includes(id))
    }, [pathName])
    const removeChat = async ()=>{
        await deleteDoc(doc(db, "users", session?.user?.email! , "chats", id));
        router.replace("/")
    }

  return (
    <Link href={`/chats/${id}`} className={`chatRow justify-center ${ active && "bg-gray-700/50"}`}>
        <ChatBubbleLeftIcon className='h-5 w-5'/>
        <p className='flex-1 hidden md:inline-flex truncate'>
            {messages?.docs[0]?.data().text || "New Chat"}
        </p>
        <TrashIcon onClick={removeChat}  className='h-5 w-5 text-gray-700 hover:text-red-700' />
    </Link>
  )
}

export default ChatRow