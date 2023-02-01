import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  showSearchIcon?: boolean;
}

export const NavBar = ({ showSearchIcon = false }: Props) => {
  return (
    <>
      <nav className="flex flex-row p-4 bg-slate-200 items-center justify-between hover:cursor-default">
        <h1 className="font-serif text-xl leading-none">
          <a className="hover:no-underline hover:text-inherit" href="/">
            HOME
          </a>
        </h1>
        <h1 className="font-serif text-center text-xl leading-none w-44">
          <em className="text-pink-500 not-italic">Article</em>Search App
        </h1>
        <div>{showSearchIcon && <FontAwesomeIcon icon={faSearch} size="lg" />}</div>
      </nav>
    </>
  );
};
