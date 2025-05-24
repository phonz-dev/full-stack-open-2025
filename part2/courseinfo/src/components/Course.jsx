const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part, exercises }) => (
	<p>
		{part} {exercises}
	</p>
);

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part.name} exercises={part.exercises} />
			))}
		</>
	);
};

const Total = ({ parts }) => (
	<p>
		<b>
			total of{" "}
			<span>{parts.reduce((sum, { exercises }) => sum + exercises, 0)}</span>{" "}
			exercises
		</b>
	</p>
);

const Course = ({ course }) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

export default Course
