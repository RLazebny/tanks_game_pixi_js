import {Container} from "pixi.js";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameDrawStartScreen extends TanksGameBaseCommand {

	public startScrContainer: Container;

	public execute() {
		super.execute();
		this.view.setBackground(this.model.resources);
		this.view.drawTemplate();
	}
}
