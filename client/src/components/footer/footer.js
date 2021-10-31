import React from 'react';
import { useSelector } from 'react-redux';
import { getComponentById } from '../../services/productsAPI';
import parse from 'html-react-parser';
import { AdminComponentsEdit } from '../admin/admin-components';

import { MainLogo } from '../';

import './footer.scss';

function Footer() {
    const { isAuth } = useSelector(({ user }) => user);
    const [addressInfo, setAddressInfo] = React.useState({})
    const [scheduleInfo, setScheduleInfo] = React.useState({})
    const [phonesInfo, setPhonesInfo] = React.useState({})

    React.useEffect(() => {
        updateAddress();
        updatePhones();
        updateSchedule();
    }, [])

    const updateAddress = () => {
        getComponentById(11).then(data => {
            setAddressInfo(data)
        })
    }
    const updatePhones = () => {
        getComponentById(12).then(data => {
            setPhonesInfo(data)
        })
    }
    const updateSchedule = () => {
        getComponentById(13).then(data => {
            setScheduleInfo(data)
        })
    }

    return (
        <footer>
            <div className="container">
                <div className="row">

                    <div className="col-12 d-flex col-md-1 align-items-center text-center footer-block">
                        <MainLogo />
                    </div>

                    <div className="col-12 col-md-4 d-flex align-items-center footer-block">
                        <div className="footer__icon">
                            {addressInfo.img && <img src={`${process.env.REACT_APP_API_URL}components/${addressInfo.img}`} className="img-fluid" alt="main logo" />}
                        </div>

                        <div className="footer__text">
                            {addressInfo ? parse(`${addressInfo.text}`) : ''}

                        </div>
                        <div className="footer-editBtn">
                            {isAuth ? <AdminComponentsEdit data={addressInfo} updateData={updateAddress} /> : ''}
                        </div>
                    </div>
                    <div className="col-12 col-md-3 d-flex align-items-center footer-block">

                        <div className="footer__icon">
                            {phonesInfo.img && <img src={`${process.env.REACT_APP_API_URL}components/${phonesInfo.img}`} className="img-fluid" alt="main logo" />}
                        </div>

                        <div className="footer__text">
                            {phonesInfo ? parse(`${phonesInfo.text}`) : ''}
                        </div>

                        <div className="footer-editBtn">
                            {isAuth ? <AdminComponentsEdit data={phonesInfo} updateData={updatePhones} /> : ''}
                        </div>

                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center footer-block">

                        <div className="footer__icon">
                            {scheduleInfo.img && <img src={`${process.env.REACT_APP_API_URL}components/${scheduleInfo.img}`} className="img-fluid" alt="main logo" />}
                        </div>

                        <div className="footer__text">

                            {scheduleInfo ? parse(`${scheduleInfo.text}`) : ''}

                        </div>

                        <div className="footer-editBtn">
                            {isAuth ? <AdminComponentsEdit data={scheduleInfo} updateData={updateSchedule} /> : ''}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center footer-text-author">
                    developed by <a href="https://www.facebook.com/anton.adart" target="_blank" rel="noreferrer">Anton Vasylchenko</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer