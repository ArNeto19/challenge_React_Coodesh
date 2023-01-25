import parse from "html-react-parser";
import "../styles/articleContent.css";

import { IArticleData } from "../services/api";

export const ArticleContent = (props: IArticleData) => {
  return (
    <>
      <div className="p-4 w-4/5">
        <h1 className="m-5">{props.title}</h1>
        <h2 className="m-5">{props.headline}</h2>
        <div>{parse(props.content)}</div>
        <div className="mt-10">{parse(props.bibliography)}</div>
      </div>
    </>
  );
};
