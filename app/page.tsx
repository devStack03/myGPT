import React from 'react'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/solid'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen px-2 overflow-hidden text-white'>
        <h1 className='text-5xl font-bold mb-20'>TalkGPT</h1>

        <div className='space-x-2 text-center flex flex-col md:flex-row'>
            <div>
                <div className='flex flex-col items-center mb-5 justify-center'>
                <SunIcon className="h-8 w-8"/>
                    <p>Examples</p>
                </div>
                <div className='space-y-2'>
                    <p className='infoText'>Explain something to me</p>
                    <p className='infoText'> What is the difference between a cat and Dog</p>
                </div>
            </div>
            <div>
                <div className='flex flex-col items-center mb-5 justify-center'>
                <BoltIcon className="h-8 w-8"/>
                    <p>Capabilities</p>
                </div>
                <div className='space-y-2'>
                    <p className='infoText'>Change ChatGPT model to use</p>
                    <p className='infoText'> Messgaes are store on Firebase Firestore</p>
                </div>
            </div>
            <div className='hidden md:inline-flex md:flex-col'>
                <div className='flex flex-col items-center mb-5 justify-center'>
                <ExclamationTriangleIcon className="h-8 w-8"/>
                    <p>Limitations</p>
                </div>
                <div className='space-y-2'>
                    <p className='infoText'>May occasionally generate incorrect information</p>
                    <p className='infoText'> May generate outdated datas</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home