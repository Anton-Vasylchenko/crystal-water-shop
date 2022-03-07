import React, { useState, useEffect, useRef } from 'react'
import SortOrderArrow from '../sort-order-arrow';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../../redux/actions';

import './sort-popup.scss';

const items = [
    { type: 'rating', name: 'популярністю' },
    { type: 'price', name: 'ціною' },
    { type: 'name', name: 'алфавітом' }
];

function SortPopup() {
    const dispatch = useDispatch();

    const { sortBy } = useSelector(({ filters }) => filters);

    const [visiblePopup, setVisiblePopup] = useState(false);
    const sortRef = useRef();
    const activeLabel = items.find(item => item.type === sortBy).name;

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
        return function cleanup() {
            setVisiblePopup(false);
        }
    }, []);

    const handleOutsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false);
        }
    };

    const onSelectItem = (type) => {
        onChangeSortBy(type);
        setVisiblePopup(false);
    }

    const onChangeSortBy = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, [dispatch]);

    const togglePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const elements = items && items.map((elem, index) => {
        return (
            <li className={sortBy === elem.type ? 'active' : ''}
                onClick={() => { onSelectItem(elem.type) }}
                key={`${elem.type}_${index}`}>
                {elem.name}
            </li>
        )
    })

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <SortOrderArrow />
                <b>Сортувати за:</b>
                <span onClick={togglePopup}>{activeLabel}</span>
            </div>


            {visiblePopup &&
                <div className="sort__popup">
                    <ul>
                        {elements}
                    </ul>
                </div>}
        </div>
    )
}

export default React.memo(SortPopup)
