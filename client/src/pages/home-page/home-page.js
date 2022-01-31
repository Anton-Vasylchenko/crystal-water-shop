import React from 'react'
import Container from '../../components/UI/container';
import PopularProducts from '../../components/popular-products';
import AdvantagesList from '../../components/advantages-list';
import { useSelector } from 'react-redux';
import Map from '../../components/Layout/map';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import usePage from '../../hooks/usePage';
import useIsAdmin from '../../hooks/useIsAdmin';

import parse from 'html-react-parser';

import './home-page.scss';
import { ComponentName } from '../../utils/consts';

export default function HomePage() {
    const isAdmin = useIsAdmin();

    const { data, isLoading, update } = usePage(ComponentName.HOME);

    return (
        <div>
            <Container isLoaded={isLoading}>
                {isAdmin && <AdminComponentsEdit data={data} updateData={update} />}

                <div className="home">
                    <div className="home__img">
                        {data.img && <img src={`${process.env.REACT_APP_API_URL}components/${data.img}`} className="img-fluid" alt="main logo" />}
                    </div>

                    <div className="home__text">
                        {data ? parse(`${data.text}`) : ''}
                    </div>
                </div>
            </Container>
            <AdvantagesList />
            <PopularProducts title={"Популярні товари"} />
            <Map />
        </div>
    )
}
