import React from 'react'
import Container from '../../components/UI/container';
import Map from '../../components/Layout/map';
import { useSelector } from 'react-redux';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import parse from 'html-react-parser';
import { ComponentName } from '../../utils/consts';
import usePage from '../../hooks/usePage';
import { ImgUrlDefault } from '../../utils/consts';

import './contacts-page.scss';

export default function ContactsPage() {
    const { isAuth, role } = useSelector(({ user }) => user);

    const { data, isLoading, update } = usePage(ComponentName.CONTACTS)

    return (
        <div className="contacts">
            <Container title={data.title} isLoaded={isLoading}>
                {isAuth && role === 'ADMIN' ? <AdminComponentsEdit data={data} updateData={update} /> : ''}

                <div className="row">
                    <div className="col-md-6">
                        <div className="contacts-text">
                            {data ? parse(`${data.text}`) : ''}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="page-img">
                            {data.img && <img src={`${ImgUrlDefault.COMPONENTS}${data.img}`} alt="poster" />}
                        </div>
                    </div>
                </div>
            </Container>

            <Map />
        </div>
    )
}
