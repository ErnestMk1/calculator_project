import { ACTIONS } from "../App";
import css from '../App.module.css';

export type ParamsType = {
  dispatch(a: any): void;
};

const ClearButton = ({ dispatch }: ParamsType) => {
  return <button
    className={css.span_two}
    onClick={() => dispatch({ type: ACTIONS.CLEAR })}
  >
    AC
  </button>
};

export default ClearButton;
