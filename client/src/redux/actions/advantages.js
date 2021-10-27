import apiServices from '../../services/api-services';

const fetchAdvantages = () => (dispatch) => {
    apiServices.getAdvantages().then(data => {
        dispatch(setAdvantages(data));
    })
}

const setAdvantages = (items) => ({
    type: 'SET_ADVANTAGES',
    payload: items
});

export {
    setAdvantages,
    fetchAdvantages,
};