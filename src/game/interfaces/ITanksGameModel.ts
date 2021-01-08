import {IResourceDictionary, Loader} from "pixi.js";
import {Signal} from "signals";
import {TanksGameLoaderProxy} from "../model/proxy/TanksGameLoaderProxy";
import {TanksGameStateMachineProxy} from "../model/proxy/TanksGameStateMachineProxy";

export interface ITanksGameModel {

	onResourcesLoad: Signal;
	width: number;
	height: number;
	loader: TanksGameLoaderProxy;
	stateMachine: TanksGameStateMachineProxy;
	htmlParentElement: HTMLElement;
	_resources: IResourceDictionary;
	resources: IResourceDictionary;
	_progressPercentage: number;
	initProxies(): void;
	setResources(): void;
	// loadMandatoryAssets(): void;
}
