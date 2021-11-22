import React from 'react';
import { fetchAdvantages } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import AdvantagesListItem from './advantages-list-item';
import { AdvantagesCreate } from '../admin/admin-advantages';
import { UserRoles } from '../../utils/consts';

import Container from '../UI/container';

import './advantages-list.scss';

function AdvantagesList() {
    const dispatch = useDispatch();
    const { isAuth, role } = useSelector(({ user }) => user);

    const { advantagesList, isLoaded } = useSelector(({ advantages }) => {
        return {
            advantagesList: advantages.items,
            isLoaded: advantages.isLoaded
        }
    });

    React.useEffect(() => {
        dispatch(fetchAdvantages());
    }, [dispatch]);

    return (
        <Container title="Чому обирають нашу воду?" isLoaded={isLoaded}>
            {isAuth && role === UserRoles.ADMIN && <AdvantagesCreate />}

            <div className="advantages-wrapper">
                {
                    advantagesList && advantagesList.map((elem) => {
                        return <AdvantagesListItem key={elem.id} elem={elem} />
                    })
                }
            </div>
        </Container>
    )
}

export default AdvantagesList;

