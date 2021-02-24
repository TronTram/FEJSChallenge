import React, { useCallback } from 'react';
import DeleteIcon from "../../../assets/icons/trash.svg";
import './LikedUsers.css';

function LikedUser (props) {
    const { user, onRemoveUser } = props;
    const onClick = useCallback(function(e){
        e.preventDefault();
        if (!user.id) return;
        onRemoveUser(user.id);
    }, [user, onRemoveUser])

    return (
        <div key={user.id} className="info-container">
            <div className="info-left">
                <div className="avatar-thumb" >
                    <img src={`${user?.picture || '/'}`} className="avatar" alt="" width="40px" height="40px"></img>
                </div>
                <div className="info-detail">
                    <div className="username-wrapper">
                        <span className="username">
                            {`${user?.firstName} ${user?.lastName}`}
                        </span>
                    </div>
                    <div className="gender-wrapper">
                        <span className="gender">
                            Gender: {`${user?.gender}`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="info-right">
                <button className="btn btn-delete" onClick={onClick}>
                    <img src={DeleteIcon} className="avatar" alt="" width="12px" height="12px"></img>
                </button>
            </div>
        </div>
    )
}

function LikedUsers (props) {
    const {
        users,
        onRemoveUser
    } = props;

    return (
        <div className="list">
            {
                users.map(function(user) {
                    if (user.liked) {
                        return (
                            <LikedUser key={user.id} user={user} onRemoveUser={onRemoveUser}/>
                        )
                    }

                    return (
                        <React.Fragment key={user.id} />
                    )
                    
                })
            }
        </div>
    )
}

export default LikedUsers;