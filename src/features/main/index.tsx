import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchWord } from "../../api/merriam-webster";
import { MerriamWord } from "../../api/merriam-webster/types";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/auth-context";
import { useQuery } from "../../hooks/useQuery";
import { WordFilterConfig } from "./config";
import Synonyms from "./components/Synonyms/Synonyms";
import style from "./Main.module.scss";

const { signOutButton } = style;

const tempData = {
  id: "strength",
  senses: [
    {
      meaning: "the ability to exert effort for the accomplishment of a task",
      synonyms: [
        "energy",
        "firepower",
        "force",
        "horsepower",
        "might",
        "muscle",
        "potence",
        "potency",
        "power",
        "puissance",
        "sinew",
        "vigor",
      ],
      antonyms: ["impotence", "impotency", "powerlessness", "weakness"],
    },
    {
      meaning: "the ability to withstand force or stress without being distorted, dislodged, or damaged",
      synonyms: ["firmness", "soundness", "stability", "sturdiness"],
      antonyms: ["insecurity", "instability", "precariousness", "shakiness", "unstableness", "unsteadiness"],
    },
  ],
} as MerriamWord;

const Main = () => {
  const auth = useContext(AuthContext);
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [word, setWords] = useState<MerriamWord>();
  const history = useHistory();
  const searchTermRegEx = new RegExp(WordFilterConfig.map((word: string) => `^${word}^`).join("|"));
  const [activeFilter, setActiveFilter] = useState<string>(WordFilterConfig[0]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    let search = query.get("search") || "";
    if (!searchTermRegEx.test(search)) {
      search = activeFilter;
      history.push({
        pathname: "",
        search: "?search=" + search,
      });
    }

    const getMerriamData = async () => {
      const data = await fetchWord(search, auth.token);
      setWords(data);
      setIsLoading(false);
    };
    setIsLoading(false);

    // getMerriamData();
  };

  return (
    <>
      {!isLoading && <Synonyms filter={WordFilterConfig} data={tempData}></Synonyms>}
      <Button className={signOutButton} onClick={auth.signOutHandler}>
        Sign out
      </Button>
    </>
  );
};

export default Main;
