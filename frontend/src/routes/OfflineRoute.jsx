import React from "react";
import { useOfflineSupport } from "../contexts/OfflineSupportContext";

export default function OfflineRoute({children}){

    const {isOffline} = useOfflineSupport();
    return(
        isOffline ? 
        <h2>Return when the connection is on!</h2>
        : <>{children}</>
    )
}