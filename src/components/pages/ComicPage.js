import './infoPage.scss'


import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useGetOnceComicQuery } from '../../services/comicsApi';

import setContent from '../../utils/setContent';


const ComicPage = () => {

    const navigate = useNavigate();
    const {comicTitle} = useParams();
    const {isFetching, isError, data} = useGetOnceComicQuery(comicTitle);

    function View(content) {
        return(
            <>
                <div><img src={content.thumbnail} alt="name" className="single-comic__img"/></div>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{content.name}</h2>
                    <p className="single-comic__descr">{content.description}</p>
                    <p className="single-comic__descr">{content.pageCount}</p>
                    <p className="single-comic__descr">Language: {content.language}</p>
                    <div className="single-comic__price">{content.price}</div> 
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
                    content={`${comicTitle}`}
                    />
                <title>
                    {`Information about ${comicTitle}`}
                </title>
            </Helmet>
            <div className="single-comic">
                    {content}
                <div onClick={() => navigate(-1)} className="single-comic__back">To back</div>
            </div>
        </>
    )
}

export default ComicPage;