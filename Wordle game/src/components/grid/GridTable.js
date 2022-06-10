import React, {} from 'react'
import RowTable from './RowTable';

const GridTable = ({yIndex, guessesKeys, currentGuess}) => {

    return (
        <div className='grid grid-cols-5 gap-4 mt-4'>
            {guessesKeys.map((rw, index) => (
                yIndex === index
                ? <RowTable key={index} row={currentGuess} />
                : <RowTable key={index} row={rw} />
            ))}
        </div>
    )
}

export default GridTable