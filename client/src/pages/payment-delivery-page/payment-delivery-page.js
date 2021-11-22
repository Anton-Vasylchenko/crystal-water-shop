import React from 'react'
import Container from '../../components/UI/container';
import { useSelector } from 'react-redux';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import usePage from '../../hooks/usePage';
import parse from 'html-react-parser';

import './payment-delivery-page.scss';
import { ComponentName } from '../../utils/consts';

export default function ContactsPage() {
    const { isAuth, role } = useSelector(({ user }) => user);

    const { data, isLoading, update } = usePage(ComponentName.PAYMENT);

    return (
        <Container title={data.title} isLoaded={isLoading}>
            {isAuth && role === 'ADMIN' ? <AdminComponentsEdit data={data} updateData={update} /> : ''}

            {data ? parse(`${data.text}`) : ''}

            <div className="page-img">
                {data.img && <img src={`${process.env.REACT_APP_API_URL}components/${data.img}`} alt="poster" />}
            </div>
        </Container>
    )
}
