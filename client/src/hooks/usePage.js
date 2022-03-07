import React from 'react'
import { getComponentInfoByName } from '../services/productsAPI'

function usePage(page) {
    const [componentData, setComponentData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)

    const updateInfo = React.useCallback(() => {
        getComponentInfoByName(page).then(data => {
            setComponentData(...data)
        }).finally(() => {
            setIsLoading(true);
        })
    }, [page])

    React.useEffect(() => {
        updateInfo();
    }, [updateInfo])

    return {
        data: componentData,
        isLoading,
        update: updateInfo
    }
}

export default usePage;
