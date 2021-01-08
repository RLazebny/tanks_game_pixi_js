export interface ICommand {
	dispose(): void;
	execute(): void;
}
