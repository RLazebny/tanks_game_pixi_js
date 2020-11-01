import {find} from "lodash";
import {Container} from "pixi.js";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {IScene} from "../../interfaces/IScene";

export class TanksGameGameScene implements IScene {
	public display: Container;
	public layers: [];
	public name: string;

	constructor() {
		this.name = ETanksGameScenesName.GAME;
		this.display = new Container();
		this.display.visible = false;
		this.display.name = "MainGameScene";
		this.layers = [];
		this.initLayers();
	}

	public dispose(): void {
		this.display.removeChildren();
		this.layers.length = 0;
	}

	public getLayer(name: string): any {
		return find(this.layers, (layer: any) => {
			return layer.name === name;
		});
	}

	private initLayers(): void {
	}
}
