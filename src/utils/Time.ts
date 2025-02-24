export const formatDateTimeNow = () => {
    // 获取当前时间 YYYY-MM-DD HH:MM:SS
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export const formatDate = (date: any) => {
    return new Date(date).toLocaleString()
}
