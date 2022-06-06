import style from "./Synonyms.module.scss";
import KeywordFilter from "../KeywordFilter/KeywordFilter";
import { MerriamWord } from "../../../../api/merriam-webster/types";
import SynonymsList from "../SynonymsList/SynonymsList";

const { container, listContainer, h1 } = style;

interface SynonymsProps {
  data: MerriamWord | undefined;
  filter: string[];
}

const Synonyms = ({ data, ...rest }: SynonymsProps) => {
  return (
    <div className={container}>
      <h1 className={h1}>keywords</h1>
      <KeywordFilter {...rest}></KeywordFilter>
      <div className={listContainer}>
        <h2 className={h1}>synonyms</h2>
        <SynonymsList data={data}></SynonymsList>
      </div>
    </div>
  );
};

export default Synonyms;
