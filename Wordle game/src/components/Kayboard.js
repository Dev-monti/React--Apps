import React from 'react';
import { BsBackspace } from 'react-icons/bs';
import { useEffect } from 'react';

const Kayboard = ({handleKeyEntred, onAddKey, onDelelte, onEntre}) => {

    useEffect(() => {
        window.addEventListener('keyup', handleKeyEntred)
        return () => window.removeEventListener('keyup', handleKeyEntred)
    }, [handleKeyEntred])

    return (
        <div className='flex justify-center'>
            <div className='mt-3'>
                <div className='flex flex-col items-center'>
                    <div className='flex'>
                        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
                            (key, index) => (
                                <button
                                    key={index}
                                    onClick={() => onAddKey(key)}
                                    className='bg-slate-300 rounded-md dark:text-white dark:bg-[#475569] py-3 px-4 ml-2 mb-2 font-semibold text-lg'
                                >
                                    {key}
                                </button>
                            )
                        )}
                    </div>
                    <div className='flex'>
                        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(
                            (key, index) => (
                                <button
                                    key={index}
                                    onClick={() => onAddKey(key)}
                                    className='bg-slate-300 rounded-md dark:text-white dark:bg-[#475569] py-3 px-4 ml-2 mb-2 font-semibold text-lg'
                                >
                                    {key}
                                </button>
                            )
                        )}
                    </div>
                    <div className='flex'>
                        <button
                            onClick={onEntre}
                            className='bg-slate-300 rounded-md text-lg dark:text-white dark:bg-[#475569] py-3 px-4 ml-2 mb-2 font-semibold' // transition delay-700 duration-300 ease-in-out
                        >
                            ENTER
                        </button>
                        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(
                            (key, index) => (
                                <button
                                    key={index}
                                    onClick={() => onAddKey(key)}
                                    className='bg-slate-300 rounded-md text-lg dark:text-white dark:bg-[#475569] py-3 px-4 ml-2 mb-2 font-semibold'
                                >
                                    {key}
                                </button>
                            )
                        )}
                            <button
                                onClick={onDelelte}
                                className='bg-slate-300 rounded-md dark:text-white dark:bg-[#475569] py-3 px-4 ml-2 mb-2 font-semibold text-lg'
                            >
                                <BsBackspace />
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kayboard