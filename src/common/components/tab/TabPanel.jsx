import { Children, cloneElement } from 'react';

function TabPanel(props) {

    const { children, ...rest } = props;
    
    return (
        <div>
            {
                Children.map(children, function (child) {
                    return cloneElement(child, { ...rest });
                })
            }
        </div>
    );
}

export default TabPanel;