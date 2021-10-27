import React from 'react'
import { useSelector } from 'react-redux';
import { AdminAdvantagesEdit } from '../admin/admin-advantages';
import { AdminAdvantagesDelete } from '../admin/admin-advantages';

function AdvantagesListItem({ elem }) {
    const { isAuth } = useSelector(({ user }) => user);

    return (
        <div key={elem.id} className="advantage">
            <div className="advantage__img">
                <img src={`${process.env.REACT_APP_API_URL}advantages/${elem.img}`} alt="icon" />
            </div>
            <div className="advantage__text">{elem.title}</div>

            {isAuth &&
                <div className="admin-advantage-edit">
                    <AdminAdvantagesEdit item={elem} />
                    <AdminAdvantagesDelete name={elem.title} id={elem.id} />
                </div>
            }
        </div>
    )
}

export default AdvantagesListItem
