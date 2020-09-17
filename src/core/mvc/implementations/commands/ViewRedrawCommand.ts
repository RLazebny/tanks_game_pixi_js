import {BaseCommand} from "./BaseCommand";

export class ViewRedrawCommand extends BaseCommand {
	public execute(): void {
		this.view.onEnterFrameRedraw(this.model.deltaTime);
	}
}
