import './comicsList.scss';


import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useGetAllComicsQuery } from '../../services/comicsApi';
import { setComics } from '../../store/appSlice/comicsSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const ComicsList = () => {
    
    const dispatch = useDispatch();
    const {offset, comics} = useSelector(state => state.comics);
    const {isFetching, isLoading, isError, data} = useGetAllComicsQuery(offset);
    const comicsListAll = data && !isFetching ? [...comics, ...data] : comics;
   
    const View = (data) => {
        return (
            <ul className="comics__grid">
                { data.map((comics, i) => {
                    const {name, thumbnail, price, id} = comics;
                    return (
                        <li className="comics__item" key={i}>
                            <Link to={`${id}`}>
                                <img src={thumbnail} alt={`There has be a ${name}`} className="comics__item-img"/>
                                <div className="comics__item-name">{name}</div>
                                <div className="comics__item-price">{`${price}`}</div>
                            </Link>
                        </li>
                    )})
                }
            </ul>
        )
    }
    
    const loading = isLoading ? <Spinner/> : null;
    const error = isError ? <ErrorMessage/> : null;
    const content = !isLoading && !isError ? View(comicsListAll) : null;

    return (
        <div className="comics__list">
            {loading}
            {error}
            {content}
            <button 
                className="button button__main button__long"
                style={{display: `${comicsListAll.length >= 22 ? 'none' : 'block'}`}}
                disabled={isFetching}
                onClick={() => dispatch(setComics(data))}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;