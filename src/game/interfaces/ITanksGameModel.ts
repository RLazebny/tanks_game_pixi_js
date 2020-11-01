import {IResourceDictionary, Loader} from "pixi.js";
import {Signal} from "signals";

export interface ITanksGameModel {

	onResourcesLoad: Signal;
	width: number;
	height: number;
	loader: Loader;
	htmlParentElement: HTMLElement;
	_resources: IResourceDictionary;
	resources: IResourceDictionary;
	setResources(): void;
}
