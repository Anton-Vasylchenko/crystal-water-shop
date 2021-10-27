import React from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, fetchCategories } from '../../redux/actions';
import { CreateCategories } from '../admin/admin-categories';
import { EditCategoriesList } from '../admin/admin-categories';

import './categories-list.scss';

function CategoriesList() {
    const dispatch = useDispatch();
    const { activeCategory, categories } = useSelector(({ filters }) => filters);
    const { isAuth } = useSelector(({ user }) => user);

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setActiveCategory(index));
    }, [dispatch]);

    const categoriesList = categories && categories.map((elem, index) => {
        return (
            <li className={activeCategory === index ? 'shop-categories__active' : ''}
                onClick={() => onSelectCategory(index)}
                key={`${elem.id}`}>
                {elem.name}
            </li>
        )
    })

    return (
        <div className="shop-categories">
            <ul>
                {isAuth ? <li><EditCategoriesList /></li> : ''}

                <li className={activeCategory === null ? 'shop-categories__active' : ''}
                    onClick={() => onSelectCategory(null)}>
                    Всі
                </li>
                {categoriesList}

                {isAuth ? <li><CreateCategories /></li> : ''}

            </ul>
        </div>
    )
}

CategoriesList.propTypes = {
    activeCategory: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
    onClickCategory: PropTypes.func
}

CategoriesList.defaultProps = {
    activeCategory: null,
    items: [], onClickCategory: () => { }
};

export default React.memo(CategoriesList)
