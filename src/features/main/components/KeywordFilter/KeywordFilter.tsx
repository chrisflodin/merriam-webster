import style from "./KeywordFilter.module.scss";
import Button from "../../../../components/Button/Button";

const { containerStyle, searchTermButton } = style;

interface KeywordFilterProps {
  filter: Map<string, boolean>;
  updateFilterHandler: (filterItem: string) => void;
}

const KeywordFilter = ({ filter, updateFilterHandler }: KeywordFilterProps) => {
  const keywords = Array.from(filter.entries()).map((word, i) => {
    return (
      <Button classes={searchTermButton} onClick={() => updateFilterHandler(word[0])} selected={word[1]} key={i}>
        {word[0]}
      </Button>
    );
  });

  return <div className={containerStyle}>{keywords}</div>;
};

export default KeywordFilter;
