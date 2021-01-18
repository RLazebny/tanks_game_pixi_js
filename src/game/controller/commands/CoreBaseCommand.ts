import {ITanksGameModel} from "../../interfaces/ITanksGameModel";
import {ITanksGameView} from "../../interfaces/ITanksGameView";

export class CoreBaseCommand {
	private _view: ITanksGameView;
	private _model: ITanksGameModel;

	constructor(model: ITanksGameModel, view: ITanksGameView) {
		this.model = model;
		this.view = view;
		let t: string = typeof this;
		if (t === "BaseCommand") {
			throw new Error(
				"BaseCommand can't an instance, because this is a base class, please use his extend classes for instance. ");
		}
	}

	protected get view(): ITanksGameView {
		return this._view;
	}

	protected set view(value: ITanksGameView) {
		this._view = value;
	}

	protected get model(): ITanksGameModel {
		return this._model;
	}

	protected set model(value: ITanksGameModel) {
		this._model = value;
	}

	public execute(): void {
	}

	public dispose(): void {
		this._view = null;
		this._model = null;
	}
}
