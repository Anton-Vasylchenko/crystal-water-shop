import React from 'react'
import { useSelector } from 'react-redux';
import { UserRoles } from '../../utils/consts';
import { AdvantagesEdit } from '../admin/admin-advantages';
import { AdvantagesDelete } from '../admin/admin-advantages';

function AdvantagesListItem({ elem }) {
    const { isAuth, role } = useSelector(({ user }) => user);

    const isAdmin = role === UserRoles.ADMIN && isAuth;

    return (
        <div key={elem.id} className="advantage">
            <div className="advantage__img">
                <img src={`${process.env.REACT_APP_API_URL}advantages/${elem.img}`} alt="icon" />
            </div>
            <div className="advantage__text">{elem.title}</div>

            {isAdmin &&
                <div className="admin-advantage-edit">
                    <AdvantagesEdit item={elem} />
                    <AdvantagesDelete name={elem.title} id={elem.id} />
                </div>
            }
        </div>
    )
}

export default AdvantagesListItem
