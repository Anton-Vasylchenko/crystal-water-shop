import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setSortOrder } from '../../../redux/actions';
import DropdownArrow from '../../UI/dropdown-arrow';

function SortOrderArrow() {
    const dispatch = useDispatch();

    const { sortOrder } = useSelector(({ filters }) => filters);

    const changeOrder = React.useCallback((type) => {
        dispatch(setSortOrder(type));
    }, [dispatch]);

    const changeOrderType = (aa) => {
        const order = sortOrder === 'desc' ? 'asc' : 'desc';
        changeOrder(order);
    }

    const arrowRotates = sortOrder === 'desc' ? true : false;

    return (
        <div className="sort-arrow unselectable-text" onClick={changeOrderType}>
            <DropdownArrow rotate={arrowRotates} />
        </div >
    )
}

export default SortOrderArrow;