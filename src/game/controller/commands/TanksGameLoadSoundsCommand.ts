import {forEach} from "lodash";
import soundResourcesConfig from "../../../../resources/soundResourcesConfig";
import {ETanksGameResourceGroupName} from "../../enum/resources/ETanksGameResourceGroupName";
import {TAssetFile} from "../../type/TAssetFile";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameLoadSoundsCommand extends TanksGameBaseCommand {

	public execute(): void {
		this.loadSoundResources();
	}

	private loadSoundResources(): void {
		const files: Array<TAssetFile> = [];
		forEach(soundResourcesConfig.soundNames, (soundName: string) => {
			files.push({
				name : soundName,
				path : `./resources/sounds/${soundName}`,
				type : `sound`
			});
		});
		const fileGroup = {
			files : files,
			alias : ETanksGameResourceGroupName.SOUNDS
		};
		this.model.loader.load(fileGroup);
	}

}
