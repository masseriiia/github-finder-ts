import React, { useContext } from 'react';
import AppContext from '../context';
import style from './Hero.module.scss';
import search from '../../img/svg/search.svg';
import Pagination from '../Pagination/index';
import { IContextValue } from '../../pages/Home';

const Hero = () => {
  const { userData, responseRep, reposPerPage, currentPage, setCurrentPage } =
    useContext<IContextValue>(AppContext);

  const indexOfLastRepo = (currentPage + 1) * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = responseRep.slice(indexOfFirstRepo, indexOfLastRepo);

  console.log(currentRepos);

  return (
    <section className={style.hero}>
      {!userData ? (
        <div className={style.heroNotFound}>
          <img src={search} alt="" />
          <h2>
            Start with searching a <br /> GitHub user
          </h2>
        </div>
      ) : (
        <div className={style.heroWrapper}>
          <div className={style.heroInfo}>
            <img className={style.heroAvatar} src={userData?.avatar_url} alt="" />
            <h4 className={style.heroName}>{userData?.name}</h4>
            <p className={style.heroLogin}>{userData?.login}</p>
            <p className={style.heroBio}>{userData?.bio}</p>
            <div className={style.heroFollow}>
              <div className={style.heroFollowDesc}>
                <p>{userData?.followers}</p>
                <p>followers</p>
              </div>
              <div className={style.heroFollowDesc}>
                <p>{userData?.following}</p>
                <p>following</p>
              </div>
            </div>
            <p>{userData?.location}</p>
            <p>{userData?.email}</p>
            <p>{userData?.blog}</p>
          </div>
          <div className={style.heroRepositories}>
            <h2 className={style.heroTitle}>Repositories ({userData?.public_repos})</h2>
            <div className={style.heroRepositoresItems}>
              {currentRepos.map((item) => (
                <div key={item.id} className={style.heroRepositor}>
                  <h3 className={style.heroRepositoresName}>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Pagination />
    </section>
  );
};

export default Hero;
