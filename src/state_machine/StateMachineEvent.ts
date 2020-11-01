export class StateMachineEvent {
  public static EXIT_CALLBACK: string = "exit";
  public static ENTER_CALLBACK: string = "enter";
  public static TRANSITION_COMPLETE: string = "transition complete";
  public static TRANSITION_DENIED: string = "transition denied";
  public fromState: string;
  public toState: string;
  public currentState: string;
  public type: string;

  constructor(type: string) {
    this.type = type;
  }
}
