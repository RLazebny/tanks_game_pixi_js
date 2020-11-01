export interface ICommand {
	IsStayInMemory: boolean;

	dispose(): void;
	execute(): void;
}
