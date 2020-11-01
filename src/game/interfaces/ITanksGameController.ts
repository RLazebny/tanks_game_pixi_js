export interface ITanksGameController {
	registerCommand(name: string, classImpl: Function): void;
	executeCommand(name: string): void;
}
