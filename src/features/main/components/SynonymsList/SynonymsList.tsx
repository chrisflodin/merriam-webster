import { MerriamWord } from "../../../../api/merriam-webster/types";
import style from "./SynonymsList.module.scss";
import { formatWords } from "./utils";

const { container, sense, meaning, synsPara, synStyle, antonymTitle, synNumber } = style;

interface SynonymsProps {
  data: MerriamWord | undefined;
}

const SynonymsList = ({ data }: SynonymsProps) => {
  const senses = data?.senses.map((word, num) => {
    const antonyms = formatWords(word.antonyms);
    const synonyms = formatWords(word.synonyms);

    return (
      <>
        <div className={sense}>
          <p className={synNumber}>{num + 1}.</p>
          <p className={meaning}>{word.meaning}</p>
          <p className={synsPara}>{synonyms}</p>
          <p className={antonymTitle}>antonyms</p>
          <p className={synsPara}>{antonyms}</p>
        </div>
      </>
    );
  });

  return <div className={container}>{senses}</div>;
};

export default SynonymsList;
