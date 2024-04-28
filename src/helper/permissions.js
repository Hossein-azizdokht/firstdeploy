import React from 'react'
import { useDispatch, useSelector } from "react-redux";

export const permissionEnum = Object.freeze({
    canAll: 'canAll',
    //for Persons
    canUser: 'canUser',

});

export const UsePermission = () => {
    const permissionArray = [];

    // const permissions = useSelector((state) => state.permissions.data);
    const permissions = JSON.parse(localStorage.getItem('res'));

    // all access
    if (permissions.some((permission) => permission == 'admin'))
        permissionArray.push(permissionEnum.canAll);

    // user access
    if (permissions.some((permission) => permission === 'user'))
        permissionArray.push(permissionEnum.canUser);

    return permissionArray;

}

export const hasPermission = (permissionValue) => {

    const permissions = UsePermission();
    return permissions.some((permission) => permission == permissionValue);

}