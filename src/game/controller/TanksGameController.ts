import {isNil} from "lodash";
import {ICommand} from "../interfaces/ICommand";
import {TanksGameContext} from "../TanksGameContext";

type TFunctionMap = {
	[id: string]: Function;
};

export class TanksGameController {
	private _commandMap: TFunctionMap;
	private _context: TanksGameContext;

	constructor(context: TanksGameContext) {
		this._commandMap = {};
		this._context = context;
	}

	protected get context(): TanksGameContext {
		return this._context;
	}

	protected set context(value: TanksGameContext) {
		this._context = value;
	}

	public registerCommand(name: string, classImpl: Function): void {
		if (this.hasCommand(name)) {
			throw new Error("Error register new command with name:" + name + ", command already registered");
		}
		this._commandMap[name] = classImpl;
	}

	public hasCommand(name: string): boolean {
		return !isNil(this._commandMap[name]);
	}

	public executeCommand(name: string): void {
		if (!this.hasCommand(name)) {
			throw new Error("Error execute not registered command.");
		}
		let cmd: ICommand;
		let cmdConstructor: any = this._commandMap[name];
		cmd = new cmdConstructor(this.context.getModel, this.context.getView);
		cmd.execute();
	}
}
