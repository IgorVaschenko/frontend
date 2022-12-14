//Core
import React from 'react'

//Components
import { Counter } from './counter'
import { List } from './list';
import { Profile } from './profile';
import { SpecialList } from './specialList';
import { CheckinPet } from './checkInPet';

export const Pet = () => {
    return (
        <>
            <h1>Pet</h1>
            <hr />
            <CheckinPet />
            <hr />
            <Profile />
            <hr />
            <Counter />
            <hr />
            <List />
            <hr />
            <SpecialList />
            <hr />
        </>
    )
}