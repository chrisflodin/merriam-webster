import style from "./SynonymsList.module.scss";
import { MerriamWord } from "../../../../api/merriam-webster/types";
import { formatWords } from "./utils";
import Loader from "../../../../components/Loader/Loader";

const { container, h1, sense, meaning, synsPara, antonymTitle, synNumber } = style;

interface SynonymsProps {
  data: MerriamWord | undefined;
  isSuccess: boolean;
}

const SynonymsList = ({ data, isSuccess }: SynonymsProps) => {
  if (!isSuccess || !data) return <Loader />;

  const wordList = data.senses.map((word, num) => {
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
      {wordList}
    </div>
  );
};

export default SynonymsList;
