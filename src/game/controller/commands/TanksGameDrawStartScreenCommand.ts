import {Container} from "pixi.js";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameDrawStartScreenCommand extends TanksGameBaseCommand {

	public execute() {
		super.execute();
		this.view.onAssetsLoaded();
		this.view.updateScene(ETanksGameScenesName.BOOT);
	}
}
