import { Link } from 'react-router';
import style from './GroupCard.module.css';

export default function GroupCard({group}){

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

    return(
        <div className={style.container}>
            <div className={style.textSection}>
                <h3>{group.name}</h3>
                <p>{getDisplayUsers()}</p>
            </div>

            <Link to={`/groups/${group.id}`} className={`${style.joinButton} primary--button`}>Enter</Link>
            
        </div>
    )
}