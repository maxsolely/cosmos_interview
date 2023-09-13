export interface CosmosImage {
 __typename: 'Image';
 width: number;
 height: number;
 aspectRatio: number;
 url: string;
 hash: string;
 mp4Url: string | null;
}

export interface PostObject {
 __typename: 'Post';
 id: string;
 image: CosmosImage;
 tags: string[];
}

export interface ModalState {
 isModalOpen: boolean;
 image: CosmosImage | null;
 tags: string[];
}
