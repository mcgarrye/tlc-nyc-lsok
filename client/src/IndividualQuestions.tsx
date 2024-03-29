import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import './Questions.css';
import './IndividualQuestions.css';

export interface GroupMember {
    id: number,
    groupId?: string,
    firstName: string,
    lastName: string,
    birthdate: string,
    age: string,
    sex: string,
    pregnant: boolean,
    countryOfOrigin: string,
    primaryLanguage: string,
    secondaryLanguage: string,
    headOfGroup: boolean
}

interface individualQuestionsProps{
    isOpen: boolean,
    toggle: () => void,
    numberOfMembers: number,
    groupId: string,
    member?: GroupMember,
    addHandler: (member: GroupMember)=>void
    updateHandler: (member: GroupMember)=>void
}

function IndividualQuestions({isOpen, toggle, numberOfMembers, groupId, member, addHandler, updateHandler }: individualQuestionsProps) {
    const defaultGroupMember: GroupMember = {
        id: -1,
        groupId: groupId,
        firstName: "",
        lastName: "",
        birthdate: "",
        age: "",
        sex: "",
        pregnant: false,
        countryOfOrigin: "",
        primaryLanguage: "",
        secondaryLanguage: "",
        headOfGroup: false
    }

    const [{
        firstName,
        lastName,
        birthdate,
        age,
        sex,
        pregnant,
        countryOfOrigin,
        primaryLanguage,
        secondaryLanguage,
        headOfGroup
    }, setState] = useState(defaultGroupMember);
    const birthdateInputRef = useRef(null);

    const clearState = () => {
        setState({ ...defaultGroupMember });
    };
    
    function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    function setAge(newAge: string) {
        setState(prevState => ({ ...prevState, ['age']: newAge }));
    };

    function setSex(newSex: string) {
        setState(prevState => ({ ...prevState, ['sex']: newSex }));
    };

    function onChangeCheckBox(name: string, value: boolean) {
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        if (birthdate) {
            var today = new Date();
            var birthDate = new Date(birthdate);
            var ageNow = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                ageNow--;
            }
            if (ageNow === 0) {
                if (m === 1) {
                    setAge(`${m} month`)
                } else if (m < 0) {
                    setAge(`${12 + m} months`)
                }
                else {
                    setAge(`${m} months`)
                }
                
            } else if (ageNow) {
                setAge(`${ageNow}`)
            }
        } else {
            setAge("")
        }
        
        
    }, [birthdate]);

    function disableSubmit() {
        if (firstName && lastName && birthdate && sex && countryOfOrigin && primaryLanguage) {
            return false
        } else { 
            return true
        }
    };

    function handleSubmit() {
        if (member) {
            // updateHandler
        }
        else {
            addHandler({
                id: numberOfMembers + 1,
                firstName: firstName,
                lastName: lastName,
                birthdate: birthdate,
                age: age,
                sex: sex,
                pregnant: pregnant,
                countryOfOrigin: countryOfOrigin,
                primaryLanguage: primaryLanguage,
                secondaryLanguage: secondaryLanguage,
                headOfGroup: headOfGroup
            });
            clearState();
        }
        toggle();
    };

    return(
        <>
            {isOpen &&
            (<div className="modal-overlay" onClick={toggle}>
                <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmit}>
                        <h3>
                            New Group Member&nbsp;
                            {(firstName && lastName) && 
                            <>
                            [Name: {firstName} {lastName}]
                            </>
                            }
                            {(age) && 
                            <>
                            [Age: {age}]
                            </>
                            }
                        </h3>
                        <label className='Question'>
                            {'First Name*: '}
                            <input
                                type='text'
                                name='firstName'
                                required
                                value={firstName}
                                onChange={onChange}
                            />    
                        </label>

                        <label className='Question'>
                            {'Last Name*: '} 
                            <input
                                type='text'
                                name='lastName'
                                required
                                value={lastName}
                                onChange={onChange}
                            />
                        </label>
                        <br/>

                        <label className='Question'>
                            {'Date of Birth*: '}
                            <input
                                type='date'
                                name='birthdate'
                                required
                                max={new Date().toJSON().slice(0, 10)}
                                onChange={onChange}
                                ref={birthdateInputRef}
                            />
                        </label>

                        <>
                            {'Sex*: '}
                            <label>
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={sex === "Male"}
                                    onChange={e => setSex(e.target.value)}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={sex === "Female"}
                                    onChange={e => setSex(e.target.value)}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Other"
                                    checked={sex === "Other"}
                                    onChange={e => setSex(e.target.value)}
                                />
                                Other
                            </label>

                            {(sex === "Female" && age && parseInt(age) > 16) &&
                                <>
                                    <label className='Question'>
                                        {'Pregnant: '}
                                        <input
                                            type="checkbox"
                                            name="pregnant"
                                            checked={pregnant}
                                            onChange={e => onChangeCheckBox(e.target.name, !pregnant)}
                                        />
                                    </label>
                                    
                                </>
                            }
                        </>
                        <br/>

                        <label className='Question'>
                            {'Country of Origin*: '}
                            <input
                                type='text'
                                name='countryOfOrigin'
                                required
                                value={countryOfOrigin}
                                onChange={onChange}
                            />    
                        </label>

                        <section>
                            <label className='Question'>
                                {'Primary Language*: '}
                                <select
                                    name='primaryLanguage'
                                    required
                                    value={primaryLanguage}
                                    onChange={onChange}
                                >
                                    <option value="" disabled>Select a language</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="english">English</option>
                                    <option value="french">French</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                            <label className='Question'>
                                {'Secondary Language, if applicable: '}
                                <select
                                    name='secondaryLanguage'
                                    value={secondaryLanguage}
                                    onChange={onChange}
                                >
                                    <option value="" disabled>Select a language</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="english">English</option>
                                    <option value="french">French</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </section>
                        <label className='Question'>
                            {'Head of Group: '}
                            <input
                                type="checkbox"
                                name="headOfGroup"
                                checked={headOfGroup}
                                onChange={e => onChangeCheckBox(e.target.name, !headOfGroup)}
                            />
                        </label>
                        <button disabled={disableSubmit()} type="submit">Add New Member</button>
                    </form>
                </div>
            </div>)}
        </>
    );
    
}

export default IndividualQuestions;
