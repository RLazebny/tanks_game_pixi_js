import {Container} from "pixi.js";

export interface IScene {
	display: Container;
	layers: any;
	name: string;

	getLayer?(name: string): any;
	onAssetsLoaded?(): void;
	dispose(): void;
}
