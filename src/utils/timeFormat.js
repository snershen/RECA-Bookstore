export function timeFormat(data, timeKey) {
  let time = 0

  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (String(item[timeKey]).length === 10) {
        time = new Date(item[timeKey] * 1000)
      } else {
        time = new Date(item[timeKey])
      }
      item[timeKey] = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    })
  } else {
    if (String(data[timeKey]).length === 10) {
      time = new Date(data[timeKey] * 1000)
    } else {
      time = new Date(data[timeKey])
    }
    data[timeKey] = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
  }
}
