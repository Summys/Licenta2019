
import { persistStore } from 'redux-persist';
import ReduxPersist from './reduxPersist';
import AsyncStorage from '@react-native-community/async-storage';

const updateReducers = (store, resolver) => {
    const version = ReduxPersist.reducerVersion;
    AsyncStorage.getItem('version').then((localVersion) => {
        if (localVersion !== version || !ReduxPersist.active) {
            persistStore(store, undefined, resolver).purge();
            AsyncStorage.setItem('version', version);
        } else {
            persistStore(store, undefined, resolver);
        }
    }).catch(() => {
        persistStore(store, undefined, resolver).purge();
        AsyncStorage.setItem('version', version);
    });
};

export default { updateReducers };
