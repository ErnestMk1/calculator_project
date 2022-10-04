import { ACTIONS } from "../App";
import { ParamsType } from "./ClearButton";

const DeleteButton = ({ dispatch }: ParamsType) => {
  return <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
};

export default DeleteButton;
