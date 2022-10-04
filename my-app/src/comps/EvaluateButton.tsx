import { ACTIONS } from "../App";
import css from '../App.module.css';
import { ParamsType } from "./ClearButton";

const EvaluateButton = ({ dispatch }: ParamsType) => {
  return <button
    className={css.span_two}
    onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
  >
    =
  </button>
};

export default EvaluateButton;
