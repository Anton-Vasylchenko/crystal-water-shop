import React from 'react'
import CategoriesList from '../../components/categories-list';
import ShopItemsList from '../../components/shop-items-list';
import Container from '../../components/UI/container';
import SortPopup from '../../components/sort-filter/sort-popup';

import './shop-page.scss';

function ShopPage() {
    return (
        <Container title="Магазин">
            <div className="row mb-2">
                <div className="col-12 col-lg-9">
                    <CategoriesList />
                </div>

                <div className="col-12 col-lg-3">
                    <SortPopup />
                </div>
            </div>
            <ShopItemsList />
        </Container>
    )
}

export default ShopPage;
