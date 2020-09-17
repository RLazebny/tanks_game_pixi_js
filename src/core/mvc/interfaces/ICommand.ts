import {IDisposable} from "./IDisposable";

export interface ICommand extends IDisposable {
	IsStayInMemory: boolean;

	execute(): void;
}
