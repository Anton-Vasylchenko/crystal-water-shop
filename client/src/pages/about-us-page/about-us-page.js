import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../../components';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import { getComponentById } from '../../services/productsAPI';
import parse from 'html-react-parser';

import './about-us-page.scss';

const AboutUsPage = () => {
    const { isAuth } = useSelector(({ user }) => user);

    const [componentData, setComponentData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        updateInfo()
    }, [])

    const updateInfo = () => {
        getComponentById(9).then(data => {
            setComponentData(data)
        }).finally(() => {
            setIsLoading(true)
        })
    }

    const image = componentData.img && <img className="aboutus__preloader-img" src={`${process.env.REACT_APP_API_URL}components/${componentData.img}`} alt="poster" />

    return (
        <Container title={componentData.title} isLoaded={isLoading}>
            {isAuth ? <AdminComponentsEdit data={componentData} updateData={updateInfo} /> : ''}
            <div className="row">
                <div className="col-md-6 text-center">{image}</div>
                <div className="col-md-6 about-us-text">
                    <div>
                        {componentData.text ? parse(`${componentData.text}`) : ''}
                    </div>
                </div>
            </div>
        </Container>
    )
};

export default AboutUsPage;
