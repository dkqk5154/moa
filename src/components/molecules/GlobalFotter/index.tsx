import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import hideRouters from 'config/globalHideRouters'

import GlobalStyled from 'styles/GlobalStyled';


const Styled = {
    Wrapper: styled(GlobalStyled.Row)`
        flex-direction: column;
    `,
};

export interface GlobalFooterProps extends RouteChildrenProps {}


const GlobalFooter = (props : RouteChildrenProps): JSX.Element => {
    const { location } = props;

    const isHide = hideRouters.some((res : string)=>res === location?.pathname)


    return isHide ? (<></>) : (
        <Styled.Wrapper p={5} bg="purple" color="white" fontSize={5} >
            <GlobalStyled.Container flexDirection="row">
               
            </GlobalStyled.Container>
        </Styled.Wrapper>
    );
};

export default withRouter(GlobalFooter);
