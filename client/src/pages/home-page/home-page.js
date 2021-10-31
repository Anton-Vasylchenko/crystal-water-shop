import React from 'react'
import { Container, PopularProducts, AdvantagesList } from '../../components';
import { useSelector } from 'react-redux';
import Map from '../../components/map/map';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import { getComponentById } from '../../services/productsAPI';

import parse from 'html-react-parser';

import './home-page.scss';

export default function HomePage() {
    const { isAuth } = useSelector(({ user }) => user);
    const [componentData, setComponentData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        updateInfo();
    }, [])

    const updateInfo = () => {
        getComponentById(1).then(data => {
            setComponentData(data)
        }).finally(() => {
            setIsLoading(true)
        })
    }

    return (
        <div>
            <Container isLoaded={isLoading}>
                {isAuth ? <AdminComponentsEdit data={componentData} updateData={updateInfo} /> : ''}

                <div className="home">
                    <div className="home__img">
                        {componentData.img && <img src={`${process.env.REACT_APP_API_URL}components/${componentData.img}`} className="img-fluid" alt="main logo" />}
                    </div>

                    <div className="home__text">
                        {componentData ? parse(`${componentData.text}`) : ''}
                    </div>
                </div>
            </Container>

            <AdvantagesList />

            <PopularProducts title={"Популярні товари"} />

            <Map />
        </div>
    )
}
