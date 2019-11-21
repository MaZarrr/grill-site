import React, {useState, useContext, useEffect} from "react"
import {Form, Input, Button} from '../components/common'
import {FirebaseContext} from '../components/Firebase'
import styled from 'styled-components';

const FormField = styled.div `
margin-bottom: 20px;
`

// const fileReader = new FileReader(); // преобразовать файл в строку в кодировке base64.
let fileReader;
if(typeof window !== 'undefined') {
    fileReader = new FileReader();
}

const AddGril = () => {
    const {firebase} = useContext(FirebaseContext);  
    const [authors, setAuthors] = useState([]);
    const[grilCover, setGrilCover] = useState('');
    const[grilName, setGrilName] = useState('');
    const[authorId, setAuthorId] = useState('');
    const[summary, setSummary] = useState('');
    const [success, setSuccess] = useState(false);

    let isMounted = true;

    useEffect(() => {
     return () => {
        isMounted = false;
     }
    }, []);

    useEffect(() => { // И мы хотим, чтобы это работало только тогда, когда компонент монтируется, поэтому мы хотим добавить прослушиватель событий. base64
        fileReader.addEventListener('load', () => { // к этому устройству чтения файлов, чтобы мы могли перейти к точкам чтения файлов, добавить прослушиватель событий и имя прослушивателя событий. И в этой функции в этой функции обратного вызова мы можем установить обложку книги и передать точку чтения файлов n
                setGrilCover(fileReader.result);
            })
    }, []);

    //ы все еще можем загружать зависимости firebase, и мы не создали наш экземпляр firebase
    useEffect(() => { // 
        // запросить всех доступных авторов
        if(firebase) {
            firebase.getAuthors().then(snapshot => {
            if(isMounted) {
            // console.log(snapshot);
            const availableAuthors = [];
                snapshot.forEach(doc => {
                   availableAuthors.push({
                       id: doc.id,
                       ...doc.data()
                   
                   }) 
                })
                
                setAuthorId(availableAuthors[0]); // Мы хотим установить автора по умолчанию И.Д. как только мы получим авторов, мы хотим убедиться, что автор по умолчанию, выбранный в поле выбора или раскрывающемся списке, является первым автором в

                setAuthors(availableAuthors);
            }
            }) // возможно, еще не имеет доступа к Firebase, но после того, как экземпляр firebase будет создан, это использование влияет, потому что мы передаем firebase здесь в массиве здесь. Эффект использования будет запущен повторно, а затем, если будет создан базовый экземпляр firebase, мы сможем получить авторов.
        }
    }, [firebase]) //  при использовании факта вместо передачи пустого массива здесь мы можем передать firebase
    // Таким образом, этот эффект использования будет обновляться только в любое время или только в любое время.
    // Этот объект Firebase изменяется, поэтому в новостном эффекте нам нужно убедиться, что у нас есть f Firebase
    
    // console.log(authors);
    
    return (
        
        <Form onSubmit={(e)=> {
            e.preventDefault();
            console.log(grilCover);
            console.log(grilName);
            console.log(authorId);
            // И это не сработает сразу, но нам нужно сгенерировать сообщение об ошибке в консоли Firebase, потому что оно 
            // предоставит нам ссылку для включения определенной службы. Итак, давайте идти вперед и иметь тестовую книгу здесь. 
            // Давайте просто пройдемся по движениям и давайте добавим новую книгу, и на самом деле нам нужно вернуться к Гэтсби 
            // После установки модуля mimetypes в firebase functions
            firebase.createGril({
                grilCover,
                grilName,
                authorId,
                summary
            }).then(() => {
                if(isMounted) {
                setSuccess(true)
            }
            })
        }}>
            <FormField>
            <Input value={grilName} onChange={e => {
                e.persist();
                setSuccess(false);
                setGrilName(e.target.value)
            }} placeholder="название товара(автора)"></Input>
            </FormField>
            <FormField>
            <strong>Товар(автор)</strong>
            <div>
            <select value={authorId} onChange={e => {
                e.persist();
                setSuccess(false);
                setAuthorId(e.target.value)
            }}>
                {authors.map(a=> (
                    <option key={a.id} value={a.id}>
                        {a.name}
                    </option>     
                ))}
            </select>
            </div>
            </FormField>
            <FormField>
                <strong>Обложка товара</strong>
                <Input type='file' onChange={e => {
                e.persist();
                setSuccess(false);
                // Но здесь мы должны преобразовать файл в строку в кодировке base64.
                // Теперь, прежде чем мы проверим это в браузере, нам также нужно добавить, прокручиваем ли мы вниз до ввода входные данные загрузки файла. Таким образом, при изменении здесь нам нужно добавить считыватель файлов, который читается как данные U.R.L. и нам нужно пройти точку E
                    fileReader.readAsDataURL(e.target.files[0]) // Целевые точки, файлы и файлы - это массив, поэтому мы хотим получить доступ к первому элементу в массиве.
            }} />
            </FormField>
            <FormField>
            <strong>Краткое описание</strong>
            <Input value={summary} onChange={e => {
                e.persist();
                setSuccess(false);
                setSummary(e.target.value)
            }} placeholder="описание товара"></Input>
            </FormField>
            {!!success && 
            <span>
                Добавление успешно!
            </span>
            }
            <Button type="submit" block>Добавить новый товар</Button>
                    
        </Form>
    )
}

export default AddGril;

// Таким образом, чтобы иметь возможность загрузить файл в вызываемую функцию, прежде всего нам нужно убедиться, 
// что размер файла не превышает 10 мегабайт, потому что мы собираемся преобразовать изображение в строку, закодированную в 
// формате 64. Таким образом, существует предел того, сколько мы можем отправить в облачную функцию Firebase. Поэтому мы должны 
// убедиться, что наш файл находится под этим пределом. И причина, по которой мы используем вызываемую функцию здесь в отличие от 
// любых других методов загрузки файлов в облачные функции, заключается в том, что обложка книги. Мы знаем, что это будет меньше 
// 10 мегабайт, мы знаем, что не будем загружать большие файлы, так что для нашего случая это идеальный сценарий. Итак, чтобы 
// сделать это, нам нужно перейти к вводу файла обложки книги, и мы хотим перейти к изменению и завершить
