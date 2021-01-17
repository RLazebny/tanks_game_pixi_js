import {forEach} from "lodash";
import {ETanksGameResourceGroupName} from "../../enum/resources/ETanksGameResourceGroupName";
import {TAssetFile} from "../../type/TAssetFile";
import {TAssetFileGroup} from "../../type/TAssetFileGroup";
import imgResourcesConfig from "./../../../../resources/imgResourcesConfig";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameLoadImgesCommand extends TanksGameBaseCommand {

	public execute(): void {
		super.execute();
		this.loadImgResources();
	}

	private loadImgResources(): void {
		this.model.loader.load(this.createImgFileGroup());
	}

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
