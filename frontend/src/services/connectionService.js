import { useEffect, useState } from "react";

export const offlineSupport = () => {

    const api = process.env.REACT_APP_API_URL;
    
    const [connectionStatus,setConnectionStatus] = useState('online');

    const data = [];

    const operations = [];
    
    const checkOfflineStatus = async () => {
        
    }

    const pingServer = async () => {
        try{
            // ping
            
            if(connectionStatus !== 'serverOffline' && connectionStatus !== 'internetOffline') return;
            
            // set 
            await beginSync();
        }
        catch{
            await checkOfflineStatus();
        }
    }

    const beginSync = async() => {

        setConnectionStatus('syncing');

        operations.forEach(el => {
            el.function(el.params);
        });

        setConnectionStatus('finishedSyncing');

        setTimeout(() => setConnectionStatus('online'), 5000);
    }
    
    useEffect(() =>{



    },[]);

    return {connectionStatus}
}

