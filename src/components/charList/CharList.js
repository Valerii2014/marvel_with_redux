import './charList.scss';


import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { setChars, setCharInfoId } from '../../store/appSlice/charactersSlice';
import { useGetAllCharactersQuery } from '../../services/charactersApi';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const CharList = () => {
    
    const {offset, chars, selectedCharId} = useSelector(state => state.characters);
    const {isLoading, isFetching, isError, data} = useGetAllCharactersQuery(offset);
    const dispatch = useDispatch();
    const itemRefs = useRef([]);

    const charList = data ? [...chars, ...data] : chars;
    

    const focusOnItem = (i) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[i].classList.add('char__item_selected');
    }

    function View(charsList, selectedCharId = null) {
        const charItems = charsList.map((el, i) => {
                const {thumbnail, name, id} = el;
                const classSelected = selectedCharId === id ? 'char__item_selected' : '';
                const imgClass = thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null;
                return (
                    <CSSTransition timeout={500} key={id} classNames='char__item'>
                        <li className={`char__item ${classSelected}`}
                            tabIndex='0'
                            ref={el => itemRefs.current[i] = el}
                            onClick={() => {
                                focusOnItem(i);
                                dispatch(setCharInfoId(id));
                                }}>
                            <img src={thumbnail} alt={`it is ${name}`} style={imgClass} />
                            <div className="char__name">{name}</div>
                        </li>
                    </CSSTransition>
                )
            });
        return charItems; 
    }
    
    const loading = isLoading ? <Spinner/> : null;
    const error = isError ? <ErrorMessage/> : null;
    const content = !isLoading && !isError ? View(charList, selectedCharId) : null;
 
    return (
        <div className="char__list">
            {loading}
            {error}
            <TransitionGroup className="char__grid">
                {content} 
            </TransitionGroup>
            <button 
                className="button button__main button__long"
                style={{display: `${charList.length > 63 ? 'none' : 'block'}`}}
                disabled={isFetching}
                onClick={() => dispatch(setChars(charList))}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;