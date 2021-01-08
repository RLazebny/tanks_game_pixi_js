import {forEach} from "lodash";
import {ETanksGameResourceGroupName} from "../../enum/resources/ETanksGameResourceGroupName";
import {TAssetFile} from "../../type/TAssetFile";
import loaderConfig from "./../../../../resources/loaderConfig";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameLoadBootSceneResourcesCommand extends TanksGameBaseCommand {

	public execute(): void {
		super.execute();
		this.loadBootSceneAssets();
	}

	private loadBootSceneAssets(): void {
		const files: Array<TAssetFile> = [];
		forEach(loaderConfig.imgNames, (imgName) => {
			files.push({
				name : imgName,
				path : `./resources/${loaderConfig.type}/${imgName}`,
				type : `${loaderConfig.type}-images`
			});
		});
		const alias = ETanksGameResourceGroupName.LOADER_BAR;
		this.model.loader.load(files, alias);
	}
}
