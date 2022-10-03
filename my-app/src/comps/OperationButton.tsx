import { ACTIONS } from "../App";
import css from '../App.module.css';

type DispatchType = {
  type: string;
  payload: {
    operation: string;
  };
};

type OperationProps = {
  dispatch: (fn: DispatchType) => void;
  operation: string;
};

const name = (operation: string): string => {
  if (operation === 'clear') return 'AC';
  if (operation === 'evaluate') return '=';

  return operation;
}

const OperationButton = ({ dispatch, operation }: OperationProps) => {
  return <button
    className={operation === 'clear' || operation === "evaluate" ? css.span_two : ''}
    onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
  >
    {name(operation)}
  </button>
};

export default OperationButton;
