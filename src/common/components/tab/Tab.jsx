import { useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function Tab(props) {

    const onClick = useCallback(function () {
        const { onClick, index } = props;
        onClick(index);
    }, [props]);

    const { activeTabIndex, index, label, className } = props;
    const activeClassName = activeTabIndex === index ? `nav-link active` : `nav-link`;
    const classes = classnames('nav-item', className);
    return (
        <li key={label} className={classes} onClick={onClick}>
            <p className={activeClassName}>{label}</p>
        </li>
    );

}

Tab.propTypes = {
    activeTabIndex: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Tab;