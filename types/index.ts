
export type FieldErrors = Record<string, string[] | undefined>;

export interface ServerActionResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errorType?: string;
  fieldErrors?: FieldErrors;
}

export interface Createcategory{
    title :string;
}

export interface GetCategories{
    id :string;
    title:string;
    slug:string;
}

export interface CreateProjectInput {
    title: string;
    slug: string;
    description: string;
    categoryId: string;
    mainImage: { url: string; key?: string };
    galleryImages: Array<{ url: string; key?: string }>;
    video?: { url: string; key?: string } | null;
  }


export interface ColProject{
    id:string;
    title:string;
    proSlug:string;
    mainImage: string;
}

export interface CollView{
    id:string;
    title:string;
    slug:string;
    projects: ColProject[]
}