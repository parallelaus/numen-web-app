/**
 * Stores the given item in localstorage specified by storageKey. Item ID is set as id.
 * If overwriteKey is true existing values in localstorage will be overwritten.
 *
 * @param storageKey - local storage key
 * @param id - item identifier
 * @param item - item
 * @param overwriteKey
 */
export function setItemInArray(storageKey, id, item, overwriteKey = true) {
  if (!storageAvailable()) return false

  const itemToStore = {
    id,
    item
  }
  let storedItems
  try {
    storedItems = JSON.parse(localStorage.getItem(storageKey))
  } catch (error) {
    if (!overwriteKey) {
      return false
    }
  }

  if (Array.isArray(storedItems)) {
    // Array found in local storage, replace or add item to array
    const idx = storedItems.findIndex(storedItem => storedItem.id == id)
    if (idx >= 0) {
      // item found in array
      if (overwriteKey) {
        storedItems.splice(idx, 1, itemToStore)
      } else {
        return false
      }
    } else {
      // add new item
      storedItems.push(itemToStore)
    }
    localStorage.setItem(storageKey, JSON.stringify(storedItems))
  } else {
    // non array item found in local storage, check if we can overwrite it
    const arrayToStore = JSON.stringify([itemToStore])
    if (storedItems) {
      // item found with same key, check if we can overwrite it
      if (overwriteKey) {
        localStorage.setItem(storageKey, arrayToStore)
      } else {
        return false
      }
    } else {
      // item not found, create it
      localStorage.setItem(storageKey, arrayToStore)
    }
  }
  return true
}

export function getItemFromArray(storageKey, id) {
  if (!storageAvailable()) return undefined

  let storedItems
  try {
    storedItems = JSON.parse(localStorage.getItem(storageKey))
  } catch (error) {
    return undefined
  }
  if (storedItems) {
    const storeItem = storedItems.find(item => item.id == id)
    if (storeItem) {
      return storeItem.item
    }
  }
  return undefined
}

export function setItem(storageKey, item, overwriteKey = true) {
  if (!storageAvailable()) return false
  try {
    localStorage.setItem(storageKey, JSON.stringify(item))
  } catch (error) {
    return false
  }
  return true
}

export function removeItem(storageKey) {
  localStorage.removeItem(storageKey)
}

export function getItem(storageKey) {
  if (!storageAvailable()) return undefined
  try {
    const item = JSON.parse(localStorage.getItem(storageKey))
    return item
  } catch (error) {
    return undefined
  }
}

function storageAvailable() {
  if (process.env.NODE_ENV == 'test') {
    return true
  }
  if (process.client) {
    return true
  }
  return false
}
