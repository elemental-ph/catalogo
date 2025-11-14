// types/sanity.ts
export interface SanityImage {
  _key: string;
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string; // Optional alt text
}