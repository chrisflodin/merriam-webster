import style from "./KeywordFilter.module.scss";
import Button from "../../../../components/Button/Button";

const { containerStyle, searchTermButton } = style;

interface KeywordFilterProps {
  filter: string[];
}

const KeywordFilter = ({ filter }: KeywordFilterProps) => {
  const filterHandler = () => {};

  const keywords = filter.map((word, i) => (
    <Button className={searchTermButton} onClick={filterHandler} key={i}>
      {word}
    </Button>
  ));

  return <div className={containerStyle}>{keywords}</div>;
};

export default KeywordFilter;
