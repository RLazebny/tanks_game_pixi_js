import * as PIXI from "pixi.js";
import {ITanksGameModel} from "../interfaces/ITanksGameModel";

export class TanksGameModel implements ITanksGameModel {
 	public width: number;
 	public height: number;
	public loader: PIXI.Loader;

	constructor() {
		this.loadResources();
	}

	public loadResources(): void {
		this.loader.add();

		this.loader.load();
	}

	private static createResourceList(): Array<string> {
		let resourcesList: Array<string>;
		// need add method for load resources

		return resourcesList;
	}
}
