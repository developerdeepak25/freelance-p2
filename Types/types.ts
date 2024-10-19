export type ClientMember = {
  _id: string;
  name: string;
  email: string;
  phoneNo?: string;
  photo?: string;
  panCardNo?: string;
  aadharCardNo?: string;
  dateOfBirth?: Date;
  caste?: string;
  designation: string;
  profession?: string;
  committee: string;
  socialLinks: SocialLink[];
};
type SocialLink = {
  platform: string;
  url: string;
};

export interface GallerImageType {
  imageUrl: string;
  imageId: string;
}
