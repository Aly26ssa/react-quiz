import React, { useState, useRef, useEffect} from 'react'
import './Quiz.css'
import { questions } from '../assets/data'

const Quiz = () => {

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(questions[0]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const answer1 = useRef(null);
    const answer2 = useRef(null);
    const answer3 = useRef(null);
    const answer4 = useRef(null);

    const option_array = [answer1, answer2, answer3, answer4];

    useEffect(() => {
        setQuestion(questions[index]);
    }, [index]);

    const checkAnswer = (e, correctAnswer) => {
        if (lock === false) {
            if (question.correctAnswer === correctAnswer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("incorrect");
                setLock(true);
                option_array[question.correctAnswer-1].current.classList.add("correct");
            }
        } 
    }

    const next = () => {
        if (lock === true) {
            if (index === questions.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prev => prev + 1);
            setLock(false);
            option_array.forEach((option) => {
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
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