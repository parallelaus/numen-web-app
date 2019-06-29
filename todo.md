# Global

- Global error handling for server errors such as server not available or 500 errors
- Add entity description as tooltips
- convert store.site to an array of site configs already loaded and do not reload if site is already loaded.
- Store/Retrieve state from local storage

# Authentication

- Auto-login and token refresh

# Dashboard

- Add stats graph

# Site

- Add ct size to circuit/device data to be able to automatically set when connecting to a collector
- rename ct_number to ct_cable_number
- Add pre-defined areas to location field as options, but still allow user to enter new value
- handle sub-switchboards
- Change delete call to destroy for switchboards and buildings to ensure all data is deleted

- Get areas from DB - DONE
- Get phase colours from DB - DONE
- When adding a single phase device, user must specify phase - DONE
- Move add device button into device card space - DONE
- Swop circuits and devices - DONE
- Move Add circuit button into a circuit card - DONE

# API

- Add all circuit devices to site config data, not only connected to collectors
