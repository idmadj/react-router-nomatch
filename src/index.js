import React from "react";
import PropTypes from "prop-types";
import { matchPath, useLocation } from 'react-router-dom';
import isNil from 'lodash/isNil';

const NoMatch = ({children, component, render, alwaysRender}) => {
    const location = useLocation();
    let match = false;

    React.Children.forEach(children, child => {
        if (!match && React.isValidElement(child)) {
            const path = child.props.path || child.props.from;
            if (!isNil(path)) {
                match = !!matchPath(location.pathname, { ...child.props, path });
            }
        }
    });

    return (<>
        { (!match || alwaysRender) && (component ? React.createElement(component, {match}) : (render ? render(match) : null)) }
        { children }
    </>);
};

NoMatch.propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    component: PropTypes.elementType,
    render: PropTypes.func,
    alwaysRender: PropTypes.bool
};

NoMatch.defaultProps = {
    alwaysRender: false
};

export default NoMatch;
