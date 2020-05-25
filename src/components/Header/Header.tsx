import React from 'react';
import classnames from 'classnames';
import styles from './Header.module.css';

const Header: React.FC = (props) => {
  
  return (
    <div className={classnames(styles.headerWrapper )}>
      {props.children}
    </div>
  )
};

export default React.memo(Header);
