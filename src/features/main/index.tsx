import style from "./Main.module.scss";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchWord } from "../../api/merriam-webster";
import { MerriamWord } from "../../api/merriam-webster/types";
import { AuthContext } from "../../context/auth-context";
import { DefaultWord, WordFilterMap } from "./config";
import { updateUrl } from "./components/SynonymsList/utils";
import { getActiveFilter, validateQuery } from "./components/utils";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import KeywordFilter from "./components/KeywordFilter/KeywordFilter";
import SynonymsList from "./components/SynonymsList/SynonymsList";
import { useQuery } from "../../hooks/useQuery";

const { signOutButton, h1, container } = style;

const Main = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState<MerriamWord>();
  const [filter, setFilter] = useState<Map<string, boolean>>(WordFilterMap);

  const updateFilterHandler = (filterItem: string): void => {
    setIsLoading(true);
    updateUrl(filterItem, history);
    setActiveFilter(filterItem);
  };

  const getMerriamData = async (filterItem: string): Promise<void> => {
    const data = await fetchWord(filterItem, auth.token);
    setWordData(data);
    setIsLoading(false);
  };

  const setActiveFilter = (filterItem: string): void => {
    const newFilter = new Map(filter);
    for (let [key, val] of newFilter.entries()) {
      if (val) newFilter.set(key, false);
    }
    newFilter.set(filterItem, true);
    setFilter(newFilter);
  };

  useEffect(() => {
    getMerriamData(getActiveFilter(filter));
  }, [filter]);

  useEffect(() => {
    if (!validateQuery(query.get("search"), filter)) {
      history.push({
        pathname: "",
        search: "?search=" + DefaultWord,
      });
      setActiveFilter(DefaultWord);
    }
  }, [history]);

  return (
    <div className={container}>
      <h1 className={h1}>keywords</h1>
      <KeywordFilter filter={filter} updateFilterHandler={updateFilterHandler}></KeywordFilter>
      {isLoading ? <Loader /> : <SynonymsList data={wordData}></SynonymsList>}
      <Button classes={signOutButton} onClick={auth.signOutHandler}>
        Sign out
      </Button>
    </div>
  );
};

export default Main;
