import React from 'react'
import { Link } from 'react-router-dom'

const Intro: React.FC = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className='flex items-end flex-col'>
                <p className='text-3xl text-center my-2 font-poppins'>Welcome to BlogTs</p>

                <button className='bg-slate-800 w-[30%] text-white mt-2 px-3 py-2 rounded'>
                    <Link to={"/explore"}>
                        Explore
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Intro