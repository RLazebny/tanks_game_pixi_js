// todo: this part also can  be changed (perhaps needs some thought)
export class TanksGameSoundVO {
	/**
	 * The sound identifier
	 */
	private _name: string;
	/**
	 * Flag that stores if the sound is playing or not (not same thing as paused)
	 */
	private _playing: boolean = false;
	/**
	 * Flag that stores if the sound buffer has been received, and is ready to be used in playback
	 */
	private _muted: boolean = false;
	/**
	 * Flag that stores if the sound is paused. Because of the way the Web Audio API works, pausing actually means
	 * stopping the sound, and remembering the playback offset, to be used when resuming.
	 */
	private _paused: boolean = false;
	/**
	 * The sound's volume level, default is 1.
	 */
	private _volume: number = 1;
	/**
	 * Flag that stores if the sound should loop or not.
	 */
	private _loop: boolean = false;
	/**
	 * The sound's volume before it is paused. Using for restore on resume, default is 1.
	 */
	private _pausedVolume: number = 1;
	/**
	 * The sounds's speed. Default is 1
	 */
	private _speed: number = 1;

	constructor(name: string) {
		this._name = name;
	}

	get name(): string {
		return this._name;
	}

	get muted(): boolean {
		return this._muted;
	}

	set muted(value: boolean) {
		this._muted = value;
	}

	get paused(): boolean {
		return this._paused;
	}

	set paused(value: boolean) {
		this._paused = value;
	}

	get loop(): boolean {
		return this._loop;
	}

	set loop(value: boolean) {
		this._loop = value;
	}

	get volume(): number {
		return this._volume;
	}

	set volume(value: number) {
		this._volume = value;
	}

	get playing(): boolean {
		return this._playing;
	}

	set playing(value: boolean) {
		this._playing = value;
	}

	get pausedVolume(): number {
		return this._pausedVolume;
	}

	set pausedVolume(value: number) {
		this._pausedVolume = value;
	}

	get speed(): number {
		return this._speed;
	}

	set speed(value: number) {
		this._speed = value;
	}
}
