import { useNavigate } from "react-router-dom";

export const Breadcrumb = (props: any) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex">
        <ol className="inline-flex items-center space-x-1">
          <li className="inline-flex items-center">
            <button className="text-gray-700 hover:text-pink-500" onClick={() => navigate(-1)}>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"></path>
              </svg>
              <a
                href={`/article/${props.articleId}`}
                className="ml-1 text-sm font-medium underline text-gray-700 hover:text-pink-500 md:ml-2">
                {props.articleSlug}
              </a>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
};
