import style from "./SynonymsList.module.scss";
import { MerriamWord } from "../../../../api/merriam-webster/types";
import { formatWords } from "./utils";

const { container, h1, sense, meaning, synsPara, antonymTitle, synNumber } = style;

interface SynonymsProps {
  data: MerriamWord | undefined;
}

const SynonymsList = ({ data }: SynonymsProps) => {
  const senses = data?.senses.map((word, num) => {
    const antonyms = formatWords(word.antonyms);
    const synonyms = formatWords(word.synonyms);

    return (
      <div className={sense} key={`${sense}-${num}`}>
        <p className={synNumber}>{num + 1}.</p>
        <p className={meaning}>{word.meaning}</p>
        <p className={synsPara}>{synonyms}</p>
        {word.antonyms && <p className={antonymTitle}>antonyms</p>}
        <p className={synsPara}>{antonyms}</p>
      </div>
    );
  });

  return (
    <div className={container}>
      <h2 className={h1}>synonyms</h2>
      {senses}
    </div>
  );
};

export default SynonymsList;
