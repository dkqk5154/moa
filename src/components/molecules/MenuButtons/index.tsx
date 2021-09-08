import React from 'react';
import styled from 'styled-components';
import GlobalStyled from 'styles/GlobalStyled';
import MenuButton, { MenuButtonProps } from 'components/atoms/MenuButton';

const Styled = {
    Wrapper: styled(GlobalStyled.HeightRow)``,
};

export interface MenuButtonsProps extends MenuButtonProps {
}

export interface MenuLinksProps {
    infos: Array<MenuButtonsProps>;
}

const MenuLinks = (props: MenuLinksProps) => {
    const { infos } = props;

    return (
        <Styled.Wrapper>
            {infos.map((res: MenuButtonsProps, i: number) => (
                <GlobalStyled.Row mb={4} key={i}>
                    <MenuButton
                        imageName={res.imageName}
                        onClick={res.onClick}
                        disabled={res.disabled}
                        height="56px"
                    >
                        {res.children}
                    </MenuButton>
                </GlobalStyled.Row>
            ))}
        </Styled.Wrapper>
    );
};
MenuLinks.defaultProps = {
    infos: [
        {
            children: '-',
            imageName: 'rightArrow',
            onClick: () => { },
            disabled: false,
        },
    ],
};

export default MenuLinks;
