import React from 'react'

export default function RowTable({ row }) {
    return (
        <>
            {row.map((item, ndx) => (
                <div
                    key={ndx}
                    className={`
                        flex items-center justify-center dark:text-white border-2 dark:border-slate-200 
                        h-[50px] text-[2rem] font-bold rounded
                        ${item.classes}
                    `}
                >{item.key}</div>
            ))}
        </>
    )
}
