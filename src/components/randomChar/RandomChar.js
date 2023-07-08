
import './randomChar.scss';


import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { useGetOnceCharacterQuery } from '../../services/charactersApi';
import { setRandomCharId } from '../../store/appSlice/charactersSlice';
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent'



const RandomChar = () => {

    const charId = useSelector(state => state.characters.randomCharId);
    const dispatch = useDispatch();

    const getRandomChar = () => {
        const newId = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        dispatch(setRandomCharId(newId));
    }

    const { data, isFetching, isError } = useGetOnceCharacterQuery(charId);

    function View(char) {
        const {name, description, thumbnail} = char;
        const imgClass = thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null;
        let descrUpdate;
        
        if(description.length >= 211){
            descrUpdate = description.slice(0, 210) + '...';
        }  else {
            descrUpdate = description;
        }
    
        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" 
                    className="randomchar__img"
                    style={imgClass}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {descrUpdate}
                    </p>
                    <div className="randomchar__btns">
                        <Link to={`/characters/${name}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <Link to={`/characters/${name}`} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const content = setContent(View, data, isFetching, isError)

    return (
        <div className="randomchar">
            <SwitchTransition mode='out-in'>
                <CSSTransition 
                    timeout={800}
                    key={isFetching}
                    classNames='randomchar__block'>    
                        {content}
                </CSSTransition>
            </SwitchTransition>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={getRandomChar}
                    disabled={isFetching ? true : false}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


export default RandomChar;
