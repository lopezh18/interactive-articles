const { v4: uuidv4 } = require('uuid');
const articles = require('../data/articles.json');

const postComment = async(req, res) => {
  const { body, method } = req;
  const commentId = uuidv4();
  const { name, comment, articleSlug } = body;
  const article = articles.filter(({ Slug }) => Slug === articleSlug);
  switch(method) {
    case 'POST':
      if (article.length) {
        const { Id } = article[0];
        res.status(200).json({
          Author: name,
          Text: comment,
          ArticleId: Id,
          Id: commentId,
        });
      } else {
        res.status(400).json({ message: 'Comment could not be added' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`${method} Method not allowed`);
  }
}

export default postComment;
