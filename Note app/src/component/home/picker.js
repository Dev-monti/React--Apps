import React from 'react'
import { ChromePicker } from 'react-color';

const Picker = ({typeForm,setTypeForm}) => {
    return (
        <div className="picker">
            <ChromePicker 
                color={typeForm.color}
                onChange={(updatedColor) => setTypeForm({...typeForm, color: updatedColor.hex}) } 
            />
        </div>
    )
}

export default Picker
