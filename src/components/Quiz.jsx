import React, { useState, useRef } from 'react'
import './Quiz.css'
import { questions } from '../assets/data'

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(questions[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let answer1 = useRef(null);
    let answer2 = useRef(null);
    let answer3 = useRef(null);
    let answer4 = useRef(null);

    let option_array = [answer1, answer2, answer3, answer4];

    const checkAnswer = (e, correctAnswer) => {
        if (lock === false) {
            if (question.correctAnswer === correctAnswer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(previous => previous+1);
            } else {
                e.target.classList.add("incorrect");
                setLock(true);
                option_array[question.correctAnswer-1].current.classList.add("correct");
            }
        } 
    }

    const next = () => {
        if (lock === true) {
            if (index === questions.length -1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(questions[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(questions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div>
            <div className='quiz'>
                <h1 className='quiz__title'>React Quiz</h1>
                <hr />
                {result ? <></> : <>
                    <h2 className='question'>{index+1}. {question.question} </h2>
                    <div className='answer__btns'>
                        <button ref={answer1} onClick={(e) => {checkAnswer(e, 1)}} className='btn'>{question.answer1}</button>
                        <button ref={answer2} onClick={(e) => {checkAnswer(e, 2)}} className='btn'>{question.answer2}</button>
                        <button ref={answer3} onClick={(e) => {checkAnswer(e, 3)}} className='btn'>{question.answer3}</button>
                        <button ref={answer4} onClick={(e) => {checkAnswer(e, 4)}} className='btn'>{question.answer4}</button>
                    </div>
                    <button onClick={next} className='next__btn'>Next Question</button>
                    <div className="index">Question {index+1} of {questions.length}</div>
                </>}
                {result ? <>
                <h2 className='score'>You scored {score} out of {questions.length}!</h2>
                <button onClick={reset} className='next__btn'>Play Again</button>
                </> : <></>}
            </div>
        </div>
    )
}

export default Quiz