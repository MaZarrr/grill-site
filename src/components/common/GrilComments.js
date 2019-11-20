import React, {useEffect, useState} from "react"
import styled  from 'styled-components';
import { Button } from "./Button";
import { Input } from "./Input";
import moment from 'moment'

const CommentForm = styled.form `
    display: flex;
    margin-top: 32px;
    ${Input}{
        margin-right: 8px;
        margin-top: auto;
        margin-bottom: auto;

    }

    ${Button}{
        margin: auto 0;
    }
`

const CommentListItem = styled.div `
    >strong {
        font-size: 80%;
        color: #666;
    }

    border-bottom: 1px solid #ddd;
    padding: 4px 0;
`

export const GrilComments = ({firebase, grilId}) => {

    const [comments, setComments] = useState([]) // пустой массив как состояние по умолчанию что бы получить данные
    const [commentsText, setCommentsText] = useState('')

    useEffect(() => {
       const unsubscribe = firebase.subscribeToGrilComments({
           grilId,
           onSnapshot: (snapshot) => {
            console.log(snapshot);
            
            const snapshotComments = []; // нужно сделать, так это перебрать каждый снимок. 
            snapshot.forEach(doc => {
                snapshotComments.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setComments(snapshotComments);
            
        }
    })

        return () => {
            if(unsubscribe) {
                unsubscribe();
            }
        }
    }, [])
 
    const handlePostCommentSubmit = (e) => {
        e.preventDefault();
        console.log(commentsText);
        firebase.postComment({
            text: commentsText,
            grilId
        })   
    }

    return (
    <div>
       <CommentForm onSubmit={handlePostCommentSubmit}>
       <Input value={commentsText} onChange={e=>{
           e.persist(); // e persist,она позволяет нам использовать необработанное событие, которое этот обработчик изменений пропустил
           setCommentsText(e.target.value); // Если бы здесь не было ничего асинхронного, мы бы без проблем получили доступ к объекту событий.
       }}></Input>
       <Button type="submit">Оставить комментарий</Button>
       </CommentForm>
       {comments.map(comment => (
           <CommentListItem key={comment.id}>
            <strong>
                {comment.username} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')}
            </strong>
            <div>
                {comment.text}
            </div>
           </CommentListItem>
       ))}
       
    </div>

   ) 

};