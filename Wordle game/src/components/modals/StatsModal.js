import React from 'react'

const StatsModal = ({modalStats}) => {

    const DistributionList = new Array(6).fill(0);

    const gameRefrech = () => {
        window.location.reload()
    }

    const statsShare = () => {}

    return (
        modalStats.state &&
        <div className='fixed bg-black/[.6] top-0 left-0 w-full h-full'>
            <div className='rounded bg-white p-4 w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h2 className='text-center font-bold text-xl'>Guess Distribution</h2>
                <ul className='mt-2 mb-4'>
                    {DistributionList.map((li, index) => (
                            <li className='flex item-center my-3' key={index}>
                                {modalStats.score === index
                                    ? <>
                                        <span className='grow-0'>{index + 1}</span>
                                        <span className='grow-1 text-center ml-2 px-2 text-white font-bold rounded bg-blue-500 w-full'>1</span>
                                    </>
                                    : <>
                                        {index + 1}
                                        <span className='ml-2 px-2 text-white font-bold rounded bg-gray-600'>{li}</span>
                                    </>
                                }
                            </li>
                        ))}
                </ul>
                <div className='flex justify-around mt-6'>
                    <button 
                        className='bg-indigo-500 rounded py-2 px-5 text-white font-semibold'
                        onClick={gameRefrech}
                    >Refrech</button>
                    <button 
                        className='bg-blue-500 rounded py-2 px-5 text-white font-semibold'
                        onClick={statsShare}
                    >Share</button>
                </div>
            </div>
        </div>
    )
}

export default StatsModal