import * as _ from "lodash";
import * as PIXI_SOUND from "pixi-sound";
import {Loader, LoaderResource} from "pixi.js";
import soundResourcesConfig from "../../../../resources/soundResourcesConfig";
import {ETanksGameCommonName} from "../../enum/ETanksGameCommonName";
import {TanksGameSoundVO} from "../../vo/TanksGameSoundVO";
import Dictionary = _.Dictionary;
import Filter = PIXI.sound.Filter;
import IMediaInstance = PIXI.sound.IMediaInstance;
import Sound = PIXI.sound.Sound;
import SoundSpriteData = PIXI.sound.SoundSpriteData;

export type SoundSpriteDataList = {
	[key: string]: SoundSpriteData;
};
export type MediaInstanceList = {
	[key: string]: Array<IMediaInstance>;
};
export type TweenList = {
	[key: string]: any;
};
export type TCustomParameterValue = {
	name: string,
	value: string | number | boolean;
};

// todo: this class not finished, need a lot of changes for correct structure

export class TanksGameSoundProxy {
	protected soundVOList: any = {};
	protected sprites: SoundSpriteDataList = {};
	protected manifest: Dictionary<string> = {};
	protected soundSprite: Sound;
	protected separateSounds: {[id: string]: Sound} = {};
	protected mediaInstanceList: MediaInstanceList = {};
	protected fadeTweenList: TweenList = {};
	private _allMuted: boolean = false;
	private _loader: Loader = Loader.shared;
	private _skinName: string;
	/**
	 * Getter for a field indicating whether all sounds are muted.
	 *
	 * @type {boolean}
	 */

	public createSoundVOList(atlas: any): void {
		_.forEach(soundResourcesConfig.soundNames, (key) => {
			this.soundVOList[key] = new TanksGameSoundVO(key);
		});
		if (_.has(atlas, "spritemap")) {
			_.each(atlas["spritemap"], (soundDetails: any, key: string) => {
				key = `${this._skinName}_${key.toLowerCase()}`;
				this.sprites[key] = soundDetails as SoundSpriteData;
				this.soundVOList[key] = new TanksGameSoundVO(key);
			});
		}
	}

	public get allMuted(): boolean {
		return this._allMuted;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		this.initVars();
		if (PIXI_SOUND.default.supported) {
			PIXI_SOUND.default.context.audioContext.onstatechange = this.onAudioContextChanged.bind(this);
			PIXI_SOUND.default.init();
		}
	}

	/**
	 * Get sounds, manifest and sound sprite from loader
	 */
	public processSoundResources(skinName: string, soundsAction: Array<TCustomParameterValue>): void {
		this._skinName = skinName;
		const soundManifest: Dictionary<string> = this.getSoundJson(
			`${skinName} ${ETanksGameCommonName.SOUNDS}`) as Dictionary<string>;
		const audioSheetJSON: {} = this.getSoundJson(`${skinName} ${ETanksGameCommonName.SOUNDS_SPRITES}`);

		this.parseSoundKeys(soundsAction);
		const separateSounds: {[id: string]: Sound} = this.getSeparateSounds(this.manifest, soundsAction);
		if (!_.isNil(separateSounds)) {
			this.separateSounds = {...this.separateSounds, ...separateSounds};
		}

		if (_.isNil(soundManifest) || _.isNil(audioSheetJSON)) {
			return;
		}
		this.extractSounds(audioSheetJSON);
		const soundSprite: Sound = this.getSoundSprite();
		if (!_.isNil(soundSprite)) {
			this.soundSprite = soundSprite;
			this.soundSprite.addSprites(this.sprites);
		}
		this.soundsParsed();
	}

	/**
	 * Add filters to the sound. Working only with separate sounds
	 *
	 *  // EXAMPLE OF USING FILTER
	 *  // retrieve proxy to apply filter next to play function
	 *
	 *  let filter: StereoFilter = new StereoFilter(-1);
	 *  TweenMax.to(filter, 1, {pan: 1, yoyo: true, repeat: -1});
	 *  this.applyFilters(soundName, [filter])
	 *
	 * @param {string} soundName
	 * @param {PIXI.sound.Filter[]} filter
	 */
	public applyFilters(soundName: string, filter: Array<Filter>): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		if (_.has(this.separateSounds, soundName)) {
			let sound: any = this.separateSounds[soundName];
			if (!_.isNil(sound.filters)) {
				filter = [...sound.filters, filter] as Array<Filter>;
			}
			sound.filters = filter;
		}
	}

	/**
	 * Set speed of sound to play it faster or slower
	 */
	public setSpeed(soundName: string, speed: number): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (_.has(this.separateSounds, soundName)) {
			let sound: any = this.separateSounds[soundName];
			sound.speed = speed;
			soundVO.speed = speed;
		}
		_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
			if (!media.muted && !media.paused) {
				media.speed = speed;
				soundVO.speed = speed;
			}
		});
	}

	/**
	 * @inheritDoc
	 */
	public play(soundName: string, loop: boolean = false, fadeInDuration: number = 0,
		callBack: Function                                                       = null): void {
		if (_.isNil(soundName)) {
			return;
		}
		if (!loop) {
			this.stop(soundName);
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		this.playSoundFromManifest(soundName, loop, fadeInDuration, callBack);
		this.playSoundFromSoundSprite(soundName, loop, fadeInDuration, callBack);
		if (!_.isNil(soundVO)) {
			if (soundVO.muted || this._allMuted) {
				this.mute(soundName);
			}
			this.setSpeed(soundName, soundVO.speed);
			soundVO.playing = true;
			/**
			 * If the sound was previously paused and now it's not resumed, but instead played,
			 * reset the pause / volume metadata from the VO
			 */
			if (soundVO.paused) {
				fadeInDuration = 0;
				soundVO.paused = false;
				this.changeSoundVolume(soundName, soundVO.pausedVolume);
			}
		} else {
			console.warn("SoundProxy", "Could not play sound with name: " + soundName);
			if (callBack) {
				callBack.call(this);
			}
		}
		/*if (fadeInDuration) {
			this.changeSoundVolume(soundName, 0);
			this.fadeVolume(soundName, fadeInDuration, 1);
		}*/
	}

	/**
	 * There are two kind of sounds. Sounds from sound sprite and separate sounds form the sound manifest.
	 * This method play sound from sound sprite
	 * @param {string} soundName
	 * @param {boolean} loop
	 * @param {number} fadeInDuration
	 * @param {Function} callBack
	 */
	public playSoundFromSoundSprite(soundName: string, loop: boolean = false, fadeInDuration: number = 0,
		callBack: Function                                                                           = null): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		if (!_.has(this.sprites, soundName)) {
			return;
		}
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (soundVO.playing) {
			return;
		}
		soundVO.loop = loop;
		this.playSoundFromSoundSpriteInternal(soundName, soundVO, callBack);
	}

	/**
	 * There are two kind of sounds. Sounds from sound sprite and separate sounds form the sound manifest.
	 * This method play sound from sound manifest
	 * @param {string} soundName
	 * @param {boolean} loop
	 * @param {number} fadeInDuration
	 * @param {Function} callBack
	 */
	public playSoundFromManifest(soundName: string, loop: boolean = false, fadeInDuration: number = 0,
		callBack: Function                                                                        = null): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		if (!_.has(this.separateSounds, soundName)) {
			return;
		}
		let sound: Sound = this.separateSounds[soundName];
		if (sound.isPlaying) {
			return;
		}
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		sound.play({
			loop     : loop,
			volume   : soundVO.volume,
			complete : (s: Sound) => {
				soundVO.playing = false;
				if (callBack) {
					callBack.call(this);
				}
			}
		});
		sound.muted = soundVO.muted;
		sound.singleInstance = true;
		if (soundVO) {
			if (!_.isNil(this.fadeTweenList[soundName])) {
				this.fadeTweenList[soundName].progress(1);
			}
			if (sound.isPlaying && !sound.muted) {
				sound.volume = soundVO.volume;
			}
		} else {
			if (_.isFunction(callBack)) {
				callBack();
			}
		}
	}

	/**
	 *
	 * @param {string} soundName
	 * @param {PIXI.sound.IMediaInstance} media
	 */
	public setMedia(soundName: string, media: IMediaInstance): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		this.addMediaListItem(soundName, media);
		if (soundVO) {
			media.volume = soundVO.volume;
			// FIX UI-323
			if (soundVO.muted) {
				media.muted = true;
			}
		}
	}

	/**
	 * Add media instance to list
	 * @param {string} soundName
	 * @param {PIXI.sound.IMediaInstance} media
	 */
	public addMediaListItem(soundName: string, media: IMediaInstance): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		if (_.isNil(this.mediaInstanceList[soundName])) {
			this.mediaInstanceList[soundName] = [];
		}
		this.mediaInstanceList[soundName].push(media);
	}

	/**
	 *
	 * @param {string} soundName
	 * @param {PIXI.sound.IMediaInstance} media
	 */
	public destroyMedia(soundName: string, media: IMediaInstance): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let index: number = this.mediaInstanceList[soundName].indexOf(media);
		if (index === -1) {
			return;
		}
		this.mediaInstanceList[soundName].splice(index, 1);
		media.destroy();
	}

	/**
	 * @inheritDoc
	 */
	public stop(soundName: string, fade: boolean = false, fadeDuration: number = 2, fadeToVolume: number = 0): void {
		console.log("PIXI_SOUND", `STOP MEDIA -- NAME: ${soundName}`);
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (_.isNil(soundVO)) {
			return;
		}
		let callback: () => void = () => {
			if (_.has(this.sprites, soundName)) {
				_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
					this.destroyMedia(soundName, media);
					soundVO.loop = false;
					soundVO.playing = false;
				});
			}
			if (_.has(this.separateSounds, soundName)) {
				this.separateSounds[soundName].stop();
				soundVO.playing = false;
			}
		};
	}

	/**
	 * @inheritDoc
	 */
	public pause(soundName: string, fade: boolean = false, fadeDuration: number = 2, fadeToVolume: number = 0): void {
		console.log("PIXI_SOUND", `PAUSE MEDIA -- NAME: ${soundName}`);
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		/**
		 * If the sound is already paused, do nothing.
		 */
		if (!_.isNil(soundVO) && soundVO.paused) {
			return;
		}
		let callback: () => void = () => {
			_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
				if (!media.paused) {
					media.paused = true;
					soundVO.paused = true;
				}
			});
			if (_.has(this.separateSounds, soundName)) {
				let sound: Sound = this.separateSounds[soundName];
				if (!sound.paused) {
					sound.pause();
					soundVO.paused = true;
				}
			}
		};
		/*if (!_.isNil(soundVO) && fade) {
			soundVO.pausedVolume = soundVO.volume;
			this.fadeVolume(soundName, fadeDuration, fadeToVolume, callback.bind(this));
		} else {
			callback.call(this);
		}*/
	}

	/**
	 * @inheritDoc
	 */
	public resume(soundName: string, fadeIn: boolean, fadeDuration: number): void {
		console.log("PIXI_SOUND", `RESUME MEDIA -- NAME: ${soundName}`);
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (_.isNil(soundVO) || !soundVO.paused) {
			return;
		}
		let callback: () => void = () => {
			console.log("PIXI_SOUND", `RESUME MEDIA -- NAME: ${soundName}`);
			_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
				if (media.paused) {
					media.paused = false;
					soundVO.paused = false;
				}
			});
			if (_.has(this.separateSounds, soundName)) {
				let sound: Sound = this.separateSounds[soundName];
				if (sound.paused) {
					sound.resume();
					soundVO.paused = false;
				}
			}
		};
		/*if (fadeIn && !this._allMuted) {
			callback.call(this);
			this.changeSoundVolume(soundName, 0);
			if (!_.isNil(soundVO)) {
				this.fadeVolume(soundName, fadeDuration, soundVO.pausedVolume);
			}
		} else {
			callback.call(this);
			if (soundVO.muted || this._allMuted) {
				this.mute(soundName);
			}
		}*/
	}

	/**
	 * @inheritDoc
	 */
	public mute(soundName: string): void {
		console.log("PIXI_SOUND", `MUTE MEDIA -- NAME: ${soundName}`);
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (soundVO) {
			soundVO.muted = true;
		}
		_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
			if (!media.muted) {
				media.muted = true;
			}
		});
		if (_.has(this.separateSounds, soundName)) {
			let sound: Sound = this.separateSounds[soundName];
			if (sound.isPlaying) {
				sound.muted = true;
				if (soundVO) {
					soundVO.muted = true;
				}
			}
		}
	}

	/**
	 * @inheritDoc
	 */
	public unmute(soundName: string): void {
		console.log("PIXI_SOUND", `UNMUTE MEDIA -- NAME: ${soundName}`);
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
			if (media.muted) {
				media.muted = false;
				if (soundVO) {
					soundVO.muted = false;
				}
			}
		});
		if (_.has(this.separateSounds, soundName)) {
			let sound: Sound = this.separateSounds[soundName];
			if (sound.isPlaying) {
				sound.muted = false;
				if (soundVO) {
					soundVO.muted = false;
				}
			}
		}
	}

	/**
	 * @inheritDoc
	 */
	public changeSoundVolume(soundName: string, volumeTo: number, skipVO: boolean = false,
		fromFade: boolean = false): void {
		console.log("PIXI_SOUND", `CHANGE SOUND VOLUME -- NAME: ${soundName}, VOLUME: ${volumeTo}`);
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (!_.isNil(soundVO) && soundVO.muted) {
			return;
		}
		_.each(this.mediaInstanceList[soundName], (media: IMediaInstance) => {
			if (media && !media.muted && !media.paused && media.progress < 1 && !this.soundSprite.muted) {
				media.volume = volumeTo;
			}
		});
		if (_.has(this.separateSounds, soundName)) {
			let sound: Sound = this.separateSounds[soundName];
			if (sound.isPlaying && !sound.muted) {
				sound.volume = volumeTo;
			}
		}
		if (soundVO && !skipVO) {
			soundVO.volume = volumeTo;
		}
		if (!fromFade && this.fadeTweenList[soundName]) {
			this.fadeTweenList[soundName].progress(1);
		}
	}

	/**
	 * @inheritDoc
	 */
	public muteAll(toggle: boolean): void {
		console.log("PIXI_SOUND", `MUTE ALL -- TOGGLE: ${toggle}`);
		this._allMuted = toggle;
		if (toggle) {
			_.each(this.mediaInstanceList, (mediaInstanceList: Array<IMediaInstance>) => {
				_.each(mediaInstanceList, (media: IMediaInstance) => {
					if (!media.muted && !media.paused) {
						media.muted = true;
					}
				});
			});
			_.each(this.separateSounds, (sound: any) => {
				if (sound.isPlaying && !sound.muted) {
					sound.muted = true;
				}
			});
			_.each(this.soundVOList, (soundVO: TanksGameSoundVO) => {
				soundVO.muted = true;
			});
		} else {
			_.each(this.mediaInstanceList, (mediaInstanceList: Array<IMediaInstance>) => {
				_.each(mediaInstanceList, (media: IMediaInstance) => {
					if (media.muted && !media.paused) {
						media.muted = false;
					}
				});
			});
			_.each(this.separateSounds, (sound: any) => {
				if (sound.isPlaying && sound.muted) {
					sound.muted = false;
				}
			});
			_.each(this.soundVOList, (soundVO: TanksGameSoundVO) => {
				soundVO.muted = false;
			});
		}
	}

	/**
	 * Fade volume from current value to volumeTo. Transition speed can be changed with duration param
	 * @param {string} soundName
	 * @param {number} duration
	 * @param {number} volumeTo
	 * @param {() => void} completeCallback
	 * @param skipVO
	 */
	/*public fadeVolume(soundName: string, duration: number, volumeTo: number,
		completeCallback: () => void = null, skipVO: boolean = false): void {
		if (_.isNil(soundName)) {
			return;
		}
		soundName = soundName.toLowerCase();
		if (!_.isNil(this.fadeTweenList[soundName])) {
			this.fadeTweenList[soundName].progress(1);
		}
		if (!duration) {
			completeCallback.call(this);
			return;
		}
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (!_.isNil(soundVO) && soundVO.muted) {
			if (completeCallback) {
				completeCallback.call(this);
			}
			return;
		}
		let volumeFrom: number = 0;
		if (soundVO) {
			volumeFrom = soundVO.volume;
		}
		let currentVolume: any = {volume : volumeFrom};
		this.fadeTweenList[soundName] = TweenMax.to(currentVolume, duration, {
			volume     : volumeTo,
			onUpdate   : () => {
				this.changeSoundVolume(soundName, currentVolume.volume, skipVO, true);
			},
			onComplete : () => {
				this.changeSoundVolume(soundName, volumeTo, skipVO, true);
				this.fadeTweenList[soundName].kill();
				delete this.fadeTweenList[soundName];
				if (completeCallback) {
					completeCallback.call(this);
				}
			}
		});
	}*/

	/**
	 * Method used to get duration of the sound in seconds by sound name.
	 * If sound doesn't exist as part of sound sprite nor as separate sound, 0 seconds duration returns.
	 * As any other method of the proxy this method expects to receive internal name of the sound - the name should be
	 * extracted from SoundNamesProxy (or proxy derived from that) before being passed as parameter.
	 *
	 * @param {string} soundName
	 * @returns {number}
	 */
	public getSoundDuration(soundName: string): number {
		let soundDuration: number = 0;
		if (_.isNil(soundName)) {
			return soundDuration;
		}
		soundName = soundName.toLowerCase();
		if (_.has(this.sprites, soundName)) {
			let spriteData: SoundSpriteData = this.sprites[soundName];
			soundDuration = spriteData.end - spriteData.start;
		} else if (_.has(this.separateSounds, soundName)) {
			soundDuration = this.separateSounds[soundName].duration;
		}
		let soundVO: TanksGameSoundVO = this.getSoundVO(soundName);
		if (!_.isNil(soundVO)) {
			soundDuration /= soundVO.speed;
		}
		return soundDuration;
	}

	public getSoundVO(soundName: string): TanksGameSoundVO {
		return this.soundVOList[soundName.toLowerCase()];
	}

	/**
	 * Init all the variables used in this command.
	 */
	protected initVars(): void {
	}

	/**
	 * Extra logic when sound is parsed
	 */
	protected soundsParsed(): void {
	}

	/**
	 * Event handler for audio context changed. To know when audio context failed for example.
	 */
	private onAudioContextChanged(): void {
		console.log("SoundProxy", "Probably audio context failed");
	}

	private playSoundFromSoundSpriteInternal(soundName: string, soundVO: TanksGameSoundVO, callBack: Function = null): void {
		let media: any;
		media = this.soundSprite.play({
			sprite : soundName,
			muted  : (this._allMuted) ? true : soundVO.muted, // force mute if allMuted == true, UCbrowser T_T
			volume : soundVO.volume
		});
		if (media instanceof Promise) {
			console.warn("PIXI_SOUND", "Sound is not loaded!");
			return;
		}
		this.setMedia(soundName, media);
		media.once("end", () => {
			soundVO.playing = false;
			this.destroyMedia(soundName, media);
			if (soundVO.loop) {
				this.play(soundName, soundVO.loop, 0, callBack);
			} else if (callBack) {
				callBack.call(this);
			}
		});
	}

	/**
	 * Prepare manifest of separate sounds
	 * @param soundManifest
	 */
	private parseSoundKeys(soundsAction: Array<TCustomParameterValue>): void {
		
		// _.each(soundManifest, (manifestItem: any, key: string) => {
		// 	const changedKey = `${this._skinName}_${this.changeSoundNameViaParameters(soundsAction, key)}`;
		// 	key = `${this._skinName}_${key.toLowerCase()}`;
		// 	this.soundVOList[changedKey] = new TanksGameSoundVO(key);
		// });
		// _.merge(this.manifest, soundManifest);
	}

	/**
	 * Extracts individual sounds from the sound assets. The results will be stored in the proxy.
	 * @param atlas JSON containing the definition of each sound.
	 */
	private extractSounds(atlas: any): void {
		if (_.has(atlas, "spritemap")) {
			_.each(atlas["spritemap"], (soundDetails: any, key: string) => {
				key = `${this._skinName}_${key.toLowerCase()}`;
				this.sprites[key] = soundDetails as SoundSpriteData;
				this.soundVOList[key] = new TanksGameSoundVO(key);
			});
		}
	}

	private getSoundJson(name: string): any {
		const soundManifest: LoaderResource = this._loader.resources[name];
		if (!_.isNil(soundManifest)) {
			return soundManifest.data;
		}
	}

	private getSeparateSounds(manifest: any, soundsAction: Array<TCustomParameterValue>): any {
		const sounds: any = {};
		_.each(manifest, (item: string, key: string) => {
			const asset: any = this._loader.resources[`${this._skinName} ${ETanksGameCommonName.SOUNDS} ${key}`];
			if (!_.isNil(asset) && !_.isNil(asset["sound"])) {
				const changedKey = this.changeSoundNameViaParameters(soundsAction, key);
				sounds[`${this._skinName}_${changedKey}`] = asset["sound"];
			}
		});
		return sounds;
	}

	private getSoundSprite(): Sound {
		const soundSprite: any = this._loader.resources[`${this._skinName} ${ETanksGameCommonName.SOUNDS_SPRITES}`];
		if (_.isNil(soundSprite)) {
			return null;
		}
		return soundSprite["sound"];
	}

	private changeSoundNameViaParameters(soundsAction: Array<TCustomParameterValue>, key: string): string|boolean|number {
		let newKey: string|boolean|number;
		soundsAction.forEach((parameterValue: TCustomParameterValue) => {
			if (parameterValue.name === key) {
				newKey = parameterValue.value;
			}
		});
		return newKey;
	}
}
