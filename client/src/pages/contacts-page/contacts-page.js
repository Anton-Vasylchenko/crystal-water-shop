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
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        updateInfo();
    }, [])

    const updateInfo = () => {
        getComponentById(2).then(data => {
            setComponentData(data)
        }).finally(() => {
            setIsLoading(true);
        })
    }

    return (
        <div className="contacts">
            <Container title={componentData.title} isLoaded={isLoading}>
                {isAuth ? <AdminComponentsEdit data={componentData} updateData={updateInfo} /> : ''}

                <div className="row">
                    <div className="col-md-6">
                        <div className="contacts-text">
                            {componentData ? parse(`${componentData.text}`) : ''}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="page-img">
                            {componentData.img && <img src={`${process.env.REACT_APP_API_URL}components/${componentData.img}`} alt="poster" />}
                        </div>
                    </div>
                </div>

            </Container>

            <Map />
        </div>
    )
}
