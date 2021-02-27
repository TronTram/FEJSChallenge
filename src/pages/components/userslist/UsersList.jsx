import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';

import { Tabs, TabPanel } from "../../../common/components/tab";
import Loading from "../../../common/components/loading/Loading";
import UserCard from '../usercard/UserCard';
import LikedUsers from '../likedUsers/LikedUsers';
import UserService from '../../../common/services/user.service';
import { handleError } from "../../../common/utils/error-handler";
import { updateUserDetail } from "../../../common/utils/helpers";

import "./UsersList.css"

function UsersList (props) {
    const [state, setState] = useState({
        isLoading: true,
        page: 0,
        users: [],
        activeUser: {},
        numsLiked: 0
      })
    
      const { isLoading, users, activeUser, numsLiked, page } = state;
    
      const __isMounted = useRef(false);
      useEffect(function () {
        __isMounted.current = true;
    
        return function () {
          __isMounted.current = false;
        }
      }, []);
    
      useEffect(function() {
        const fetchUsers = async function () {
          try {

            const { data: users = [] }  = await UserService.getUsers(page);
            if (!users.length) return null;

            const userDetail = await UserService.getUserDetail(users[0].id);
            const newUsers = updateUserDetail(users, userDetail);
            __isMounted && setState(function (prevState) {
              return {
                ...prevState,
                isLoading: false,
                users: prevState.users.concat(newUsers),
                activeUser: userDetail
              }
            })
          }
          catch (error) {
            handleError(error)
          }
        }
    
        fetchUsers();
      }, [page]);

      const onClick = useCallback(async function (isLike = true, userId, callback) {
        try {
          const foundUserIndex = users.findIndex(user => user.id === userId);

          if (foundUserIndex === -1) return null;
          if ( users[foundUserIndex].liked || users[foundUserIndex].disLiked) {
            return setState(function(prevState) {
              return {
                ...prevState,
                isLoading: true,
                page: prevState.page + 1
              }
            })
          }

          if (isLike) {
            users[foundUserIndex].liked = true;
          } else {
            users[foundUserIndex].disLiked = true;
          }

          if (foundUserIndex !== users.length - 1) {
            const nextUserDetail = await UserService.getUserDetail(users[foundUserIndex + 1].id);
            const newUsers = updateUserDetail(users, nextUserDetail);
            __isMounted && setState(function (prevState) {
              return {
                ...prevState,
                users: newUsers,
                activeUser: nextUserDetail,
                numsLiked: isLike ? prevState.numsLiked + 1 : prevState.numsLiked
              }
            })
          } else {
            __isMounted && setState(function (prevState) {
              return {
                ...prevState,
                numsLiked: isLike ? prevState.numsLiked + 1 : prevState.numsLiked
              }
            })
          }

          if (typeof callback === 'function') callback();
        } catch (error) {
          handleError(error)
        }
      }, [users]);

      const onRemoveUser = useCallback(function(userId) {
        const foundUserIndex = users.findIndex(user => user.id === userId);
        if (foundUserIndex === -1) return;
        const newUsers = users.map(function(user){
          if (user.id === userId) {
            return {
              ...user,
              liked: false
            }
          }
          return user;
        })
        __isMounted && setState(function(prevState) {
          return {
            ...prevState,
            users: newUsers,
            numsLiked: prevState.numsLiked - 1
          }
        })
      }, [users])
    return (
        <Fragment>
            {
                isLoading ?
                    <div className="loading-container"> 
                      <Loading /> 
                    </div>                   
                    :
                    <Tabs className="nav-link">
                      <TabPanel label="Home">
                        <UserCard user={activeUser} onClick={onClick} />
                      </TabPanel>
                      <TabPanel label={`Liked (${numsLiked})`}>
                        <LikedUsers users={users} onRemoveUser={onRemoveUser}/>
                      </TabPanel>
                    </Tabs>    
            }
        </Fragment>
    )
}

export default UsersList;