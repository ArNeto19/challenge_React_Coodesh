import parse from "html-react-parser";
import "../styles/articleContent.css";

import { IArticleData } from "../services/api";

export const ArticleContent = (props: IArticleData) => {
  return (
    <>
      <div className="p-4">
        <h1 className="m-5">{props.title}</h1>
        <h3 className="m-5">{props.headline}</h3>
        <div>{parse(props.content)}</div>
      </div>
    </>
  );
};
