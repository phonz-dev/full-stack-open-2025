const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) =>
	blogs.reduce((total, { likes }) => total + likes, 0);

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null;

	return blogs.reduce((blog1, blog2) => {
		if (blog2 === undefined || blog1.likes > blog2.likes) {
			return blog1;
		}

		return blog2;
	});
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null;

	const blogsCount = blogs.reduce((obj, { author }) => {
		if (author in obj) {
			obj[author] += 1;
		} else {
			obj[author] = 1;
		}
		return obj;
	}, {});

	const authors = [];
	for (const author in blogsCount) {
		const blogs = blogsCount[author];

		authors.push({ author, blogs });
	}

	return authors.reduce((author1, author2) => {
		if (author2 === undefined || author1.blogs > author2.blogs) return author1;
		return author2;
	});
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null;

	const likesCount = blogs.reduce((obj, { author, likes }) => {
		if (author in obj) {
			obj[author] += likes;
		} else {
			obj[author] = likes;
		}

		return obj;
	});

	const authors = [];
	for (const author in likesCount) {
		const likes = likesCount[author];
		authors.push({ author, likes });
	}

	return authors.reduce((author1, author2) =>
		author1.likes > author2.likes ? author1 : author2
	);
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
