import { RouteComponentProps } from "react-router-dom";
import style from "./SynonymsList.module.scss";

const { synStyle } = style;

export const formatWords = (words: string[]): JSX.Element[] | undefined => {
  if (!words) return;
  return words.map((syn, i, arr) => {
    const delimiter = i !== arr.length - 1 ? ", " : "";

    return (
      <span className={synStyle} key={`${syn}-${i}`}>
        {syn + delimiter}
      </span>
    );
  });
};

export const updateUrl = (filterItem: string, history: RouteComponentProps["history"]) => {
  history.push({
    pathname: "",
    search: "?search=" + filterItem,
  });
};
