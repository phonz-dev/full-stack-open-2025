import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const initialVotesState = anecdotes.reduce((obj, _, i) => {
		if (obj[i] === undefined) {
			obj[i] = 0;
		} else {
			obj[i] += 1;
		}
		return obj;
	}, {});

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(initialVotesState);

	const selectRandomAnecdote = () => {
		let randomIndex = selected;
		while (randomIndex === selected)
			randomIndex = Math.floor(Math.random() * Math.floor(anecdotes.length));
		setSelected(randomIndex);
	};

	const getIndexWithMostVotes = () => {
		let mostVotes = 0;
		let mostVotesIndex = 0;
		for (const index in votes) {
			const value = votes[index];
			if (value > mostVotes) {
				mostVotes = value;
				mostVotesIndex = index;
			}
		}
		return mostVotesIndex;
	};

	const voteAnecdote = () => {
		const votesCopy = { ...votes };
		votesCopy[selected] += 1;
		setVotes(votesCopy);
	};

	return (
		<div>
			<h3>Anecdote of the day</h3>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={voteAnecdote}>vote</button>
			<button onClick={selectRandomAnecdote}>next anecdote</button>

			<h3>Anecdote with most votes</h3>
			<p>{anecdotes[getIndexWithMostVotes()]}</p>
			<p>has {votes[getIndexWithMostVotes()]} votes</p>
		</div>
	);
};

export default App;
