import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const OfflineSupportContext = createContext();

export const OfflineSupportProvider = ({children}) => {

    const api = 'https://localhost:2000/api';
    // const api = 'https://192.168.1.8:2000/api';
    
    const [isReady, setIsReady] = useState(false);

    const [connectionStatus, setConnectionStatus] = useState(null);

    const [syncOperations,setSyncOperations] = useState([]);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                await axios.get(api + '/events/ping');
                setConnectionStatus('online');
            } catch (e) {
                await checkOfflineStatus();
            }
        };

        checkConnection();
        setIsReady(true);
    }, []);

    const isOffline = 
    connectionStatus === null || connectionStatus === 'serverOffline' || connectionStatus === 'internetOffline';

    const pingServer = async () => {

        try{
            // ping
            
            await axios.get(api+'/events/ping',{
                timeout: 5000
            });

            if(isOffline && connectionStatus !== null) {
                await beginSync();
            }
        }
        catch{
            await checkOfflineStatus();
        }

    }

    pingServer().then(r => {
        if(r) setConnectionStatus('online')
    });

    const checkOfflineStatus = async () => {

        try{
            await axios.get("https://httpbin.org/get");
            console.log('server is offline!');
            setConnectionStatus('serverOffline');
        }
        catch{
            console.log('internet is offline!');
            setConnectionStatus('internetOffline');
        }

}

    const beginSync = async() => {

        setConnectionStatus('syncing');

        syncOperations.forEach(async op => await op.call())

        setSyncOperations([]);

        setTimeout(() => setConnectionStatus('finishedSyncing'), 2000);

        setTimeout(() => setConnectionStatus('online'), 5000);

    }

    const addOperation = (func, params) => {
        const operation = {
            func : func,
            params : params,

            async call() {
                await this.func(...this.params);
            }
        }

        setSyncOperations(prev => [...prev, operation]);

    }

    useEffect(() =>{

        const interval = setInterval(() => {
            pingServer();
            }, 10000);
            
        return () => clearInterval(interval);
    },[connectionStatus, syncOperations]);

    return (
        <OfflineSupportContext.Provider value={{ connectionStatus, isOffline, isReady, addOperation }}>
          {isReady ? children : null}
        </OfflineSupportContext.Provider>
      );
}

export const useOfflineSupport = () => useContext(OfflineSupportContext);