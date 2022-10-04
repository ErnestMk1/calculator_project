import { ACTIONS } from "../App";

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

const OperationButton = ({ dispatch, operation }: OperationProps) => {
  return <button
    onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
  >
    {operation}
  </button>
};

export default OperationButton;
