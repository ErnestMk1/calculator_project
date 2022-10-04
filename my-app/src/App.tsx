import React, { useReducer } from 'react';
import css from './App.module.css';
import DigitButton from './comps/DigitButton';
import OperationButton from './comps/OperationButton';
import ClearButton from './comps/ClearButton';
import EvaluateButton from './comps/EvaluateButton';
import DeleteButton from './comps/DeleteButton';

type StateType = {
  currentValue: number | string;
  previousValue: number | string;
  operation: string;
  overwrite: boolean;
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
  overwrite: false,
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

  return computation;
};

const reducer = (state: StateType, { type, payload }: ActionType) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentValue === '0') return state;
      if (payload.digit === '.' && state.currentValue.toString().includes('.')) return state;

      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        operation: '',
        previousValue: '',
        currentValue: 0
      };
    case ACTIONS.EVALUATE:
      if (state.previousValue === '') return state;
      return {
        ...state,
        operation: '',
        previousValue: '',
        currentValue: evaluate(state),
        overwrite: true,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentValue === 0 && state.previousValue === '') {
        return state;
      }
      if (state.currentValue === 0) {
        return {
          ...state,
          operation: payload.operation,
        }
      };
      if (state.previousValue === '') {
        return {
          ...state,
          operation: payload.operation,
          previousValue: state.currentValue,
          currentValue: '',
        }
      }
      if (state.operation === '') {
        return {
          ...state,
          previousValue: state.currentValue,
          operation: payload.operation,
          currentValue: '',
        };
      }
      return {
        ...state,
        previousValue: evaluate(state),
        operation: payload.operation,
        currentValue: '',
      };
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentValue: state.currentValue.toString().slice(0, -1)
      };

    default:
      return state;
  };
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatValue = (value: number | string) => {
  if (value === '' || value === 0) return value;
  const [integer, decimal] = value.toString().split('.');
  if (decimal === undefined) return INTEGER_FORMATTER.format(Number(integer));
  return `${INTEGER_FORMATTER.format(Number(integer))}.${decimal}`;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer as any, initialState);
  const { previousValue, currentValue, operation } = state as StateType;

  return (
    <div className={css.calculator_grid}>
      <div className={css.output}>
        <div className={css.previous_value}>{formatValue(previousValue)} {operation}</div>
        <div className={css.current_value}>{formatValue(currentValue)}</div>
      </div>
      <ClearButton dispatch={dispatch} />
      <DeleteButton dispatch={dispatch} />
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
      <EvaluateButton dispatch={dispatch} />
    </div>
  );
};

export default App;
