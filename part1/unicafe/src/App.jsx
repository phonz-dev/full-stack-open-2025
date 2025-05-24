import { useState } from "react";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
	if (total === 0) {
		return (
			<>
				<h2>statistics</h2>
				<p>No feedback given</p>
			</>
		);
	}

	return (
		<>
			<h2>statistics</h2>
			<div>good {good}</div>
			<div>neutral {neutral}</div>
			<div>bad {bad}</div>
			<div>all {total}</div>
			<div>average {average}</div>
			<div>positive {positive}%</div>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const total = good + neutral + bad;
	const average = (good - bad) / total || 0;
	const positive = (good / total) * 100 || 0;

	return (
		<div>
			<h2>give feedback</h2>
			<button onClick={() => setGood(good + 1)}>good</button>
			<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={() => setBad(bad + 1)}>bad</button>

			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				total={total}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
