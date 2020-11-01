// @ts-ignore
import {Loader} from "pixi.js";
import {TAssetFile} from "../../type/TAssetFile";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameLoadResources extends TanksGameBaseCommand {

	private testFile: TAssetFile = {
		name: "startScreen",
		path: "./scr1.png"
	};

	public execute(): void {
		super.execute();
		this.addAssetToLoader(this.testFile);
		this.loadResources();
	}

	public loadResources(): void {
		this.model.loader.load();
		this.model.loader.onComplete.add((loader: Loader) => {
			this.model.onResourcesLoad.dispatch();
		});
	}

	private addAssetsToLoader(fileGroup: Array<TAssetFile>): void {
		fileGroup.forEach((file: TAssetFile) => {
			this.model.loader.add(file.name, file.path);
		});
	}

	private addAssetToLoader(file: TAssetFile): void {
		console.log("model: ", this.model);
		this.model.loader.add(file.name, file.path);
	}

}
