import { PiniaPluginContext } from "pinia"
import { toRaw } from 'vue';
type Option = {
    key?: string
}



const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
}

const piniaPlugin = (option: Option) => {
    return (context: PiniaPluginContext) => {
        const { store } = context
        let data = getStorage((option?.key ?? 'pinia') + `-${store.$id}`)

        store.$subscribe(() => {
            if (store.$id === 'userStore') {
                console.log(store.$id, 'changgeeeeeeeee');

                setStorage((option?.key ?? 'pinia') + `-${store.$id}`, toRaw(store.$state))
            }
        }, { detached: true })

        return {
            ...data
        }
    }
}

export default piniaPlugin
