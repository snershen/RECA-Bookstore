export function addThousandsSeparator(number) {
  let numberString = number.toString()
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return numberString
}
