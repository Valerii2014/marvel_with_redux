import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { _apiKey, _apiBaseComics } from "./apiKeys";


const _transformComics = (comics) => {
    return {
        name: comics.title,
        thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        description: comics.description || 'There is no description',
        pageCount: comics.PageCount ? `${comics.PageCount} p.` : 'No information about the number  of pages',
        language: comics.textObjects.language || 'en-us',
        price: comics.prices[0].price === 0 ? 'Not avaliable' : `${comics.prices[0].price}$`,
        id: comics.id
    }
}

export const comicsApi = createApi({
    name: 'comics',
    baseQuery: fetchBaseQuery({baseUrl: _apiBaseComics}),
    endpoints: builder => ({
        getAllComics: builder.query({
            query: offset => `?limit=8&offset=${offset}&${_apiKey}`,
            transformResponse: res => res.data.results.map(_transformComics)
        }),
        getOnceComic: builder.query({
            query: id => `/${id}?${_apiKey}`,
            transformResponse: res => _transformComics(res.data.results[0])
        })
    })
})


export const {
    useGetAllComicsQuery,
    useGetOnceComicQuery,
} = comicsApi;

