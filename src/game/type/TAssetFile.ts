export type TAssetFile = {
	name: string;
	path: string;
	type?: string;
	onComplete?: () => void;
};
