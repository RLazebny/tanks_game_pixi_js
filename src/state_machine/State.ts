import * as _ from "lodash";
import { IState } from "./interfaces/IState";
import { StateName } from "./name/StateName";
import { StateMachineEvent } from "./StateMachineEvent";

export class State implements IState {
  public name: string;
  public from: Array<string>;
  public removeFrom: Array<string>;
  public enter: (evt?: StateMachineEvent) => void;
  public exit: (evt?: StateMachineEvent) => void;
  public children: Array<State>;

  constructor(
    name: string,
    from?: Array<string>,
    enter?: (evt?: StateMachineEvent) => void,
    exit?: (evt?: StateMachineEvent) => void
  ) {
    this.name = name;
    if (_.isNil(from)) {
      from = [StateName.GENERIC];
    }
    this.from = from;
    if (!_.isNil(enter)) {
      this.enter = enter;
    }
    if (!_.isNil(exit)) {
      this.exit = exit;
    }
    this.children = [];
  }

  public toString(): string {
    return this.name;
  }
}
