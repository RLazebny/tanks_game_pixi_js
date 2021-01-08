import {each} from "lodash";
import {IResourceDictionary, Loader} from "pixi.js";
import { Signal } from "signals";
import {ETanksGameResourceGroupName} from "../../enum/resources/ETanksGameResourceGroupName";
import {TAssetFile} from "../../type/TAssetFile";
import {TAssetFileGroup} from "../../type/TAssetFileGroup";

export class TanksGameLoaderProxy {
	public onAssetsLoaded: Signal;
	public onLoaderInProgress: Signal;
	public percentage: number;
	private _loader: Loader;
	private _alias: string;
	private _loadingQueue: Array<TAssetFileGroup>;

	constructor() {
		this.initLoader();
		this.initLoaderEvents();
	}

	public get resources(): IResourceDictionary {
		return this._loader.resources;
	}

	public load(files: TAssetFileGroup): void;
	public load(files: Array<TAssetFile>, alias?: string): void;
	public load(files: any, alias?: string): void {
		/*if (alias === ETanksGameResourceGroupName.LOADER) {
			each(files, (file: TAssetFile) => {
				this._loader.add(file.name, file.path, { crossOrigin: true, xhrType: file.type }, file.onComplete);
			});
			this._alias = alias;
			this._loader.load();
		}*/
		if (!this._loader.loading) {
			if (!Array.isArray(files)) {
				alias = files.alias;
				files = files.files;
			}
			each(files, (file: TAssetFile) => {
				this._loader.add(file.name, file.path, { crossOrigin: true, xhrType: file.type }, file.onComplete);
			});
			this._alias = alias;
			this._loader.load();
		} else {
			this._loadingQueue.push({ files: files, alias: alias });
		}
	}

	protected initLoader(): void {
		this.onAssetsLoaded = new Signal();
		this.onLoaderInProgress = new Signal();
		this._loadingQueue = [];
		this._loader = Loader.shared;
	}

	protected initLoaderEvents(): void {
		this._loader.onProgress.add(
			(loader: Loader) => {
				this.onLoaderInProgress.dispatch(loader.progress);
				console.log(this._alias + " " + loader.progress);
			},
			this
		);
		this._loader.onError.add(
			(error: Error, loader: Loader) => {
				console.log(error);
			},
			this
		);
		this._loader.onComplete.add(
			(loader: Loader) => {
				this.onAssetsLoaded.dispatch(this._alias);
				if (this._loadingQueue.length) {
					this.load(this._loadingQueue.shift());
				}
			},
			this
		);
	}

	// not need
	private loadFiles(files: Array<TAssetFile>, alias: string): void {
		each(files, (file: TAssetFile) => {
			this._loader.add(file.name, file.path, {crossOrigin : true, xhrType : file.type}, file.onComplete);
		});
		this._alias = alias;
		this._loader.load();
	}
}
