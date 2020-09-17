import {BaseCommand} from "./BaseCommand";

export class ActivatedCommand extends BaseCommand {

	public execute(): void {
		this.model.isActive = true;
	}
}
