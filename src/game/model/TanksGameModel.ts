import * as PIXI from "pixi.js";
import {IResourceDictionary} from "pixi.js";
import {Signal} from "signals";
import {ETanksGameStaticValues} from "../enum/ETanksGameStaticValues";
import {ITanksGameModel} from "../interfaces/ITanksGameModel";
import {TAssetFileGroup} from "../type/TAssetFileGroup";
import {TBulletData} from "../type/TBullet";
import {TanksGameLoaderProxy} from "./proxy/TanksGameLoaderProxy";
import {TanksGameSoundProxy} from "./proxy/TanksGameSoundProxy";
import {TanksGameStateMachineProxy} from "./proxy/TanksGameStateMachineProxy";

export class TanksGameModel implements ITanksGameModel {
	public onResourcesLoad: Signal = new Signal();
	public onTankFired: Signal = new Signal();
 	public width: number = ETanksGameStaticValues.GAME_WIDTH;
 	public height: number = ETanksGameStaticValues.GAME_HEIGHT;
 	public deltaTime: number;
 	public timeCounter: number = 0;
 	public bulletData: TBulletData;
	public stateMachine: TanksGameStateMachineProxy;
	public loader: TanksGameLoaderProxy;
	public soundProxy: TanksGameSoundProxy;
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
		this.soundProxy = new TanksGameSoundProxy();
		this.stateMachine = new TanksGameStateMachineProxy();
	}

	public playSound(soundName: string): void {
		this.soundProxy.play(soundName);
		// if (!this._isSoundPlaying) {
		// 	this.soundProxy.play(soundName);
			// this._isSoundPlaying = true;
		// } else {
			// Log.warning(`Can't play sound! Before play add it to the queue.`);
		// }
	}

	// public set progressPercentage(percent: number) {
	// 	this._progressPercentage = percent;
	// }
	//
	// public get progressPercentage(): number {
	// 	return this._progressPercentage;
	// }
}
