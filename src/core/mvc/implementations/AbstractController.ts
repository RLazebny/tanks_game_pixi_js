import * as _ from "lodash";
import {ICommand} from "../interfaces/ICommand";
import {IContext} from "../interfaces/IContext";
import {IController} from "../interfaces/IController";
import {IModel} from "../interfaces/IModel";
import {IView} from "../interfaces/IView";
import {TCommandMap} from "../type/TCommandMap";
import {TFunctionMap} from "../type/TFunctionMap";

export abstract class AbstractController<C extends IContext<IModel, IView, IController>> implements IController {
	private _commandMap: TFunctionMap;
	private _commandsInMemory: TCommandMap;

	constructor() {
		this._commandMap = {};
		this._commandsInMemory = {};
	}

	protected abstract get context(): C;
	protected abstract set context(value: C);

	public registerCommand(name: string, classImpl: Function): void {
		if (this.hasCommand(name)) {
			throw new Error("Error register new command with name:" + name + ", command already registered");
		}
		this._commandMap[name] = classImpl;
	}

	public hasCommand(name: string): boolean {
		return !_.isNil(this._commandMap[name]);
	}

	public executeCommand(name: string): void {
		if (!this.hasCommand(name)) {
			throw new Error("Error execute not registered command.");
		}
		let cmd: ICommand;
		if (!_.isNil(this._commandsInMemory[name])) {
			cmd = this._commandsInMemory[name];
		} else {
			let cmdConstructor: any = this._commandMap[name];
			cmd = new cmdConstructor(this.context.getModel(), this.context.getView());
			if (cmd.IsStayInMemory) {
				this._commandsInMemory[name] = cmd;
			}
		}
		cmd.execute();
	}

	/**
	 * @inheritDoc
	 */
	public replaceCommand(name: string, classImpl: Function): void {
		if (this.hasCommand(name)) {
			this.removeCommand(name);
			this.registerCommand(name, classImpl);
		} else {
			throw new Error("Error while replacing not existing command with name:" + name);
		}
	}

	/**
	 * Remove command by name
	 * @param {string} name existen registered command name
	 */
	public removeCommand(name: string): void {
		if (this.hasCommand(name)) {
			if (!_.isNil(this._commandsInMemory[name])) {
				this._commandsInMemory[name].dispose();
				delete this._commandsInMemory[name];
			}
			delete this._commandMap[name];
		}
	}

	/**
	 * Dispose allocated data.
	 */
	public dispose(): void {
		if (this._commandsInMemory !== null) {
			for (let mapKey in this._commandsInMemory) {
				this._commandsInMemory[mapKey].dispose();
				delete this._commandsInMemory[mapKey];
			}
		}
	}
}
