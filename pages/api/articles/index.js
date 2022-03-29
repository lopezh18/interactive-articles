const articles = require('../data/articles.json');

const fetchArticles = async (req, res) => {
  res.status(200).send(articles);
};

export default fetchArticles;
