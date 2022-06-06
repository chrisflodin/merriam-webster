import style from "./Loader.module.scss";

const { dotFlashing } = style;

const Loader = () => {
  return (
    <>
      <div className={dotFlashing}></div>
    </>
  );
};

export default Loader;
