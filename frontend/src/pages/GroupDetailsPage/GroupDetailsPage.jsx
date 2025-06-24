import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getGroupAPI } from "../../services/groupsService";
import style from './GroupDetailsPage.module.css';

export default function GroupDetailsPage(){

    const id = useParams().id;
    const [group, setGroup] = useState(null);

    useEffect(() =>{
        getGroupAPI(id).then(data => setGroup(data));
    },[]);

    const addMoreUsers = () => {
        setGroup(prev => ({
            ...prev,
            usernames : ['user1', 'user2', 'user3','user1', 'user2', 'user3','user1', 'user2', 'user3']   
        }))
    }
    const [displayMode, setDisplayMode] = useState("main");

    const getDisplayContent = () =>{
        if(displayMode === 'main'){
            return (<>
                <p style={{marginTop :'2rem'}}> {group.description}</p>
            </>)
            
        }

        if(displayMode === 'members'){
            return (<>
                <div className={style.membersList} style={{marginTop :'2rem'}}>
                    {group.usernames.map(u => <p key={u}>{u}</p>)}
                </div>
            </>)
        }

        return (<></>)
    }

    const [copied,setCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/groups/invite/${group.id}`);

        setCopied(true)
    }

    const copiedMessage = copied ? <p style={{color:'var(--success)'}}>Invite link copied to clipboard!</p> : <p></p>

    const detailsContent = group && getDisplayContent()
    return(

        <div className='center'>
            { group &&

                <div className={style.container}>
                    <div className={style.section}>
                            <div className={style.header}>
                            <h3 className={style.title}>{group.name}</h3>
                            <div className={style.subheader}> 
                                <button className="transparent--button" onClick={() => setDisplayMode('main')}>General</button>
                                <button className="transparent--button" onClick={() => setDisplayMode('members')}>Members</button>
                            </div>
                        </div>

                        {detailsContent}
                    </div>

                    <div className={style.section}>
                        {copiedMessage}
                        <div className={style.footer}> 
                            <Link to={`/groups/${group.id}`} className="primary--button">Enter</Link>
                            <button className="secondary--button" onClick={addMoreUsers}>Leave</button>
                            <button className="transparent--button material-symbols-outlined" onClick={copyLink}>Share</button>
                            
                        </div>
                    </div>
                </div>

            }
        </div>

    )
}