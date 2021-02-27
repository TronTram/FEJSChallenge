import React, { useState, useCallback } from 'react';
import { useSwipeable } from "react-swipeable";
import LikeIcon from "../../../assets/icons/heart.svg";
import DisLikeIcon from "../../../assets/icons/thumb-down.svg";
import './UserCard.css';

function User(props){
    const [state, setState] = useState({
        disabled: false
    })
    const {
        user,
        onClick
    } = props;

    const handleDisableButton = useCallback(function(status) {
        setState(function(prevState) {
            return {
                ...prevState,
                disabled: status
            }
        })
    }, [])

    const onLike = useCallback(function(e) {

        e.preventDefault();
        if (!user?.id || state.disabled) return;
        handleDisableButton(true);

        onClick(true, user.id, function() {
            return handleDisableButton(false);
        });
    }, [user, onClick, handleDisableButton, state.disabled]);

    const onDisLike = useCallback(function(e) {

        e.preventDefault();
        if (!user?.id || state.disabled) return;
        handleDisableButton(true);

        onClick(false, user.id, function() {
            return handleDisableButton(false);
        });
    }, [user, onClick, handleDisableButton, state.disabled]);
    
    const handlers = useSwipeable({
        onSwipedLeft: function({event}) {
            return onDisLike(event);
        },
        onSwipedRight: function({event}) {
            return onLike(event);
        },
        preventDefaultTouchmoveEvent: false,
        trackMouse: true
    });
    return (
        <div className="container">
            <div className="img-contaier" {...handlers} style={{backgroundImage: `url(${user?.picture})`}} />
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