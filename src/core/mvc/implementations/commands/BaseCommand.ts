import {IModel} from "../../interfaces/IModel";
import {IView} from "../../interfaces/IView";
import {AbstractCommand} from "../AbstractCommand";

export class BaseCommand<M = IModel, V = IView> extends AbstractCommand<M, V> {
	private _view: V;
	private _model: M;

	constructor(model: M, view: V) {
		super(model, view);
		let t: string = typeof this;
		if (t === "BaseCommand") {
			throw new Error(
				"BaseCommand can't an instance, because this is a base class, please use his extend classes for instance. ");
		}
	}

	public get IsStayInMemory(): boolean {
		return true;
	}

	protected get view(): V {
		return this._view;
	}

	protected set view(value: V) {
		this._view = value;
	}

	protected get model(): M {
		return this._model;
	}

	protected set model(value: M) {
		this._model = value;
	}

	public execute(): void {
	}

	public dispose(): void {
		this._view = null;
		this._model = null;
	}
}
