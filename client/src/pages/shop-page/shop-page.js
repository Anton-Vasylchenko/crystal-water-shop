import React from 'react'
import { CategoriesList, SortPopup, Container, ShopItemsList } from '../../components';

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
