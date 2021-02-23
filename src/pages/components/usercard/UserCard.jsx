import React, { useState, useEffect, useMemo, useCallback } from 'react';
import LikeIcon from "../../../assets/icons/heart.svg";
import DisLikeIcon from "../../../assets/icons/thumb-down.svg";
import './UserCard.css';

function User(props){

    const {
        user,
        onClick
    } = props;

    const onLike = useCallback(function(e) {
        e.preventDefault();
        if (!user?.id) return;
        onClick(true, user.id)
    }, [user, onClick]);

    const onDisLike = useCallback(function(e) {
        e.preventDefault();
        if (!user?.id) return;
        onClick(false, user.id)
    }, [user, onClick]);
    
    return (
        <div className="container">
            <div className="img-contaier">
                <img src={`${user?.picture || "/"}`} alt="Girl in a jacket" width="200"/>
            </div>
            <div className="user-info">
                <p className="user-info username">
                    {`${user?.firstName || ""} ${user?.lastName || ""}`}
                </p>
                <p className="user-info age">
                    Age: {`${user?.dateOfBirth ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear(): ''} `}
                </p>
            </div>
            <div className="btn-container">
                
                <button className="btn btn-left btn-dislike" onClick={onDisLike}>
                    <img src={DisLikeIcon} width='20px'  alt="dislike"/>
                </button>
                <button className="btn btn-right btn-like" onClick={onLike}>
                    <img src={LikeIcon} width='20px'  alt="like"/>
                </button>
            </div>
        </div>
    )
}

export default User;