export type Member = {
  id: string;
  name: string;
  imageUrl: string;
  role?: string;
  links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  email?: string;
};



export interface GallerImageType {
  imageUrl: string;
  imageId: string;
}
