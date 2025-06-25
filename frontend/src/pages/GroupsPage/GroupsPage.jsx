import { useEffect, useState } from 'react';
import style from './GroupsPage.module.css';
import { getGroupsAPI } from '../../services/groupsService';
import GroupCard from '../../components/GroupCard/GroupCard';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router';

export default function GroupsPage({}){

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const [groups, setGroups] = useState(null)

    const[isLoading, setIsLoading] = useState(true);

    const [connection, setConnection] = useState(null);

    useEffect(()=>{

        getGroupsAPI().then(data => setGroups(data));
        setIsLoading(false);
    },[])

    const groupComponents = groups ? groups.map(group => <GroupCard key={group.id} group={group}/>) : <></>

    

    return(

        <>
            <div className={style.mainContainer}>
                <div className={style.subheader}>
                    <button className={`${style.addButton} primary--button`} onClick={openModal}>Add +</button>
                </div>

                { isLoading || !groups ? <LoadingSpinner isLoading={isLoading} /> :
                <div className={style.groupContainer}>
                    { groups && groups.length > 0 ? groupComponents : "You aren't in any group!"}
                </div>

                }
            </div>

            <CreateGroupModal  
                isOpen={isModalOpen}
                closeModal={closeModal} 
             submitHandler={(group)=>{navigate(`/groups/${group.id}`)}} 
            />
        </>

    )
}