import React from 'react'
import { Container } from '../../components';
import { useSelector } from 'react-redux';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import { getComponentById } from '../../services/productsAPI';
import parse from 'html-react-parser';

import './payment-delivery-page.scss';

export default function ContactsPage() {
    const { isAuth } = useSelector(({ user }) => user);

    const [componentData, setComponentData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        updateInfo();
    }, [])

    const updateInfo = () => {
        getComponentById(10).then(data => {
            setComponentData(data)
        }).finally(() => {
            setIsLoading(true)
        })
    }

    return (
        <Container title={componentData.title} isLoaded={isLoading}>
            {isAuth ? <AdminComponentsEdit data={componentData} updateData={updateInfo} /> : ''}

            {componentData ? parse(`${componentData.text}`) : ''}

            <div className="page-img">
                {componentData.img && <img src={`${process.env.REACT_APP_API_URL}components/${componentData.img}`} alt="poster" />}
            </div>
        </Container>
    )
}
