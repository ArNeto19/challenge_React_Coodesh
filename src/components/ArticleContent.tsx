import parse from "html-react-parser";
import "../styles/articleContent.css";

import { IArticleData } from "../services/api";

export const ArticleContent = (props: IArticleData) => {

  return (
    <div className="md:mx-16 md:flex">
      <div className="article-content md:w-4/5 p-8">
        <h1 className="mb-5 text-cyan-600">{props.title}</h1>
        <h2 className="haedline mb-5">{props.headline}</h2>
        <div className="article-content">{parse(props.content)}</div>
        <div className="bibliography mt-10">{parse(props.bibliography)}</div>
      </div>
      <div className="px-4 md:w-1/5">
        {props.author.name}
      </div>
    </div>
  );
};
