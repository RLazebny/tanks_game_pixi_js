import {ICommand} from "../interfaces/ICommand";

export abstract class AbstractCommand<M, V> implements ICommand {
	constructor(model: M, view: V) {
		this.init(model, view);
	}

	public abstract get IsStayInMemory(): boolean;

	protected abstract get view(): V;

	protected abstract set view(value: V);

	protected abstract get model(): M;

	protected abstract set model(value: M);

	public abstract execute(): void;

	public abstract dispose(): void;

	protected init(model: M, view: V): void {
		this.model = model;
		this.view = view;
	}
}
