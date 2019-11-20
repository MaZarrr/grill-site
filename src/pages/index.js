import React from "react"
import { graphql, Link } from "gatsby"
import GrilIItem from '../components/GrilIItem'

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import styled from 'styled-components';
// import { GatsbyImageSharpFixed } from './../../.cache/fragments/image-sharp-fragments';

const LinkButton = styled.div`
  text-align: right;
  a{
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover{
      background: indigo;
    }
  }
`

const IndexPage = (props) => {
  console.log(props);
 return (
    <section>
      {props.data.allBarbekus.edges.map(edge => (
        <GrilIItem 
            grilCover={edge.node.localImage.childImageSharp.fixed}
            // grilCover={edge.node.localImage.publicURL}
            
            grilTitle={edge.node.title}
            grilSummary={edge.node.summary}
            authorName={edge.node.author.name}
            key={edge.node.id}>
          <LinkButton>
          <Link to={`/barber/${edge.node.id}`}>
            Подробнее
          </Link>
          </LinkButton>
        </GrilIItem>
      ))}
    </section>
  );
}

export const query = graphql `
{
  allBarbekus {
    edges {
      node {
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
  }
}
`;

export default IndexPage


// {/* <SEO title="Home" /> */}
    
//       {/* <Link to="/page-2/">Go to page 2</Link> */}