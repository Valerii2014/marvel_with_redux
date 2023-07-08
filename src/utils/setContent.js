import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';


const setContent = (Component, data, loading, error, isUninitialized = false) => {

    if(loading) return <Spinner/>;
    
    if(isUninitialized) return <Skeleton/>;

    if(error) return <ErrorMessage/>;

    if(!loading && !error) return Component(data);

    throw new Error('Unexpected process state');

}


export default setContent;  