export default function Result({ correctAnswers, questionsLength, resetGame }) {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
            <h2>Вы отгадали {correctAnswers} ответа из {questionsLength}</h2>
            <button onClick={resetGame} type="button">Попробовать снова</button>
        </div>
    );
}