import * as PIXI from "pixi.js";
import {IResourceDictionary, Loader} from "pixi.js";
import {Signal} from "signals";
import {ITanksGameModel} from "../interfaces/ITanksGameModel";

export class TanksGameModel implements ITanksGameModel {
	public onResourcesLoad: Signal = new Signal();
 	public width: number;
 	public height: number;
	public loader: Loader;
	public _resources: IResourceDictionary;
	public htmlParentElement: HTMLElement;

	constructor() {
		console.log("pixi: ", PIXI);
		this.loader = new PIXI.Loader();
	}

	public get resources(): IResourceDictionary {
		return this.loader.resources;
	}

	public setResources(): void {
		this._resources = this.loader.resources;
		this.onResourcesLoad.dispatch();
	}

}
