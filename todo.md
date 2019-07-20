# Global

- Global error handling for server errors such as server not available or 500 errors
- Add entity description as tooltips
- look at event/watch option for updating local storage?

- Implement generic localStorage caching system to allow loading of data from local storage if available. Needs to also update localStorage when API is updated - event/watch type of solution - DONE
- Store/Retrieve types from local storage and only load from API when not available - DONE
- Log out user and show login screen whenever an unauthorised resonse is received from API - DONE
- Remove redundant methods where method is direct copy of getter method e.g. CircuitCard phaseColour. See default view where hasRole is called with no additional method - DONE

# Authentication

- Deal with situation where token expired and data can not be loaded on refresh. Basically loading data before user login. Might have to create a separate login page.
- Get user roles from the API
- Implement refresh token

- Auto-login and token refresh - DONE

# Site

- Add ct size to circuit/device data to be able to automatically set when connecting to a collector
- rename ct_number to ct_cable_number (check API)
- Add pre-defined areas to location field as options, but still allow user to enter new value
- handle sub-switchboards
- Change delete call to destroy for switchboards and buildings to ensure all data is deleted
- Implement add/update/delete collector API calls and state updates

- Get areas from DB - DONE
- Get phase colours from DB - DONE
- When adding a single phase device, user must specify phase - DONE
- Move add device button into device card space - DONE
- Swop circuits and devices - DONE
- Move Add circuit button into a circuit card - DONE

# API

- Add all circuit devices to site config data, not only connected to collectors
- Circuit connect/disconnect methods

# Dashboard

- Add stats graph

```
async autoLogin({ commit }) {
    console.log('attempting autologin')
    const token = JSON.parse(localStorage.getItem('token'))
    const expires = localStorage.getItem('expires')
    const user = JSON.parse(localStorage.getItem('user'))
    if (token && expires && user) {
      if (Date.now() < expires - 30000) {
        // assume token is still valid
        commit('SET_TOKEN', token)
        commit('SET_USER', user)

        console.log('User auto login')
      }
    }
  },
```
