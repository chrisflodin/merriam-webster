import style from "./Main.module.scss";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { fetchWord } from "../../api/merriam-webster";
import { MerriamWord } from "../../api/merriam-webster/types";
import { AuthContext } from "../../providers/AuthContextProvider";
import { DefaultWord, WordFilterMap } from "./config";
import { updateUrl } from "./components/SynonymsList/utils";
import { getActiveFilter, validateQuery } from "./components/utils";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import KeywordFilter from "./components/KeywordFilter/KeywordFilter";
import SynonymsList from "./components/SynonymsList/SynonymsList";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import URLS from "../../api/urls";
import { ServerError } from "../../types/errors";
import { MerriamDTO } from "./types";

const { signOutButton, h1, container } = style;

const Main = () => {
  const { handleSignOut } = useContext(AuthContext);
  // const [filter, setFilter] = useState<Map<string, boolean>>(WordFilterMap);
  const { token } = useContext(AuthContext);

  const { mutate } = useMutation<MerriamWord, ServerError, MerriamDTO, MerriamWord>(fetchWord, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className={container}>
      <h1 className={h1}>keywords</h1>
      {/* <KeywordFilter filter={filter} updateFilterHandler={updateFilterHandler}></KeywordFilter> */}
      {/* {isLoading ? <Loader /> : <SynonymsList data={wordData}></SynonymsList>} */}
      <Button classes={signOutButton} onClick={handleSignOut}>
        Sign out
      </Button>
      <Button onClick={() => mutate({ searchTerm: "strength", token: token })}>Fetch</Button>
    </div>
  );
};

export default Main;
