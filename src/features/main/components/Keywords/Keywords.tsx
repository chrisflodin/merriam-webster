import Button from "../../../../components/Button/Button";
import style from "./Keywords.module.scss";
import { SearchTermsConfig } from "../config";

const { container, searchTermButton } = style;

const Keywords = () => {
  const searchTermHandler = () => {};

  const keywords = SearchTermsConfig.map((word, i) => (
    <Button className={searchTermButton} onClick={searchTermHandler} key={i}>
      {word}
    </Button>
  ));

  return <div className={container}>{keywords}</div>;
};

export default Keywords;
