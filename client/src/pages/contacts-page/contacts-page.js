import React from 'react'
import { Container, Map } from '../../components';
import { useSelector } from 'react-redux';
import { AdminComponentsEdit } from '../../components/admin/admin-components';
import { getComponentById } from '../../services/productsAPI';
import parse from 'html-react-parser';

import './contacts-page.scss';

export default function ContactsPage() {
    const { isAuth } = useSelector(({ user }) => user);

    const [componentData, setComponentData] = React.useState({})

    React.useEffect(() => {
        updateInfo();
    }, [])

    const updateInfo = () => {
        getComponentById(2).then(data => {
            setComponentData(data)
        })
    }

    return (
        <div className="contacts">
            <Container title={componentData.title} >
                {isAuth ? <AdminComponentsEdit data={componentData} updateData={updateInfo} /> : ''}

                <div className="page-img">
                    <img src={`${process.env.REACT_APP_API_URL}components/${componentData.img}`} alt="poster" />
                </div>

                {componentData ? parse(`${componentData.text}`) : ''}
            </Container>

            <Map />
        </div>
    )
}
