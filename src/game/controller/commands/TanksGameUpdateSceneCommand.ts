import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameUpdateSceneCommand extends TanksGameBaseCommand {

	public execute(): void {
		this.view.updateScene(this.model.stateMachine.state);
	}
}
