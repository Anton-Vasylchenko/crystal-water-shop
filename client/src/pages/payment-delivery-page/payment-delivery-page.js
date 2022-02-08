import React from 'react'
import Container from '../../components/UI/container';
import { useSelector } from 'react-redux';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import usePage from '../../hooks/usePage';
import parse from 'html-react-parser';
import { ImgUrlDefault } from '../../utils/consts';
import './payment-delivery-page.scss';
import { ComponentName } from '../../utils/consts';
import useIsAdmin from '../../hooks/useIsAdmin';

export default function ContactsPage() {
    const isAdmin = useIsAdmin();

    const { data, isLoading, update } = usePage(ComponentName.PAYMENT);

    return (
        <Container title={data.title} isLoaded={isLoading}>
            {isAdmin && <AdminComponentsEdit data={data} updateData={update} />}

            {data ? parse(`${data.text}`) : ''}

            <div className="page-img">
                {data.img && <img src={`${ImgUrlDefault.COMPONENTS}${data.img}`} alt="poster" />}
            </div>
        </Container>
    )
}
