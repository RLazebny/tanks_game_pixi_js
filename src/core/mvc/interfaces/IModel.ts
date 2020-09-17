export interface IModel {

	htmlElementName: string;

	width: number;

	height: number;

	deltaTime: number;

	isActive: boolean;

	onResize(width: number, height: number): void;

	init(): void;
}
