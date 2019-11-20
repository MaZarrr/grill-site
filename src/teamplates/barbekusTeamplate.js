import React, {useContext} from 'react'
// import Layout from "../components/layout"
import GrilIItem from '../components/GrilIItem'
import { graphql } from 'gatsby';
import { GrilComments } from '../components/common';
import { FirebaseContext } from '../components/Firebase';


const BarberTeamplate = ( props ) => {
    // console.log(props.data);
    // const {pageContext: {author, summary, localImage}} = props
    // const {data: {author, summary, data}} = props
  const {firebase} = useContext(FirebaseContext);
// console.log(props.data.barbekus.id);

    return (
        <section>
            <GrilIItem 
                // grilCover={localImage.childImageSharp.fixed}
                grilCover={props.data.barbekus.localImage.childImageSharp.fixed}
                authorName={props.data.barbekus.author.name}
                grilSummary={props.data.barbekus.summary}
                grilTitle={props.data.barbekus.title} /> 
                {!!firebase && 
                <GrilComments firebase={firebase} grilId={props.data.barbekus.id} />
               }
        </section>
    )
}

export const query = graphql `
    query BarberQuery($barbekusId: String!) {
            barbekus(id: {eq: $barbekusId}) {
                summary
                title
                id
                localImage {
                  childImageSharp {
                    fixed(width: 250) {
                     ...GatsbyImageSharpFixed
                    }
                  }
               }
                author {
                  name
                }
          }
        }
`;

export default BarberTeamplate;

