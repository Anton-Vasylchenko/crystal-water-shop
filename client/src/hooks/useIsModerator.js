import { useSelector } from 'react-redux';
import { UserRoles } from '../utils/consts';

function useIsModerator() {
    const { isAuth, role } = useSelector(({ user }) => user);
    const isModerator = isAuth && role === UserRoles.MODERATOR;
    return isModerator;
}

export default useIsModerator
