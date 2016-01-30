export default function switchVisibility (noteObj) {
  return {
    type: 'ADD_NOTE',
    note: noteObj
  }
}