import Pagination from 'react-bootstrap/Pagination';

export const pageLoop = (page, totalPage, setPage) => {
  //   console.log(page, totalPage, setPage);
  let pageItem = [];
  let n = Math.floor(page / 10);
  for (let i = n * 10; i < (n + 1) * 10 && i < totalPage; i++) {
    if (page === i) pageItem.push(<Pagination.Item active>{i + 1}</Pagination.Item>);
    else
      pageItem.push(
        <Pagination.Item
          onClick={() => {
            setPage(i);
          }}
        >
          {i + 1}
        </Pagination.Item>,
      );
  }
  return pageItem;
};
