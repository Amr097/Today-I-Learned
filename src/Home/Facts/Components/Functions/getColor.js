export function getColor(categories, category) {
  return category ? categories.find((cat) => cat.name === category).color : "";
}
