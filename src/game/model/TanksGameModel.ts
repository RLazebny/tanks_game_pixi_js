import * as PIXI from "pixi.js";
import {IResourceDictionary} from "pixi.js";
import {Signal} from "signals";
import {ITanksGameModel} from "../interfaces/ITanksGameModel";
import {TAssetFileGroup} from "../type/TAssetFileGroup";
import {TanksGameLoaderProxy} from "./proxy/TanksGameLoaderProxy";
import {TanksGameStateMachineProxy} from "./proxy/TanksGameStateMachineProxy";

export class TanksGameModel implements ITanksGameModel {
	public onResourcesLoad: Signal = new Signal();
 	public width: number = 1024;
 	public height: number = 768;
	public stateMachine: TanksGameStateMachineProxy;
	public loader: TanksGameLoaderProxy;
	public _resources: IResourceDictionary;
	public htmlParentElement: HTMLElement;
	public _progressPercentage: number;

	constructor() {
		this.initProxies();
	}

	public get resources(): IResourceDictionary {
		return this.loader.resources;
	}

	public setResources(): void {
		this._resources = this.loader.resources;
		this.onResourcesLoad.dispatch();
	}

	public initProxies(): void {
		this.loader = new TanksGameLoaderProxy();
		this.stateMachine = new TanksGameStateMachineProxy();
	}

	// public set progressPercentage(percent: number) {
	// 	this._progressPercentage = percent;
	// }
	//
	// public get progressPercentage(): number {
	// 	return this._progressPercentage;
	// }
}
