/**
import { graphql } from 'gatsby';
import { graphql } from 'gatsby';
import path from './.cache/normalize-page-path';
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    const barbTeamplate = path.resolve('src/teamplates/barbekusTeamplate.js')

    return graphql(`
    {
        allBarbekus {
          edges {
            node {
              id
            }
          }
        }
      } 
    
    `).then((result)=> {
        if(result.errors) {
            throw result.errors;
        }
        result.data.allBarbekus.edges.forEach(barber => {
            createPage({
                path: `/barber/${barber.node.id}`,
                component: barbTeamplate,
                context: {barbekusId: barber.node.id}
            })
        });
    })
}

// summary
// title

// localImage {
//     childImageSharp {
//       fixed(width: 250) {
//        src
//       }
//     }
//  }
//   author {
//     name
//   }