import {IDisposable} from "./IDisposable";

export interface IController extends IDisposable {
	/**
	 *  Register command implementation
	 *  @param name - current command name
	 *  @param classImpl - may be any <code>ICommand</code> implementor
	 */
	registerCommand(name: string, classImpl: Function): void;

	/**
	 * Find registered command implementor by name
	 * @param name - command name to search
	 * @returns - indicates the existence of a previously registered command
	 */
	hasCommand(name: string): boolean;

	/**
	 * Find and execute registered command.
	 * @param name
	 */
	executeCommand(name: string): void;

	/**
	 * Replace existing command
	 * @param name
	 */
	replaceCommand(name: string, classImpl: Function): void;

	/**
	 * Remove command by name
	 * @param name of registered command
	 */
	removeCommand(name: string): void;
}
