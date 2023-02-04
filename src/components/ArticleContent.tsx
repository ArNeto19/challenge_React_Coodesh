import { useState } from "react";
import parse from "html-react-parser";
import "../styles/articleContent.css";

import { IArticleData } from "../services/api";

export const ArticleContent = (props: IArticleData) => {
  const [showMore, setShowMore] = useState(false);
  const textBreakpointIndex = props.content.indexOf("<!--more-->");
  const contentFirstSection = props.content.slice(0, textBreakpointIndex);
  const contentSecondSection = props.content.slice(textBreakpointIndex + 11);
  const publishDate = new Date(props.published);

  return (
    <>
      <div className="md:mx-10 md:flex">
        <div className="sm:hidden flex flex-col font-medium m-1 p-2 border-4 border-double border-sky-800 h-min">
          <p>
            Escrito por:{" "}
            <em className="text-pink-500">
              <a href={props.author.link}>{props.author.name}</a>
            </em>
          </p>
          <p>
            Publicación:{" "}
            {`${publishDate.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}`}
          </p>
          <div className="flex items-center space-x-1">
            {" "}
            <p>Tags:</p>
            {props.tags.map((tag) => {
              return <p className="text-sm"> {tag.slug} | </p>;
            })}
          </div>
          <div className="text-xs text-justify p-1">{parse(props.author.description)}</div>
        </div>

        <div className="article-content md:w-4/5 p-3">
          <div className="mb-5">
            <h1 className="text-cyan-600">{props.title}</h1>
            <h5 className="font-medium my-1 mx-1">
              Categoría: <em>{props.categories[0].name}</em>
            </h5>
          </div>
          <h2 className="haedline mb-5">{props.headline}</h2>
          <div className="article-content">{parse(contentFirstSection)}</div>
          {!showMore && textBreakpointIndex > 0 && (
            <div className="text-center">
              <button onClick={() => setShowMore(!showMore)}>Show More</button>
            </div>
          )}
          {showMore && <div className="article-content">{parse(contentSecondSection)}</div>}

          {showMore && (
            <div className="text-center">
              <button onClick={() => setShowMore(!showMore)}>Show Less</button>
            </div>
          )}
        </div>

        <div className="max-sm:hidden flex flex-col font-medium mx-1 mt-5 p-2 border-4 border-double border-sky-800 h-min md:w-1/5">
          <p>
            Escrito por:{" "}
            <em className="text-pink-500">
              <a href={props.author.link}>{props.author.name}</a>
            </em>
          </p>
          <p>
            Publicación:{" "}
            {`${publishDate.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}`}
          </p>
          <div className="flex items-center space-x-1">
            {" "}
            <p>Tags:</p>
            {props.tags.map((tag) => {
              return <p className="text-sm"> {tag.slug} | </p>;
            })}
          </div>
          <div className="text-xs text-justify p-1">{parse(props.author.description)}</div>
        </div>
      </div>

      {props.bibliography !== null && (
        <div className="bibliography flex flex-col h-min w-1/2 text-justify font-medium m-8 p-6 border-4 border-double border-sky-800">
          <h2 className="my-0">Bibliografía</h2>
          {parse(props.bibliography)}
        </div>
      )}
    </>
  );
};
