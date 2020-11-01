import { Signal } from "signals";
import { IState } from "../../../state_machine/interfaces/IState";
import { State } from "../../../state_machine/State";
import { StateMachine } from "../../../state_machine/StateMachine";
import { TStateData } from "../../../state_machine/type/TStateData";

export class TanksGameStateMachineProxy {
  public onStateChanged: Signal;
  private _stateMachine: StateMachine;

  constructor() {
    this.onStateChanged = new Signal();
    this._stateMachine = new StateMachine();
  }

  public set initialState(stateName: string) {
    this._stateMachine.initialState = stateName;
    if (this.state === stateName) {
      this.onStateChanged.dispatch();
    }
  }

  public get state(): string {
    return this._stateMachine.state;
  }

  public addState(state: IState): void;
  public addState(state: string, stateData: TStateData): void;
  public addState(state: IState | string, stateData?: TStateData): void {
    if (typeof state === "string") {
      this._stateMachine.addState(state, stateData);
    } else {
      this._stateMachine.addStateObject(state);
    }
  }

  public deleteState(stateName: string): void {
    this._stateMachine.deleteState(stateName);
  }

  public getStateByName(name: string): State {
    return this._stateMachine.getStateByName(name);
  }

  public canChangeStateTo(stateName: string): boolean {
    return this._stateMachine.canChangeStateTo(stateName);
  }

  public changeState(stateTo: string): void {
    if (this._stateMachine.changeState(stateTo)) {
      this.onStateChanged.dispatch();
    }
  }
}
