import './searchCharForm.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { useLazyGetCharacterByNameQuery } from '../../services/charactersApi';


const SearchCharForm = () => {

  const [isInitialized, setIsInitialized] = useState(false);
  const [getCharacterByName, {isFetching, isError, data}] = useLazyGetCharacterByNameQuery();
 
  useEffect(() => {
    if(!isFetching && data) setIsInitialized(isInitialized => true)
  }, [isFetching])


  const adjustingName = (char) => {
    const name = char.name;
    if(name.length > 15){ 
      return {
        first: name.slice(0, 15),
        second: name.slice(15, name.length)
      }
    }
    return {first: name}
  }

  const View = (char, adjustName) => {
    if(typeof(char) === 'string'){
      return <div className='error'>
                {char}
             </div>
    }
    const name = adjustName(char);
        return (
          <div className='error' style={{'color': '#03710E'}}>
                        There is! Visit
                        {` ${name.first} `}
                        {name.second ? <br/> : null}
                        {name.second ? `${name.second} ` : null} 
                        page?
                     </div>
        ) 
  }

  const Loading = isFetching ? <div className='error' style={{'color': '#000'}}>Checking..</div> : null;
  const ErrorMes = isError ? <div className='error'>Somithing error, try again!</div> : null;
  const Content = !isFetching && !isError && isInitialized ? View(data, adjustingName) : null;
  const LinkToCharPage = typeof(data) === 'object' && isInitialized ? 
                        (<Link to={`/characters/${data.name}`}>
                                <button className="button button__secondary">
                                  <div className="inner">TO PAGE</div>
                                </button>
                         </Link>) : null;

    return (
        <Formik
        initialValues={{title: ''}}
        validate={values => {
          if(values.title.length < 4) setIsInitialized(isInitialized => false);
          const errors = {};
          if (!values.title) {
            errors.title = 'This field is required';
          } else if (values.title.length < 4) {
            errors.title= 'Character name has be more three symbols';
          }
          return errors;
        }}
        onSubmit={values => {
            getCharacterByName(values.title);
        }}>
        
          <Form className='form'>
            <div className="form__container">
              <div className="form__search-field">
                <label htmlFor='title' className='form__label'>Or find a character by name:</label>
                <Field 
                    className='form__input'
                    type="text" 
                    name="title"
                    placeholder="Enter name: 'Thor'"/>
              </div>
                
              <div className="form__btns">
                  <button className="button button__main"
                          disabled={isFetching}
                          type="submit">
                      <div className="inner">FIND</div>
                  </button>
                  {LinkToCharPage}
              </div>
            </div>
            <FormikErrorMessage className='error' name="title" component="div" />
              {Loading}
              {ErrorMes}
              {Content}
          </Form>
      </Formik>
    )
}

export default SearchCharForm;