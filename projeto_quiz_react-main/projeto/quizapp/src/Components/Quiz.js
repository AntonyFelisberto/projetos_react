import React, { useContext, useEffect } from 'react'
import Question from './Question'
import { QuizContext } from '../Contexts/quiz'

function Quiz() {
  const [quizState,dispatch] = useContext(QuizContext)
  const apiUrl = `https://opentdb.com/api.php?amount=${parseInt(Math.random() * 40)}&category=31&encode=url3986`

  useEffect(() => {
      if (quizState.questions.length > 0 || quizState.error) {
        return;
      }

      fetch(apiUrl)
      .then(res => res.json())
      .then((data) => {
          if (data.results) {
              dispatch({type: 'LOADED_QUESTIONS', payload: data.results})
          } else {
              dispatch({type: 'SERVER_ERROR', payload: "No results founded, reload the page"})
          }
      })
      .catch((error) => {
        dispatch({type: 'SERVER_ERROR', payload: error})
      })
  },[dispatch,quizState,apiUrl])

  return (
    <div className='quiz'>
      {quizState.error && quizState.questions.length === 0 && (
        <div className='results'>
          <div className='congratulations'>Server Error</div>
          <div className='results-info'>
            <div>{quizState.error}</div>
          </div>
        </div>
      )}

      {quizState.showResults && (
        <div className='results'>
          <div className='congratulations'>Congratulations</div>
          <div className='results-info'>
            <div>You Have Completed the quiz</div>
            <div>You've got {quizState.correctAnswerCount} of {quizState.questions.length}</div>
          </div>
          <div className='next-button' onClick={()=> dispatch({type:"RESTART"})}>Restart</div>
        </div>
      )}

      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className='score'>
            Question {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
          </div>
          <Question/>
          <div className='next-button' onClick={()=> dispatch({type:"NEXT_QUESTION"})}>Next Question</div>
        </div>
      )}
    </div>
  )
}

export default Quiz
