import React, { useContext } from 'react'
import Answer from './Answer'
import { QuizContext } from '../Contexts/quiz'

function Question() {
  const [quizState,dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex].question
  const correctAnswer = quizState.questions[quizState.currentQuestionIndex].correctAnswer

  return (
    <div>
        <div className="question">{currentQuestion}</div>
        <div className="answers">
            {quizState.answers.map((answer,index)=> (
              <Answer answerText={answer} key={index} index={index} currentAnswer={quizState.currentAnswer} correctAnswer={correctAnswer} onSelectAnswer={(answerText) => dispatch({type: "SELECT_ANSWER",payload: answerText})}/>
            ))}
        </div>
    </div>
  )
}

export default Question
