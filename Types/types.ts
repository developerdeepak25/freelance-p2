export type Member = {
  name: string;
  imageUrl: string;
  role?: string;
  links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
};
