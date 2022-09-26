import React, { useReducer } from 'react';
import css from './App.module.css';

type StateType = {
  currentValue: number | string;
  previousValue: number;
  operation: string;
};

type ActionType = {
  type: string;
  payload: {
    digit: number
  };
};

const initialState = {
  currentValue: 0,
  previousValue: 0,
  operation: '-',
};

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentValue: `${state.currentValue}${action.payload.digit}`
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentValue: 0
      };

    default:
      return state;
  };
};

const App = () => {
  const [state , dispatch] = useReducer(reducer, initialState);

  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }});

  return (
    <div className={css.calculator_grid}>
      <div className={css.output}>
        <div className={css.previous_value}>{state.previousValue} {state.operation}</div>
        <div className={css.current_value}>{state.currentValue}</div>
      </div>
      <button className={css.span_two}>AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className={css.span_two}>=</button>
    </div>
  );
};

export default App;
