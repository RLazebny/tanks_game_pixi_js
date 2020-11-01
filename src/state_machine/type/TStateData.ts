import { StateMachineEvent } from "../StateMachineEvent";

export type TStateData = {
  from?: Array<string>;
  removeFrom?: Array<string>;
  enter?: (evt?: StateMachineEvent) => void;
  exit?: (evt?: StateMachineEvent) => void;
};
