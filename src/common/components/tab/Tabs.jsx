import React, { useState, useCallback } from "react";
import * as ReactIs from 'react-is';
import Tab from "./Tab";

function flatten(elements) {
  const flattened = [];
  for (const element of elements) {
    if (ReactIs.isFragment(element) && !!element.props?.children?.length) {
      for (const child of element.props.children) {
        flattened.push(child)
      }
    }
    else if (ReactIs.isElement(element)) flattened.push(element);
  }

  return flattened;
}

const TabsList = function ({ children, activeTabIndex, setActiveTabIndex }) {

  const tabs = flatten(children);

  return tabs.map(function (child, index) {
    const { label, className } = child.props;
    return (
      <Tab
        className={className}
        activeTabIndex={activeTabIndex}
        key={label}
        index={index}
        label={label}
        onClick={setActiveTabIndex}
      />
    );

  });
};

const TabContents = function ({ children, activeTabIndex }) {

  const tabs = flatten(children);

  return tabs.map(function (child, index) {
    if (index === activeTabIndex) {
      return child; //child.props.children;
    }
    else return null;
  });
};

function Tabs(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onClickTabItem = useCallback(function (tabIndex) {
    setActiveTabIndex(tabIndex);
  }, []);

  return (
    <div className="container--content">
      <div className="content__header">
        <ul className="nav-bar">
          <TabsList {...props} activeTabIndex={activeTabIndex} setActiveTabIndex={onClickTabItem} />
        </ul>
      </div>
      <div className="content__body">
        <TabContents {...props} activeTabIndex={activeTabIndex} />
      </div>
    </div>
  );
}

export default Tabs;