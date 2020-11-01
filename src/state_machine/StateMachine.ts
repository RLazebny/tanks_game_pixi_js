import * as _ from "lodash";
import { IState } from "./interfaces/IState";
import { StateName } from "./name/StateName";
import { State } from "./State";
import { StateMachineEvent } from "./StateMachineEvent";
import { TStateData } from "./type/TStateData";
import { TStatesObject } from "./type/TStatesObject";

export class StateMachine {
  private _state: string;
  private _states: TStatesObject;

  constructor() {
    this._states = {};
  }

  /**
   * Sets the first state, calls enter callback and dispatches TRANSITION_COMPLETE
   * These will only occour if no state is defined
   * @param stateName    The name of the State
   */
  public set initialState(stateName: string) {
    if (_.isUndefined(this._state) && stateName in this._states) {
      this._state = stateName;
      const _callbackEvent: StateMachineEvent = new StateMachineEvent(StateMachineEvent.ENTER_CALLBACK);
      _callbackEvent.toState = stateName;
      if (!_.isNil(this._states[this._state]) && !_.isNil(this._states[this._state].enter)) {
        _callbackEvent.currentState = this._state;
        this._states[this._state].enter.call(null, _callbackEvent);
      }
    } else {
      console.log("FSM", `[StateMachine] Initial state is already exist or you try to set invalid state: ${stateName}`);
    }
  }

  /**
   *    Getters for the current state and for the Dictionary of states
   */
  public get state(): string {
    return this._state;
  }

  public get states(): TStatesObject {
    return this._states;
  }

  /**
   * Adds a new state
   * @param stateName    The name of the new State
   * @param stateData    A hash containing state enter and exit callbacks and allowed states to transition from
   * The "from" property can be a string or and array with the state names or * to allow any transition
   */
  public addState(stateName: string, stateData: TStateData): void {
    if (stateName in this._states) {
      if (stateData && stateData.from) {
        stateData.from = _.uniq((stateData.from as Array<string>).concat(this._states[stateName].from));
      } else if (stateData) {
        stateData.from = this._states[stateName].from;
      }
      if (stateData.removeFrom) {
        const removeFromLength: number = stateData.removeFrom.length;
        for (let i = 0; i < removeFromLength; i++) {
          if (
            stateData &&
            stateData.from &&
            (stateData.from as Array<string>).indexOf(stateData.removeFrom[i]) !== -1
          ) {
            stateData.from = _.difference(stateData.from as Array<string>, [stateData.removeFrom[i]]);
          }
        }
      }
    }
    if (_.isNil(stateData)) {
      stateData = {};
    }
    this._states[stateName] = new State(stateName, stateData.from, stateData.enter, stateData.exit);
  }

  public addStateObject(state: IState): void {
    const stateName: string = state.name;
    if (stateName in this._states) {
      if (state.from) {
        state.from = _.uniq((state.from as Array<string>).concat(this._states[stateName].from));
      }
      if (state.removeFrom) {
        const removeFromLength: number = state.removeFrom.length;
        for (let i = 0; i < removeFromLength; i++) {
          if (state.from && (state.from as Array<string>).indexOf(state.removeFrom[i]) !== -1) {
            state.from = _.difference(state.from as Array<string>, [state.removeFrom[i]]);
          }
        }
      }
    }
    this._states[stateName] = state;
  }

  /**
   * Delete a state
   * @param stateName    The name of the new State
   */
  public deleteState(stateName: string): void {
    if (stateName in this._states) {
      delete this._states[stateName];
    }
  }

  public getStateByName(name: string): State {
    return this._states[name];
  }

  /**
   * Verifies if a transition can be made from the current state to the state passed as param
   * @param stateName    The name of the State
   */
  public canChangeStateTo(stateName: string): boolean {
    return (
      stateName !== this._state &&
      (this._states[stateName].from.indexOf(this._state) !== -1 ||
        this._states[stateName].from.indexOf(StateName.GENERIC) !== -1)
    );
  }

  /**
   * Changes the current state
   * This will only be done if the intended state allows the transition from the current state
   * Changing states will call the exit callback for the exiting state and enter callback for the entering state
   * @param stateTo    The name of the state to transition to
   */
  public changeState(stateTo: string): boolean {
    // If there is no state that maches stateTo
    if (!(stateTo in this._states)) {
      console.log("FSM", `[StateMachine] Cannot make transition: State ${stateTo} is not defined`);
      return false;
    }
    // If current state is not allowed to make this transition
    if (!this.canChangeStateTo(stateTo)) {
      console.log("FSM", `[StateMachine] Transition to ${stateTo} denied`);
      return false;
    }
    // call exit and enter callbacks (if they exits)
    const _exitCallbackEvent: StateMachineEvent = new StateMachineEvent(StateMachineEvent.EXIT_CALLBACK);
    _exitCallbackEvent.toState = stateTo;
    _exitCallbackEvent.fromState = this._state;
    if (!_.isNil(this._states[this._state].exit)) {
      _exitCallbackEvent.currentState = this._state;
      this._states[this._state].exit.call(null, _exitCallbackEvent);
    }
    const oldState: string = this._state;
    this._state = stateTo;
    console.log("FSM", `[StateMachine] State changed from state ${oldState} to ${this._state}`);
    console.log("FSM", `[StateMachine] Current state ${this._state}`);
    const _enterCallbackEvent: StateMachineEvent = new StateMachineEvent(StateMachineEvent.ENTER_CALLBACK);
    _enterCallbackEvent.toState = stateTo;
    _enterCallbackEvent.fromState = oldState;
    if (!_.isNil(this._states[this._state].enter)) {
      _enterCallbackEvent.currentState = this._state;
      this._states[this._state].enter.call(null, _enterCallbackEvent);
    }

    return true;
  }
}
