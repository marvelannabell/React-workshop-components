import { User } from "./User";
import { useState } from "react";
import { UserDetails } from "./UserDetails";
import { getOne } from "../Services/UserServices";
import { UserEdit } from "./UserEdit";
import { UserDelete } from "./UserDelete";
import { UserAdd } from "./UserAdd";

const userActions = {
    Details: 'details',
    Edit: 'edit',
    Delete: 'delete',
    Add: 'add'
}

export const UserList = ({
    users,
    userSubmitHandler,
    onDeleteClickHandler,
    formValues,
    formChangeHandler,
}) => {

    // const[selectedUser,setSelectedUser]=useState(null);
    // const[userAction, setUserAction] = useState(null);

    const [selectedUserAndUseraction, setSelectedUserAndUserAction] = useState({ selectedUser: null, userAction: null });
    const [showAddUser, setShowAddUser] = useState(false);

    const onInfoClick = async (userId) => {
        const user = await getOne(userId)
        // console.log(user);
        if (user) {
            // setSelectedUser(user);
            // setUserAction(userActions.Details);

            setSelectedUserAndUserAction({
                selectedUser: user,
                userAction: userActions.Details
            });

        }
    };


    const onClose = () => {
        setSelectedUserAndUserAction({ selectedUser: null, userAction: null })
    }

    const onEditClick = async (userId) => {
        const user = await getOne(userId)
        // console.log(user);
        if (user) {
            // setSelectedUser(user);
            // setUserAction(userActions.Details);

            setSelectedUserAndUserAction({
                selectedUser: user,
                userAction: userActions.Edit
            });

        }
    };

    const onDeleteClik=async(userId)=>{
        onDeleteClickHandler(userId);
        setSelectedUserAndUserAction({
                    selectedUser: null,
                    userAction: null,
                });

    }
    // const onDeleteClickHandler = async (userId) => {
    //     const user = await remove(userId)
    //     setSelectedUserAndUserAction({
    //         selectedUser: null,
    //         userAction: null,
    //     });
     
      
    // }
 
    const onDeleteClickModal = async (userId) => {
    
    
        const user = await getOne(userId)
     
        // console.log(user);
        if (user) {
            // setSelectedUser(user);
            // setUserAction(userActions.Details);

            setSelectedUserAndUserAction({
                selectedUser: user,
                userAction: userActions.Delete
            });

        }
    };
    const onAddUser = () => {
        setSelectedUserAndUserAction({
            selectedUser: null,
            userAction: userActions.Add
        });
        setShowAddUser(true)

    };

    const onUserSubmitHandlerCloseAddUser = (e) => {
        userSubmitHandler(e)
        // setSelectedUserAndUserAction({
        //     selectedUser: null,
        //     userAction: null
        // });
        setShowAddUser(false)
    }



    return (
        <>
            {/* {selectedUser && <UserDetails {...selectedUser} onClose={onClose} />} */}
            {selectedUserAndUseraction.userAction === userActions.Details &&
                <UserDetails
                    {...selectedUserAndUseraction.selectedUser}
                    onClose={onClose}
                />
            }

            {selectedUserAndUseraction.userAction === userActions.Edit &&
                <UserEdit
                    {...selectedUserAndUseraction.selectedUser}
                    onClose={onClose}
                />
            }

            {selectedUserAndUseraction.userAction === userActions.Delete &&
                <UserDelete {...selectedUserAndUseraction.selectedUser}
                    onClose={onClose} 
                    onDeleteClik={onDeleteClik}
                />
            }
            {selectedUserAndUseraction.userAction === userActions.Add && showAddUser &&
                <UserAdd
                    onClose={onClose}
                    userSubmitHandler={onUserSubmitHandlerCloseAddUser}
                    formValues={formValues}
                    formChangeHandler={formChangeHandler}
                // onCloseAddUser={onCloseAddUser}
                />
            }

            <div className="table-wrapper">

                {/* 
                      <div className="loading-shade">
                      
                          <div className="spinner"></div>
          
                         
          
                          <div className="table-overlap">
                              <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="triangle-exclamation"
                                  className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                              >
                                  <path
                                      fill="currentColor"
                                      d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                                  ></path>
                              </svg>
                              <h2>There is no users yet.</h2>
                          </div>
           
          
          
                          <div className="table-overlap">
                              <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="triangle-exclamation"
                                  className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                              >
                                  <path
                                      fill="currentColor"
                                      d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                                  ></path>
                              </svg>
                              <h2>Sorry, we couldn't find what you're looking for.</h2>
                          </div>
                  
          
                          <div className="table-overlap">
                              <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="triangle-exclamation"
                                  className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                              >
                                  <path
                                      fill="currentColor"
                                      d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                                  ></path>
                              </svg>
                              <h2>Failed to fetch</h2>
                          </div>
                      </div> */}

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table row component  */}
                        {users.map(x =>
                            <User
                                key={x._id}
                                {...x}
                                onInfoClick={onInfoClick}
                                onEditClick={onEditClick}
                                onDeleteClickModal={onDeleteClickModal}
                                onDeleteClickHandler={onDeleteClickHandler} />)}

                    </tbody>
                </table>
            </div>
            <button className="btn-add btn" onClick={() => onAddUser()}>Add new user</button>
        </>
    )
}