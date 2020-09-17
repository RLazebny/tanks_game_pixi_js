export interface IContext<M, V, C, D = {}> {
	initialize(data?: D): void;

	getModel(): M;

	getView(): V;

	getController(): C;

	enterFrameUpdate(deltaTime: number): void;
}
