import React, {useState, useContext, useEffect} from "react"
import {Form, Input, Button} from '../components/common'
import {FirebaseContext} from '../components/Firebase'

const AddAuthor = () => {

const {firebase} = useContext(FirebaseContext);  
const [authorName, setAuthorName] = useState('');

//Таким образом, в форме добавления автора мы могли бы добавить небольшую обратную связь здесь для пользователя просто так
const [success, setSuccess] = useState(false);

let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, []);
    
const handleSubmit = (e) => {
    e.preventDefault();
    // чтобы завершить весь жизненный цикл добавления нового автора, мы хотим позвонить из нашей формы автора объявления.
    // Мы хотим вызвать firebase dots create author, что означает, что в AD author нам нужно импортировать firebase.
    firebase.createAuthor({
        authorName}).then(()=> { //давайте перейдем в точку, и мы просто хотим установить для установленного успеха значение true
            // Итак, в случае успеха давайте также установим имя автора в пустую строку.
            if(isMounted) {
            setAuthorName('');
            setSuccess(true);
        }
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={(e) => {
                e.persist();
                // А также, если мы перейдем к обработчику изменений, давайте установим в значение false значение false.
                setSuccess(false);
                setAuthorName(e.target.value);
            }} value={authorName} placeholder="Автор"></Input>
            {!!success && 
            <span>
                Товар добавлен успешно!
            </span>
            }
            <Button type="submit" block>Добавить нового автора</Button>
        </Form>
    )
}

export default AddAuthor;