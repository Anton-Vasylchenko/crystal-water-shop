import React from 'react';
import { useSelector } from 'react-redux';
import { getComponentInfoByName } from '../../../services/productsAPI';
import { ComponentName, UserRoles } from '../../../utils/consts';
import FooterItem from './footer-item';

import MainLogo from '../../main-logo';

import './footer.scss';

function Footer() {
    const { isAuth, role } = useSelector(({ user }) => user);

    const [footerInfo, setFooterInfo] = React.useState({});

    React.useEffect(() => {
        updateFooterInfo();
    }, [])

    const updateFooterInfo = () => {
        getComponentInfoByName(ComponentName.FOOTER).then(data => {
            setFooterInfo(data)
        })
    }

    const isAdmin = role === UserRoles.ADMIN && isAuth;;

    const content = footerInfo.length > 0 && footerInfo.map(item => {
        return <FooterItem
            key={item.id}
            item={item}
            updateFooterInfo={updateFooterInfo}
            isAdmin={isAdmin}
        />
    })

    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex col-md-2 align-items-center text-center footer-block">
                        <MainLogo />
                    </div>

                    {content}

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