import {IResourceDictionary, Loader} from "pixi.js";
import {Signal} from "signals";
import {TanksGameLoaderProxy} from "../model/proxy/TanksGameLoaderProxy";
import {TanksGameSoundProxy} from "../model/proxy/TanksGameSoundProxy";
import {TanksGameStateMachineProxy} from "../model/proxy/TanksGameStateMachineProxy";
import {TBulletData} from "../type/TBullet";

export interface ITanksGameModel {

	onResourcesLoad: Signal;
	onTankFired: Signal;
	width: number;
	height: number;
	deltaTime: number;
	timeCounter: number;
	bulletData: TBulletData;
	loader: TanksGameLoaderProxy;
	soundProxy: TanksGameSoundProxy;
	stateMachine: TanksGameStateMachineProxy;
	htmlParentElement: HTMLElement;
	_resources: IResourceDictionary;
	resources: IResourceDictionary;
	_progressPercentage: number;
	initProxies(): void;
	setResources(): void;
	playSound(soundName: string): void;
}
