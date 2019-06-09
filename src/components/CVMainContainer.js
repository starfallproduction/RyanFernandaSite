import React, {useState, useEffect, useMemo} from 'react';
import {Container, Row, Col} from 'reactstrap';
import styled from 'styled-components';
import {animated, useTrail} from 'react-spring';
import {useSelector} from 'react-redux';
import CvMainDropdownBtn from './CVMainDropdownBtn';

const StyledMainContainerTitle = styled(Row)`
    font-size: 250%;
    font-weight: bold;
`

function CvMainChilds(props){
    const delay = useMemo(
        ()=> 650 * props.children.length * 0.18, [props.children.length]
    );
    const _showChild = useSelector(state => state.cvlist.get(props.index));
    const [showChild, SetShow] = useState(true);
    // transition consist of setTimeout check if isTransition is null and not null
    const [isTransition, SetTransition] = useState(false);

    useEffect(()=>{
        if(_showChild != undefined){
            SetShow(_showChild);
            
            // cancel old set transition into null timeout
            if(isTransition != null) clearTimeout(isTransition);
            SetTransition(setTimeout(()=>SetTransition(null), delay));
        }
    }, [_showChild]);

    const trail = useTrail(props.children.length, {
        from:{
            opacity: 0,
            transform: 'translate(0,-25%)'
        },
        to:{
            opacity: 1,
            transform: 'translate(0,0)'
        },
        config: {
			duration: 650
        },
        reverse: !showChild,
        immediate: _showChild == undefined ? true : false,
        native: true
    });

    if(showChild || isTransition){
        return(
            <React.Fragment>
                {
                    trail.map((style, index)=>
                        <animated.div key={index} style={style}>
                            {props.children[index]}
                        </animated.div>
                    )
                }
            </React.Fragment>
        );
    }
    else{
        return(null);
    }
}

const StyledContainer = styled(Container)`
    
`

function CvMainContainer(props){
    return (
        <StyledContainer fluid={true} className="pt-4">
            <StyledMainContainerTitle className="align-items-center">
                <Col xs="auto" className="px-1">
                    <CvMainDropdownBtn index={props.index}/>
                </Col>
                <Col>
                    {props.title}
                </Col>
            </StyledMainContainerTitle>
            <CvMainChilds index={props.index}>{props.children}</CvMainChilds>
        </StyledContainer>
    );
}

export default CvMainContainer;