import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchWord } from "../../api/merriam-webster";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/auth-context";
import { useQuery } from "../../hooks/useQuery";
import { SearchTermsConfig } from "./components/config";
import Synonyms from "./components/Synonyms/Synonyms";
import style from "./Main.module.scss";

const { signOutButton } = style;

const Main = () => {
  const auth = useContext(AuthContext);
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const searchTermRegEx = new RegExp(SearchTermsConfig.map((word: string) => `^${word}^`).join("|"));

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    let search = query.get("search") || "";
    if (!searchTermRegEx.test(search)) {
      search = SearchTermsConfig[0];
      history.push({
        pathname: "",
        search: "?search=" + search,
      });
    }

    const getMerriamData = async () => {
      const word = await fetchWord(search, auth.token);
      setIsLoading(false);
      // Update state
    };
    setIsLoading(false);

    // getMerriamData();
  };

  return (
    <>
      {!isLoading && <Synonyms></Synonyms>}
      <Button className={signOutButton} onClick={auth.signOutHandler}>
        Sign out
      </Button>
    </>
  );
};

export default Main;
