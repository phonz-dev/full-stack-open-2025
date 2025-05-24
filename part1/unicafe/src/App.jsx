import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
	<tr>
    <td>{text}</td>
    <td></td>
    <td></td>
    <td>{value}</td>
	</tr>
);

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
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={total} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positive + "%"} />
				</tbody>
			</table>
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
			<Button onClick={() => setGood(good + 1)} text="good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setBad(bad + 1)} text="bad" />

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
