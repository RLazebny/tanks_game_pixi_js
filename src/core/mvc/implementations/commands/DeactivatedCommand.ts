import {BaseCommand} from "./BaseCommand";

export class DeactivatedCommand extends BaseCommand {

	public execute(): void {
		this.model.isActive = false;
		this.view.setEnabled(false);
	}
}
