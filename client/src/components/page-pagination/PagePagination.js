import React from 'react';
import { Pagination } from 'react-bootstrap';

import './PagePagination.scss';

function PagePagination({ itemsCount, limit, currentPage, changePage }) {
    const pageCount = Math.ceil(itemsCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <div className="pagination-wrapper">

            {pages.length > 1 && <Pagination className="mt-5">
                {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        active={currentPage === page}
                        onClick={() => changePage(page)}
                        activeLabel={false}
                    >
                        {page}
                    </Pagination.Item>
                )}
            </Pagination>}

        </div>
    )
}

export default PagePagination
