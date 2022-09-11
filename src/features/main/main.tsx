import style from "./Main.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContextProvider";
import Button from "../../components/Button/Button";
import KeywordFilter from "./components/KeywordFilter/KeywordFilter";
import { useMerriam } from "../../api/merriam-webster/useMerriam";
import SynonymsList from "./components/SynonymsList/SynonymsList";

const { signOutButton, h1, container } = style;
export const FilterOptions = ["strength", "intellect", "dexterity"];

const Main = () => {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const filter = FilterOptions[activeFilterIndex];
  const { authToken } = useContext(AuthContext);
  const { handleSignOut } = useContext(AuthContext);
  const { data, isSuccess } = useMerriam({ filter, authToken });

  return (
    <div className={container}>
      <h1 className={h1}>keywords</h1>
      <KeywordFilter
        filterOptions={FilterOptions}
        activeFilterIndex={activeFilterIndex}
        updateFilterHandler={(index: number) => setActiveFilterIndex(index)}
      ></KeywordFilter>
      <SynonymsList isSuccess={isSuccess} data={data}></SynonymsList>
      <Button classes={signOutButton} onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default Main;
