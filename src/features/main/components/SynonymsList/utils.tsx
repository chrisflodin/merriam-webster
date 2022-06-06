import style from "./SynonymsList.module.scss";

const { synStyle } = style;

export const formatWords = (words: string[]): JSX.Element[] => {
  return words.map((syn, i, arr) => {
    const delimiter = i !== arr.length - 1 ? ", " : "";
    return <span className={synStyle}>{syn + delimiter}</span>;
  });
};
