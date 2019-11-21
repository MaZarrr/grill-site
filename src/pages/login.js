// import { Link } from "gatsby"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
import {useAuth} from './../components/Firebase';
import React, {useState, useContext, useEffect} from "react"
import {FirebaseContext} from './../components/Firebase';
import {Form, Input, Button, ErrorMessage} from '../components/common'

const Login = () => {
    console.log(useAuth());
    const [formValues, setFormatValues] = useState({email: '', password: ''});
    const {firebase} = useContext(FirebaseContext);
    const [errorMassege, setErrorMessege] = useState('');
    let isMounted = true; // isMounted переводится как монтируется

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
          if(isMounted) {
          console.log(error);
          setErrorMessege(error.message);
          }
        });
    }

    const handleInputChange = (e) => {
        e.persist();
        // console.log(e.target.value);
        setErrorMessege(''); // так как мы считываем из инпутов то ошибка опять убирается(инофрмирование)
        setFormatValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }
    
    return (
        <section>
          <Form onSubmit={handleSubmit}>
              <Input value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="email" required></Input>
              <Input value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" required></Input>
              {!!errorMassege &&
                <ErrorMessage>
                {errorMassege}
              </ErrorMessage>
              }
              <Button type="submit" block>
                Войти
              </Button>
          </Form>
        </section>
      );
}

export default Login
