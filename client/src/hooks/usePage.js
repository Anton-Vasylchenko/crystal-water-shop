import React from 'react'
import { getComponentInfoByName } from '../services/productsAPI'

function usePage(page) {
    const [componentData, setComponentData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        updateInfo();
    }, [])

    const updateInfo = () => {
        getComponentInfoByName(page).then(data => {
            setComponentData(...data)
        }).finally(() => {
            setIsLoading(true);
        })
    }

    return {
        data: componentData,
        isLoading,
        update: updateInfo
    }
}

export default usePage
