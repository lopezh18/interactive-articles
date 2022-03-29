const articles = require('../data/articles.json');
const comments = require('../data/comments.json');

const fetchArticle = async (req, res) => {
  const { articleSlug } = req.query;
  const result = articles.filter(({ Slug }) => Slug === articleSlug);
  if (result.length) {
    const articleComments = comments.filter(({ ArticleId }) => ArticleId === result[0].Id);
    res.status(200).send({ Comments: articleComments, ...result[0] });
  } else {
    res.status(404).send({ message: `${articleSlug} was not found`});
  }
}

export default fetchArticle;
