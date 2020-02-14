export const date = () => {
  const arrMonth = [
    ' January',
    ' February',
    ' March',
    ' April',
    ' May',
    ' June',
    ' July',
    ' August',
    ' September',
    ' October',
    ' November',
    ' December'
  ]
  const arrday = [
    ' Sunday',
    ' Monday',
    ' Tuesday',
    ' Wednesday',
    ' Thursday',
    ' Friday',
    ' Saturday'
  ]

  const d = new Date()
  const month = arrMonth[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  let araw = d.getDay()

  return {
    month,
    day,
    araw: arrday[araw],
    year
  }
}
