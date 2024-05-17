import React, { useReducer, useRef, useState } from 'react';
import { v4 } from 'uuid';
import './App.css';
import './Questions.css';
import IndividualQuestions, { GroupMember } from './IndividualQuestions';
import GroupMembersTable from './GroupMembersTable';

export interface GroupData {
    id: string,
    groupSize: string,
    primaryNumber: string,
    primaryEmail: string,
    date: string,
    arrivalDate: string,
    residence: string,
    learnedOf: string,
    madeAppointment: string,
}

function groupMembersReducer(prevState: GroupMember[], action: any) {
    switch (action.type) {
        case 'ADD':
            return [...prevState, action.payload];
        case 'UPDATE':
            return [...prevState.filter( member => member.id !== action.payload.id), action.payload];
        case 'REMOVE':
            return [...prevState.filter( member => member.id !== action.payload.id)];
        case 'CLEAR':
            return prevState = Array<GroupMember>(0);
        default:
            return prevState = Array<GroupMember>(0);
    }
};

function IntakeQuestions() {
    function defaultGroupData() {
        return {
            id: v4(),
            groupSize: "1",
            primaryNumber: "",
            primaryEmail: "",
            date: "",
            arrivalDate: "",
            residence: "",
            learnedOf: "",
            madeAppointment: "",
        }
    }

    const [{
        id,
        groupSize,
        primaryNumber,
        primaryEmail,
        date,
        arrivalDate,
        residence,
        learnedOf,
        madeAppointment,
    }, setState] = useState(defaultGroupData());
    const [editMember, updateEditMember] = useState()
    const dateInputRef = useRef(null);
    const arrivalDateInputRef = useRef(null);
    const [groupMembers, dispatcher] = useReducer(groupMembersReducer, []);

    const clearState = () => {
        setState({ ...defaultGroupData() });
    };
    
    function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const [isOpen, setisOpen] = useState(false);
    const toggle = () => {
        setisOpen(!isOpen);
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = [
            id,
            groupSize,
            primaryNumber,
            primaryEmail,
            date,
            arrivalDate,
            residence,
            learnedOf,
            madeAppointment,
        ];
        clearHandler();
        alert(`Submitted!`)
        clearState();
    }

    function addHandler(member: GroupMember) {
        dispatcher({ type: 'ADD', payload: member});
    };
    function updateHandler(member: GroupMember) {
        dispatcher({ type: 'UPDATE', payload: member});
    };
    function clearHandler() {
        dispatcher({ type: 'CLEAR' });
    };

    return(
        <div>
            <form className='App-body' onSubmit={handleSubmit}>
                <div id='genericQuestions'>
                    <h2>Welcome! Please take a moment to fill out the following information.</h2>
                    <label className='Question'>
                        {'Group Size*: '}
                        <input
                            type='number'
                            name='groupSize'
                            min={1}
                            required
                            value={groupSize}
                            onChange={onChange}
                        />    
                    </label>
                    <label className='Question'>
                        {'Date of Visit*: '}
                        <input
                            type='date'
                            name='date'
                            required
                            value={date}
                            onChange={onChange}
                            ref={dateInputRef}
                        />    
                    </label>
                </div>

                <div id='contactInfo'>
                    <label className='Question'>
                        {'Phone Number: '}
                        <input
                            type='text'
                            name='primaryNumber'
                            value={primaryNumber}
                            onChange={onChange}
                        />    
                    </label>
                    <label className='Question'>
                        {'Email: '}
                        <input
                            type='email'
                            name='primaryEmail'
                            value={primaryEmail}
                            onChange={onChange}
                        />    
                    </label>
                </div>

                <div className='logisticQuestions'>
                    <label className='Question'>
                        {'When did you arrive in New York City?* '}
                        <input
                            type='date'
                            name='arrivalDate'
                            required
                            value={arrivalDate}
                            onChange={onChange}
                            ref={arrivalDateInputRef}
                        />    
                    </label>
                    <label className='Question'>
                        {'Where are you staying at the moment?* '}
                        <input
                            type='text'
                            name='residence'
                            required
                            value={residence}
                            onChange={onChange}
                        />    
                    </label>
                </div>

                <div className='appointmentQuestions'>
                    <label className='Question'>
                        {'How did you hear about us?* '}
                        <input
                            type='text'
                            name='learnedOf'
                            required
                            value={learnedOf}
                            onChange={onChange}
                        />    
                    </label>
                    <label className='Question'>
                        {'How did you make your appointment?* '}
                        <input
                            type='text'
                            name='madeAppointment'
                            required
                            value={madeAppointment}
                            onChange={onChange}
                        />    
                    </label>
                </div>
                <br/>

                <button type="button" onClick={toggle}>Add Member</button>
                <button type="submit">Submit</button>
            </form>

            <IndividualQuestions
                isOpen={isOpen}
                toggle={toggle}
                numberOfMembers={groupMembers.length}
                groupId={id}
                member={editMember}
                addHandler={addHandler}
                updateHandler={updateHandler}
            />

            {groupMembers.length > 0 && (
                <GroupMembersTable
                    groupMembers={groupMembers}
                />
            )}

        </div>
    )

}

export default IntakeQuestions;
