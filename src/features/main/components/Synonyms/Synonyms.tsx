import style from "./Synonyms.module.scss";
import Keywords from "../Keywords/Keywords";

const { container, h1, synonyms } = style;

const Synonyms = () => {
  return (
    <div className={container}>
      <h1 className={h1}>Keywords</h1>
      <Keywords></Keywords>
      <div className={synonyms}>
        <h2>synonyms</h2>
      </div>
    </div>
  );
};

export default Synonyms;
