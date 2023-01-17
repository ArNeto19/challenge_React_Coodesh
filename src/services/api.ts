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

export const searchPosts = async (query: string) => {
  try {
    const response = await api.get(`/posts?search=${query}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
