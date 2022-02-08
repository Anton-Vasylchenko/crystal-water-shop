import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../components/UI/container';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import usePage from '../../hooks/usePage';
import parse from 'html-react-parser';
import { ImgUrlDefault } from '../../utils/consts';

import './about-us-page.scss';
import { ComponentName } from '../../utils/consts';

const AboutUsPage = () => {
    const { isAuth, role } = useSelector(({ user }) => user);
    const { data, isLoading, update } = usePage(ComponentName.ABOUT_US);

    const image = data.img && <img className="aboutus__preloader-img" src={`${ImgUrlDefault.COMPONENTS}${data.img}`} alt="poster" />

    return (
        <Container title={data.title} isLoaded={isLoading}>
            {isAuth && role === 'ADMIN' ? <AdminComponentsEdit data={data} updateData={update} /> : ''}
            <div className="row">
                <div className="col-md-6 text-center">{image}</div>
                <div className="col-md-6 about-us-text">
                    <div>
                        {data.text ? parse(`${data.text}`) : ''}
                    </div>
                </div>
            </div>
        </Container>
    )
};

export default AboutUsPage;
