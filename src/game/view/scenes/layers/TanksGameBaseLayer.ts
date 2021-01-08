import {Container} from "pixi.js";
import {ILayer} from "../../../interfaces/ILayer";

export class TanksGameBaseLayer implements ILayer {

	public display: Container;

	constructor() {
		this.display = new Container();

	}

	public dispose(): void {
		this.display.visible = false;
		this.display.removeChildren();
	}

}
