import style from "./KeywordFilter.module.scss";
import Button from "../../../../components/Button/Button";

const { containerStyle, searchTermButton } = style;

interface KeywordFilterProps {
  updateFilterHandler: (index: number) => void;
  filterWords: string[];
  activeFilterIndex: number;
}

const KeywordFilter = ({ updateFilterHandler, activeFilterIndex, filterWords }: KeywordFilterProps) => {
  const keywords = filterWords.map((word, i) => {
    return (
      <Button
        classes={searchTermButton}
        onClick={() => updateFilterHandler(i)}
        selected={i === activeFilterIndex}
        key={i}
      >
        {word}
      </Button>
    );
  });

  return <div className={containerStyle}>{keywords}</div>;
};

export default KeywordFilter;
