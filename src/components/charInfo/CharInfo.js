import './charInfo.scss';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSSTransition  } from 'react-transition-group';

import { useLazyGetOnceCharacterQuery } from '../../services/charactersApi';

import setContent from '../../utils/setContent';



const CharInfo = () => {

    const charId = useSelector(state => state.characters.selectedCharId);
    const [getCharacter, {isError, isFetching, data}] = useLazyGetOnceCharacterQuery(charId);
    
    useEffect(() => {
        if(charId !== '') getCharacter(charId)
    }, [charId]);
    
    
    const View = (data) => {
        const {name, thumbnail, description, comics} = data;

        const descrUpdate = description === 'There is no description' ? 
                            "The character description missing" :
                            description;

        const imgClass = thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null;

        return (
            <>
                <div className="char__basics">
                        <img src={thumbnail} alt="abyss"
                                style={imgClass}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <Link to={`/characters/${name}`} className="button button__main">
                                    <div className="inner">homepage</div>
                                </Link>
                                <Link to={`/characters/${name}`} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {descrUpdate}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {Comics(comics)}
                    </ul>
            </>
    )}

    const Comics = (comicsList) => {

        if (comicsList.length === 0) {
            return (
                <li>
                    {`Comics with the character, not found :(`}
                </li>
            )
        }

        return (comicsList.map((item, i) => {
            if (i > 9) return
            return (
                <li className="char__comics-item"
                    key={`comics${i}`}>
                    <Link to={`comics/${(item.resourceURI).slice(-5)}`}>{item.name}</Link>
                </li>
            )
        }))
    }
  
    const content = setContent(View, data, isFetching, isError, !data)

    return (
        <CSSTransition 
            in={!isFetching}
            timeout={1500}
            className='char__info'>
            <div className="char__info">
                {content}
            </div>
        </CSSTransition>
    )
}


export default CharInfo;