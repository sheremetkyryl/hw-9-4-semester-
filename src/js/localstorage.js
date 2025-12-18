export const save = (key, value) => {
    try {
        const serializedStade = JSON.stringify(value);

        localStorage.setItem(key, serializedStade)
    } catch (error) {
        console.error("Помилка при збереженні даних в сховищі!",error)
    }
}

export const load = (key) => {
    try {
        const serializedStade = localStorage.getItem(key);
        if(serializedStade === null){
            return undefined
        } else {
            return JSON.parse(serializedStade)
        }
    } catch (error) {
        console.error("Помилка при завантаженні даних зі сховища!", error)
    }
}

export const remove = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Помилка при завантаженні даних зі сховища!", error)
    }
}

export const clear = () => {
    try {
        localStorage.clear()
    } catch (err) {
        console.error("Помилка при завантаженні даних зі сховища!", err)
    }
}