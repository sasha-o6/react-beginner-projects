import { useState } from 'react';
import './index.scss';
import Game from './components/Game';
import Result from './components/Result';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function App() {
  const [step, setStep] = useState(0);
  const [correctAnswers, setcorrectAnswers] = useState(0);

  const onClickVariant = (index) => {
    if (questions[step].correct == index)
      setcorrectAnswers(correctAnswers + 1)

    setStep((prevState) => (
      prevState + 1
    ))
  }

  const resetGame = () => {
    setcorrectAnswers(0)
    setStep(0);
  }

  return (
    <div className="App">
      {
        step !== questions.length
          ? <Game step={step} questions={questions} onClickVariant={onClickVariant} />
          : <Result correctAnswers={correctAnswers} questionsLength={questions.length} resetGame={resetGame} />
      }
    </div>
  );
}

export default App;
