import './infoPage.scss'


import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useGetCharacterByNameQuery } from '../../services/charactersApi';

import setContent from '../../utils/setContent';


const CharPage = () => {

    const navigate = useNavigate();
    const {charName} = useParams();
    const {isFetching, isError, data} = useGetCharacterByNameQuery(charName);

    function View(content) {
        return(
            <>
                <div><img src={content.thumbnail} alt="name" className="single-comic__img"/></div>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{content.name}</h2>
                    <p className="single-comic__descr">{content.description}</p>
                </div>
            </>
        )
    }

    const content = setContent(View, data, isFetching, isError);
    
    return (
        <>
            <Helmet>
                <meta
                    name="Info page"
                    content={`${charName}`}
                    />
                <title>
                    {`Information about ${charName}`}
                </title>
            </Helmet>
            <div className="single-comic">
                    {content}
                <div onClick={() => navigate(-1)} className="single-comic__back">To back</div>
            </div>
        </>
    )
}

export default CharPage;