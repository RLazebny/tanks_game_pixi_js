import {forEach} from "lodash";
import {ETanksGameResourceGroupName} from "../../enum/resources/ETanksGameResourceGroupName";
import {TAssetFile} from "../../type/TAssetFile";
import {TAssetFileGroup} from "../../type/TAssetFileGroup";
import imgResourcesConfig from "./../../../../resources/imgResourcesConfig";
import loaderConfig from "./../../../../resources/loaderConfig";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameLoadImgCommand extends TanksGameBaseCommand {

	public execute(): void {
		super.execute();
		this.loadResources();
	}

	public loadResources(): void {
		this.model.loader.load(this.createImgFileGroup());
	}

	/*private addAssetsToLoader(fileGroup: Array<TAssetFile>): void {
		fileGroup.forEach((file: TAssetFile) => {
			this.model.loader.add(file.name, file.path);
		});
	}
	private addAssetToLoader(file: TAssetFile): void {
		console.log("model: ", this.model);
		this.model.loader.add(file.name, file.path);
	}*/
	/*protected addMandatoryAssets(files: Array<TAssetFile>): Array<TAssetFile> {
		const skin = this._availableSkins.shift();
		// this.model.skinNameForLoad = skin.assetsFolder;
		// this.addAssets(skin, files);
		return files;
	}*/

	private createImgFileGroup(): TAssetFileGroup {
		const files: Array<TAssetFile> = [];
		forEach(imgResourcesConfig, (imgGroup: any) => {
			const type = imgGroup.path;
			const path = imgGroup.path;
			forEach(imgGroup.imgNames, (imgName: string) => {
				files.push({
					name : imgName,
					path : `./resources/img${path}${imgName}`,
					type : `${type}-images`
				});
			});
		});
		return {
			files : files,
			alias : ETanksGameResourceGroupName.IMG
		};
	}
}
