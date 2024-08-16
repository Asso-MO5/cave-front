/**
 *
 * @param {string} value
 * @returns {Array} Format the initial content of the editor
 */
export const editorInitialContent = (value) => {
  if (!value) return undefined
  if (Array.isArray(value)) return value
  if ((typeof value === 'string') & (value?.charAt(0) === '['))
    try {
      return JSON.parse(value)
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return undefined
    }

  return undefined
}
