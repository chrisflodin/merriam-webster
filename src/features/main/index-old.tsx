// import style from "./Main.module.scss";
// import { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useQuery } from "../../hooks/useQuery";
// import { fetchWord } from "../../api/merriam-webster";
// import { MerriamWord } from "../../api/merriam-webster/types";
// import { AuthContext } from "../../providers/AuthContextProvider";
// import { DefaultWord, WordFilterMap } from "./config";
// import { updateUrl } from "./components/SynonymsList/utils";
// import { getActiveFilter, validateQuery } from "./components/utils";
// import Button from "../../components/Button/Button";
// import Loader from "../../components/Loader/Loader";
// import KeywordFilter from "./components/KeywordFilter/KeywordFilter";
// import SynonymsList from "./components/SynonymsList/SynonymsList";

// const { signOutButton, h1, container } = style;

// const Main = () => {
//   const { handleSignOut } = useContext(AuthContext);
//   const history = useHistory();
//   const query = useQuery();
//   const [isLoading, setIsLoading] = useState(true);
//   const [wordData, setWordData] = useState<MerriamWord>();
//   const [filter, setFilter] = useState<Map<string, boolean>>(WordFilterMap);

//   console.log("test");

//   const updateFilterHandler = (filterItem: string): void => {
//     setIsLoading(true);
//     updateUrl(filterItem, history);
//     setActiveFilter(filterItem);
//   };

//   const setActiveFilter = (filterItem: string): void => {
//     const newFilter = new Map(filter);

//     for (let [key, val] of newFilter.entries()) {
//       if (val) newFilter.set(key, false);
//     }

//     newFilter.set(filterItem, true);
//     setFilter(newFilter);
//   };

//   const getMerriamData = async (filterItem: string): Promise<void> => {
//     const data = await fetchWord(filterItem, auth.token);
//     setWordData(data);
//     setIsLoading(false);
//   };

//   const setDefaultQueryString = (): void => {
//     history.push({
//       pathname: "",
//       search: "?search=" + DefaultWord,
//     });

//     setActiveFilter(DefaultWord);
//   };

//   useEffect(() => {
//     getMerriamData(getActiveFilter(filter));
//   }, [filter]);

//   useEffect(() => {
//     if (validateQuery(query.get("search"), filter)) return;
//     setDefaultQueryString();
//   }, [history]);

//   return (
//     <div className={container}>
//       <h1 className={h1}>keywords</h1>
//       <Button onClick={handleSignOut}>Sign out</Button>
//       <KeywordFilter filter={filter} updateFilterHandler={updateFilterHandler}></KeywordFilter>
//       {isLoading ? <Loader /> : <SynonymsList data={wordData}></SynonymsList>}
//       <Button classes={signOutButton} onClick={handleSignOut}>
//         Sign out
//       </Button>
//     </div>
//   );
// };

// export default Main;
