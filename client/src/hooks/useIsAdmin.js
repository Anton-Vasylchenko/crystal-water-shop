import { useSelector } from 'react-redux';
import { UserRoles } from '../utils/consts';

function useIsAdmin() {
    const { isAuth, role } = useSelector(({ user }) => user);
    const isAdmin = isAuth && role === UserRoles.ADMIN;
    return isAdmin;
}

export default useIsAdmin
