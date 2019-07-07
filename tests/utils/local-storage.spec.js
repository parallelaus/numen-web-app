import 'jest-localstorage-mock'
import '@/utils/local-storage'
import {
  setItemInArray,
  getItemFromArray,
  setItem,
  getItem
} from '../../utils/local-storage'

beforeEach(() => {
  localStorage.clear()
})
const testItemKey = 'TestItemKey'
const testItem = {
  id: 2,
  organisation_id: 1,
  name: 'Kwinana Freeway Northbound',
  description: null,
  address: 'BP Service Centre\nPaparone Road\nBaldivis\nWA 6171',
  country_iso: 'AU',
  phone: null,
  created_at: '2018-08-29 00:58:55',
  updated_at: '2019-05-13 02:13:58',
  site_type_id: 1,
  timezone: 'Australia/Perth',
  start_date: '2018-08-29 00:58:55',
  end_date: '0000-00-00 00:00:00',
  supply_device_id: 339,
  daily_stats_calc: '2019-07-01 16:01:15',
  tariff_off_peak_rate: 0.17,
  tariff_peak_rate: 0.19,
  tariff_off_peak_start_time: ['22:00'],
  tariff_peak_start_time: ['08:00'],
  buildings: [2],
  country: 'AU'
}

describe('Utils: local-storage: get/set item', () => {
  test('set item with local storage empty', () => {
    expect(setItem(testItemKey, testItem)).toStrictEqual(true)

    const localStorageItem = JSON.parse(localStorage.getItem(testItemKey))
    expect(localStorageItem).toStrictEqual(testItem)
  })

  test('overwrite existing local storage item', () => {
    expect(setItem(testItemKey, testItem)).toStrictEqual(true)
    const testItem2 = JSON.parse(JSON.stringify(testItem))
    testItem2.description = 'This is a description that is different'
    expect(setItem(testItemKey, testItem2)).toStrictEqual(true)

    const localStorageItem = JSON.parse(localStorage.getItem(testItemKey))
    expect(localStorageItem).not.toStrictEqual(testItem)
    expect(localStorageItem).toStrictEqual(testItem2)
  })

  test('get item from local storage', () => {
    expect(setItem(testItemKey, testItem)).toStrictEqual(true)
    expect(getItem(testItemKey)).toStrictEqual(testItem)
  })
})

describe('Utils: local-storage: get/set item array', () => {
  test('set array item when local storage is empty', () => {
    expect(localStorage.getItem(testItemKey)).toBeNull()
    expect(setItemInArray(testItemKey, 24, testItem)).toStrictEqual(true)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      testItemKey,
      JSON.stringify([
        {
          id: 24,
          item: testItem
        }
      ])
    )
  })

  test('local storage contains invlid json', () => {
    localStorage.setItem(testItemKey, 'This is invlid JSON')
    // If overwriteKey is set to false, even invalid JSON should not be overwritten
    expect(setItemInArray(testItemKey, 24, testItem, false)).toStrictEqual(
      false
    )
    expect(setItemInArray(testItemKey, 24, testItem)).toStrictEqual(true)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      testItemKey,
      JSON.stringify([
        {
          id: 24,
          item: testItem
        }
      ])
    )
    expect(JSON.parse(localStorage.getItem(testItemKey)).length).toBe(1)
  })

  test('local storage contains valid json, but not an array', () => {
    localStorage.setItem(
      testItemKey,
      `{"valid": "json", 
        "but":"not", 
        "an":"array"}`
    )
    // If overwriteKey is set to false, json currently in local storage should not be overwritten
    expect(setItemInArray(testItemKey, 24, testItem, false)).toStrictEqual(
      false
    )
    expect(setItemInArray(testItemKey, 24, testItem)).toStrictEqual(true)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      testItemKey,
      JSON.stringify([
        {
          id: 24,
          item: testItem
        }
      ])
    )
    expect(JSON.parse(localStorage.getItem(testItemKey)).length).toBe(1)
  })

  test('add item to existing array in local storage', () => {
    localStorage.setItem(
      testItemKey,
      JSON.stringify([
        {
          id: 24,
          item: testItem
        }
      ])
    )
    expect(JSON.parse(localStorage.getItem(testItemKey)).length).toBe(1)

    expect(setItemInArray(testItemKey, 24, testItem, false)).toStrictEqual(
      false
    )
    expect(setItemInArray(testItemKey, 24, testItem)).toStrictEqual(true)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      testItemKey,
      JSON.stringify([
        {
          id: 24,
          item: testItem
        }
      ])
    )
    expect(JSON.parse(localStorage.getItem(testItemKey)).length).toBe(1)

    expect(setItemInArray(testItemKey, 12, testItem)).toStrictEqual(true)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      testItemKey,
      JSON.stringify([
        {
          id: 24,
          item: testItem
        },
        {
          id: 12,
          item: testItem
        }
      ])
    )
    expect(JSON.parse(localStorage.getItem(testItemKey)).length).toBe(2)
  })

  test('read item from array', () => {
    const testItem2 = JSON.parse(JSON.stringify(testItem))
    const testItem4 = JSON.parse(JSON.stringify(testItem))

    testItem2.description = 'this is test item 2'
    testItem4.description = 'this is test item 4'
    setItemInArray(testItemKey, 2, testItem2)
    setItemInArray(testItemKey, 4, testItem4)
    expect(testItem2).not.toStrictEqual(testItem4)

    // Check that local storage is setup correctly
    const localStorageArray = JSON.parse(localStorage.getItem(testItemKey))
    expect(localStorageArray.length).toBe(2)
    expect(localStorageArray[0].id).toBe(2)
    expect(localStorageArray[1].id).toBe(4)
    expect(localStorageArray[0].item).toStrictEqual(testItem2)
    expect(localStorageArray[1].item).toStrictEqual(testItem4)

    // check with getItemFromArray function
    const item2 = getItemFromArray(testItemKey, 2)
    expect(localStorage.getItem).toHaveBeenLastCalledWith(testItemKey)
    const item4 = getItemFromArray(testItemKey, 4)

    expect(item2).toStrictEqual(testItem2)
    expect(item4).toStrictEqual(testItem4)
    expect(item2).not.toStrictEqual(item4)

    expect(getItemFromArray(testItemKey, 10)).toBeUndefined()
  })

  test('read item from local storage with illegal or no data', () => {
    expect(getItemFromArray(testItemKey, 2)).toBeUndefined()

    localStorage.setItem(
      testItemKey,
      `{"valid": "json", 
        "but":"not", 
        "an":"array"}`
    )
  })

  expect(getItemFromArray(testItemKey, 2)).toBeUndefined()
})
