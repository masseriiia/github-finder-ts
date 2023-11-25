import React, { useContext } from 'react';
import style from './Header.module.scss';
import logo from '../../img/github-icon.png';
import search from '../../img/svg/search.svg';
import AppContext from '../context';
import { IContextValue } from '../../pages/Home';

const Header = () => {
  const { value, inputValueChange } = useContext<IContextValue>(AppContext);

  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <a className={style.headerLogo} href="/">
          <img src={logo} alt="Логотип" />
        </a>
        <div className={style.headerInput}>
          <img className={style.headerSearch} src={search} alt="" />
          <input
            className={style.input}
            type="text"
            value={value}
            placeholder="Enter GitHub username"
            onChange={inputValueChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
