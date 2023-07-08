import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _apiKey, _apiBaseCharacters } from "./apiKeys";


const _transformCharacter = (char) => {
    return {
        name: char.name,
        description: char.description || 'There is no description',
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        id: char.id,
        comics: char.comics.items
    }
}

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({baseUrl: _apiBaseCharacters}),
    endpoints: builder => ({
        getAllCharacters: builder.query({
            query: offset => `?limit=9&offset=${offset}&${_apiKey}`,
            transformResponse: res => res.data.results.map(_transformCharacter)
        }),
        getOnceCharacter: builder.query({
            query: id => `/${id}?${_apiKey}`,
            transformResponse: res =>  _transformCharacter(res.data.results[0]),
        }),
        getCharacterByName: builder.query({
            query: name => `?name=${name}&${_apiKey}`,
            transformResponse: res => {
                if(res.data.results.length === 0) {
                    return 'Character not found, try again!'
                }
                return _transformCharacter(res.data.results[0])
            } 
        })
    })                       
})

export const {
    useGetAllCharactersQuery,
    useGetOnceCharacterQuery,
    useGetCharacterByNameQuery,
    useLazyGetOnceCharacterQuery,
    useLazyGetCharacterByNameQuery
} = charactersApi;

