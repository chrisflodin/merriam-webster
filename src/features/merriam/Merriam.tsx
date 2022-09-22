import style from "./Merriam.module.scss";
import { useState } from "react";
import Button from "../../components/Button/Button";
import KeywordFilter from "./components/KeywordFilter/KeywordFilter";
import { useMerriam } from "../../api/merriam-webster/useMerriam";
import SynonymsList from "./components/SynonymsList/SynonymsList";
import { useAuth } from "../../api/auth/useAuth";

const { signOutButton, h1, container } = style;
export const FilterOptions = ["strength", "intellect", "dexterity"];

const Merriam = () => {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const filter = FilterOptions[activeFilterIndex];
  const auth = useAuth();
  const { data, isSuccess } = useMerriam({ filter });

  return (
    <div className={container}>
      <h1 className={h1}>keywords</h1>
      <KeywordFilter
        filterOptions={FilterOptions}
        activeFilterIndex={activeFilterIndex}
        updateFilterHandler={(index: number) => setActiveFilterIndex(index)}
      ></KeywordFilter>
      <SynonymsList isSuccess={isSuccess} data={data}></SynonymsList>
      <Button classes={signOutButton} onClick={auth.signOut}>
        Sign out
      </Button>
    </div>
  );
};

export default Merriam;
