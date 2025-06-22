import { useEffect, useState } from 'react';
import style from './GroupsPage.module.css';
import { getGroupsAPI } from '../../services/groupsService';
import GroupCard from '../../components/GroupCard/GroupCard';

export default function GroupsPage({}){

    const [groups, setGroups] = useState(null)

    useEffect(()=>{
        getGroupsAPI().then(data => setGroups(data));
        // setGroups([])
    },[])

    const groupComponents = groups ? groups.map(group => <GroupCard key={group.id} group={group}/>) : <></>

    return(

        <div className={style.mainContainer}>
            <div className={style.subheader}>
                <button className={`${style.addButton} primary--button`}>Add +</button>
            </div>

            <div className={style.groupContainer}>
                { groups && groups.length > 0 ? groupComponents : "You aren't in any group!"}
            </div>
        </div>

    )
}