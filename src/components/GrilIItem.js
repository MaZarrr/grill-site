import styled from 'styled-components'
import React  from 'react';
import Img from 'gatsby-image'

const GrilItemWrapper = styled.section` 
    border: 1px solid #ddd;
    background: white;
    padding: 8px;
    margin-bottom: 50px;
    display: flex;
    ${'' /* flex-wrap: wrap; */}
    ${'' /* flex-direction: row: */}
    align-items: center;

    h2 {
        small {
            font-weight: normal;
            font-size: 14px;
            padding-left: 8px;
        }
    }
`;

const GrilItemImageWrapper = styled.div `
    max-width: 250px;

    img {
        max-width: 250px;
    }
`;

const GrilItemContentWrapper = styled.div `
    flex-grow: 1;
    padding-left: 8px;
`;

const GrilItem = ({authorName, grilSummary, grilTitle, grilCover, children}) => {
    return (
        <GrilItemWrapper>
            <GrilItemImageWrapper>
                <Img fixed={grilCover} />
            </GrilItemImageWrapper>
            <GrilItemContentWrapper>
                <h2>
                    {grilTitle}<small>{authorName}</small>
                </h2>
                <p>
                    {grilSummary}
                </p>
            </GrilItemContentWrapper>
            <div>
                {children}
            </div>
        </GrilItemWrapper>
    )
}

export default GrilItem

// {/* <GrilItemImageWrapper>
//                 <Img src={grilCover} alt="Gril cover" />
//             </GrilItemImageWrapper> */}