import { Link, useNavigate, useParams } from 'react-router';
import style from './GroupInvitePage.module.css';
import { useEffect, useState } from 'react';
import { getGroupInviteAPI, joinGroupAPI } from '../../services/groupsService';

export default function GroupInvitePage(){

    const id = useParams().id;
    const [group, setGroup] = useState(null);
    const [inGroup, setInGroup] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() =>{
        getGroupInviteAPI(id).then(data => {

            setInGroup(data.inGroup);
            setGroup(data.group);

        });

    },[]);

    const navigate = useNavigate();

    const joinGroup = async () => {
        setErrors([])

        const result = await joinGroupAPI(id);
        
        if(result.errorCode !== undefined){
            setErrors(result.errorMessages);
            return;
        }

        setErrors([]);

        // wait for a bit and then navigate to the group page

        navigate(`/groups/${id}`)
    }

    const MAX_USERS_VIEW = 1;
    function getDisplayUsers(){

        const shownUsers = group.usernames.slice(1,MAX_USERS_VIEW);

        let result = group.usernames[0]

        shownUsers.forEach(name => {
            result += `, ${name}`
        });

        if(group.usernames.length > MAX_USERS_VIEW)
            result += ` + ${group.usernames.length - MAX_USERS_VIEW} more`

        return result;
    }
    const errorMessage = errors.map(e => <p className={style.error} key={e}>{e}</p>)
    const renderPage = () => {
        if(inGroup)
            return (
            <>
                <h2>You already are in this group</h2>
            </>
        ) 
        
        return(
            <>
                <h2>You are invited to a group</h2>
                <div className={style.container}>
                    <div className={style.groupSection}>
                        <h3>{group.name}</h3>
                        <p>{getDisplayUsers()}</p>
                    </div>

                    <div className={style.buttonSection}>
                        <button className="primary--button" onClick={joinGroup}>Accept</button>
                        <Link to='/' className="secondary--button">Decline</Link>
                    </div>
                </div>
                {errorMessage}
            </>
        )
    }
    
    return(

        <div className='center'>
            { group &&
                
                renderPage()

            }
        </div>

    )

    return(
        <>
        </>
    )

}