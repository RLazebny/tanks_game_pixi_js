import { StateMachineEvent } from "../StateMachineEvent";

export interface IState {
  name: string;
  from: Array<string>;
  removeFrom: Array<string>;
  enter: (evt?: StateMachineEvent) => void;
  exit: (evt?: StateMachineEvent) => void;
  children: Array<IState>;

  toString(): string;
}
