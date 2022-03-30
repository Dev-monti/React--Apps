import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Questions from './Questions';

const Quiz = ({points, setPoints}) => {

    const [indexQue, setIndexQue] = useState(0);
    const [optionClicked, setOptionClicked] = useState(undefined);

    const [startQue, setStratQue] = useState(true);
    const [timerValue, setTimerValue] = useState(15);

    const pathNavigate = useNavigate();

    const checkOption = (index,optionName) => {
        if(startQue){
            setStratQue(false);
            setOptionClicked(index);
            if(Questions[indexQue].answer === optionName){
                setPoints(points + 1)
            }
        }
    }

    const nexQuestion = () => {
        if(indexQue + 1 < Questions.length){
            setIndexQue(indexQue => indexQue + 1)
            setTimerValue(15)
        }else{
            pathNavigate('/complate')
        }
    }

    useEffect(() => {
        if(timerValue < 1 || !startQue){
            setStratQue(false)
            clearInterval(window.interval)
        }
    }, [timerValue, startQue])

    useEffect(() => {
        window.interval = setInterval(() => {
            setTimerValue(timerValue => timerValue - 1);
        }, 1000);
        setStratQue(true);
    }, [indexQue])

    return (
        <div className="col-xl-6 col-lg-6 col-md-7 p-0 bg-white rounded">
            <div className="head-quiz d-flex align-items-center justify-content-between px-3 py-3">
                <h4 className=''>Awesome Quiz Application</h4>
                <div className="d-flex align-items-center bg-primary bg-opacity-25 py-2 px-3 rounded fw-bold text-primary">
                    <p>Time Left</p>
                    <span className="bg-secondary ms-3 p-2 py-1 text-white rounded">{timerValue >= 10 ? timerValue : `0${timerValue}`}</span>
                </div>
            </div>
            {startQue
                ? <div className='timerLine active'></div>
                : <div className='timerLine' style={{width: `${timerValue !== 0 ? 100 - (timerValue * 100 / 15) : 100}%`}}></div>
            }
            <ul className="pb-2 pt-3 px-3">
                <h3 className='fs-4 fw-bold py-2'>{`${indexQue + 1}. ${Questions[indexQue].question}`}</h3>
                {Questions[indexQue].options.map((option,index) => 
                    <li key={index} className="my-3">
                        <button className={
                            `
                                py-2 px-3 text-black option-normal rounded-3 w-100 text-start
                                ${!startQue && option === Questions[indexQue].answer && "option-correct"}
                                ${!startQue 
                                    && option !== Questions[indexQue].answer
                                    && index === optionClicked && "option-incorrect"
                                }
                            `}
                            onClick={() => checkOption(index,option)}
                        >
                            {option}
                        </button>
                    </li>
                )}
            </ul>
            <div className="line bg-black opacity-25"></div>
            <div className="d-flex justify-content-between align-items-center py-2 px-3">
                <span>{indexQue + 1} of {Questions.length} Questions</span>
                {!startQue && <button className="btn btn-primary fw-bold" onClick={nexQuestion}>nextQue</button>}
            </div>
        </div>
    )
}
export default Quiz
