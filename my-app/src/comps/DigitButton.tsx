import { ACTIONS } from "../App";

type DispatchType = {
  type: string;
  payload: {
    digit: string | number;
  };
};

type PropsButtonType = {
  dispatch: (fn: DispatchType) => void;
  digit: number | string;
};

const DigitButton = ({ dispatch, digit }: PropsButtonType) => {
  return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>
};

export default DigitButton;
