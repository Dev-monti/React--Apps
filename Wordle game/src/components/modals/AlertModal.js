import React,{useState, useEffect} from 'react'

const AlertModal = ({alertStyle}) => {
	const [isModal, setIsModal] = useState(true)

	useEffect(() => {
		setIsModal(true)
		setTimeout(() => {
			setIsModal(false)
		}, 2000)
	}, [alertStyle])

	return (
		isModal && <div
			className={`
			absolute top-[25px] left-3/2 w-1/4 py-2 
			text-center rounded-lg font-bold text-white
			${alertStyle.classes}
		`}
		>{alertStyle.text}</div>
	)
}

export default AlertModal