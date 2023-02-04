import axios from "axios";

const api = axios.create({
  baseURL: "https://api.beta.mejorconsalud.com/wp-json/mc/v2",
});

export interface IApiData {
  data: IPostData[];
  size: number;
  pages: number;
}

export interface IPostData {
  id: number;
  headline: string;
  title: string;
  link: string;
}

export interface IArticleData {
  id: number;
  title: string;
  headline: string;
  slug: string
  content: string;
  author: {
    id: number;
    name: string;
    link: string;
    description: string;
  };
  bibliography: string;
  published: string;
  categories: [
    {
      id: number;
      name: string;
    }
  ];
  tags: [
    {
      id: number;
      slug: string;
    }
  ];
}

export const searchPosts = async (query: string | null, page?: number, orderType?: string) => {
  try {
    if (orderType !== undefined) {
      const response = await api.get(`/posts?search=${query}&page=${page}&orderby=${orderType}`);

      return response.data;
    }

    const response = await api.get(`/posts?search=${query}&page=${page}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getArticle = async (postId?: string) => {
  try {
    const response = await api.get(`/posts/${postId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
