import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';
import AppContext from '../context';

const Pagination = () => {
  const { currentPage, setCurrentPage, reposPerPage, responseRep } =
    useContext(AppContext);

  const pageCount = Math.ceil(responseRep.length / reposPerPage);

  const handleonPageChange = () => {
    return (selectedPage: { selected: number }) => setCurrentPage(selectedPage.selected);
  };

  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      pageRangeDisplayed={5}
      renderOnZeroPageCount={null}
      pageCount={pageCount}
      onPageChange={handleonPageChange()}
    />
  );
};

export default Pagination;
