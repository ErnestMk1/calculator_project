import React, { useReducer } from 'react';
import css from './App.module.css';
import DigitButton from './comps/DigitButton';
import OperationButton from './comps/OperationButton';

type StateType = {
  currentValue: number | string;
  previousValue: number | string;
  operation: string;
};

type PayloadType = {
  digit: number | string;
  operation: string;
};

type ActionType = {
  type: string;
  payload: PayloadType;
};

const initialState = {
  currentValue: 0,
  previousValue: '',
  operation: '',
};

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
};

const evaluate = ({ currentValue, previousValue, operation }: StateType) => {
  const prev = Number(previousValue);
  const current = Number(currentValue);

  if (isNaN(prev) || isNaN(current)) return '';
  let computation: string | number = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }

  return computation.toString();
};

const reducer = (state: StateType, { type, payload }: ActionType) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentValue === '0') return state;
      if (payload.digit === '.' && state.currentValue.toString().includes('.')) return state;

      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUATE:
      return {
        ...state,
        previousValue: `${state.currentValue}${state.operation}${state.previousValue}`,
        currentValue: evaluate(state),
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentValue === 0 && state.previousValue === '') {
        return state;
      }
      if (state.previousValue === '') {
        return {
          ...state,
          operation: payload.operation,
          previousValue: state.currentValue,
          currentValue: '',
        }
      }
      return {
        ...state,
        previousValue: evaluate(state),
        operation: payload.operation,
        currentValue: '',
      };

    default:
      return state;
  };
};

const App = () => {
  const [state, dispatch] = useReducer(reducer as any, initialState);
  const { previousValue, currentValue, operation } = state as StateType;

  return (
    <div className={css.calculator_grid}>
      <div className={css.output}>
        <div className={css.previous_value}>{previousValue} {operation}</div>
        <div className={css.current_value}>{currentValue}</div>
      </div>
      <OperationButton operation="clear" dispatch={dispatch} />
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <OperationButton operation="evaluate" dispatch={dispatch} />
    </div>
  );
};

export default App;
