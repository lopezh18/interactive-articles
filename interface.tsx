export interface iComment {
  Author: string;
  Id: string;
  Text: string;
  ArticleId: string;
};

export interface iCommentsObject {
  Comments: Array<iComment>
};

export interface iEvent {
  preventDefault: Function;
  target: object;
};

export interface iCommentForm {
  comment: string;
  name: string;
};

export interface iMCQ {
  Comments?:Array<iComment>;
  CorrectOption: any;
  IncorrectOptions: Array<any>;
  Question: string;
};

export interface iMarkdown {
  Text: string;
};

type iBlock = {
  Type: string;
  Object: iMarkdown | iMCQ;
}

export interface iArticle {
  Author: string; 
  Blocks: Array<iBlock>;
  Id: string;
  Slug: string;
  Title: string;
  Timestamp: number;
};
