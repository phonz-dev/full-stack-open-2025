const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	assert.strictEqual(result, 1);
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		assert.strictEqual(listHelper.totalLikes([]), 0);
	});

	test("when list has only one blog, equals the likes of that", () => {
		const listWithOneBlog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 5,
				__v: 0,
			},
    ];

    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
	});

	test("of a bigger list is calculated right", () => {
		const listWitManyBlogs = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Ada Lovelace",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 28,
				__v: 0,
			},
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Robert Martin",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 32,
				__v: 0,
			},
		];

		assert.strictEqual(listHelper.totalLikes(listWitManyBlogs), 65);
	});
});
