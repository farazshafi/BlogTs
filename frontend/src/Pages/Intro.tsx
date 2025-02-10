import React from 'react'
import { Link } from 'react-router-dom'
import ShinyText from '../Component/ShinyText/ShinyText';


const Intro = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className='flex items-end flex-col'>
                <p className='text-3xl text-center my-2 font-poppins'>Welcome to BlogTs</p>

                <Link to={"/explore"}>
                    <button className='bg-slate-800 text-white mt-2 px-3 py-2 rounded'>
                        <ShinyText text="Explore" disabled={false} speed={3} className='shiny-text' />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Intro