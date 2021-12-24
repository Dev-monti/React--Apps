import React from 'react'
import { ChromePicker } from 'react-color';

const Picker = ({typecolor,setTypecolor}) => {
    return (
        <div className="picker">
            <ChromePicker 
                color={typecolor}
                onChange={(updatedColor) => setTypecolor(updatedColor.hex) } 
            />
        </div>
    )
}

export default Picker
