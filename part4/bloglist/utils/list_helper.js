const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) =>
	blogs.reduce((total, { likes }) => total + likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((blog1, blog2) => {
    if (blog2 === undefined || blog1.likes > blog2.likes) {
      return blog1
    }

    return blog2
  })
};

module.exports = {
	dummy,
  totalLikes,
  favoriteBlog
};
