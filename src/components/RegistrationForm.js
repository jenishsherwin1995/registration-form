import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../store/userSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { CascadeSelect } from 'primereact/cascadeselect';
import { AutoComplete } from 'primereact/autocomplete';
import { Rating } from 'primereact/rating';
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Chips } from 'primereact/chips';
import { ColorPicker } from 'primereact/colorpicker';
import { useNavigate } from 'react-router-dom';
import { Slider } from 'primereact/slider';
import { SelectButton } from 'primereact/selectbutton';
import './RegistrationForm.css';

// Import mock data
import {
    studyModes,
    genderOptions,
    skillOptions,
    countries,
    universityList
} from '../mockdata/mockData';

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        age: 18,
        skills: [],
        agreement: false,
        location: null,
        selectedUniversity: null,
        gender: null,
        hobbies: [],
        favoriteColor: null,
        rating: null,
        modeOfStudy: 'Online',
        notifications: false,
    });

    const [filteredUniversities, setFilteredUniversities] = useState([]);

    const searchUniversities = (event) => {
        const query = event.query.toLowerCase();
        const filtered = universityList.filter((u) =>
            u.toLowerCase().includes(query)
        );
        setFilteredUniversities(filtered);
    };

    const updateFormState = (key, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        if (key !== 'agreement') {
            setValue(key, value);
        }
    };

    const onSubmit = (data) => {
        if (!formState.agreement) {
            alert('You must agree to the terms and conditions.');
            return;
        }
        const finalData = {
            ...data,
            ...formState,
        };

        dispatch(saveUserData(finalData));
        navigate('/welcome');
    };
    return (
        <div className="registration-container">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="registration-form"
            >
                <h2>Registration Form</h2>
                <div className="form-row">

                    <div className="form-field">
                        <label>Full Name</label>
                        <InputText {...register('fullName', { required: 'First name is required' })} />
                        {errors.fullName && <small className="p-error">{errors.fullName.message}</small>}
                    </div>


                    <div className="form-field">
                        <label>Date of Birth</label>
                        <Calendar
                            {...register('dob', { required: 'Date of birth is required' })}
                            showIcon
                            onChange={(e) => setValue('dob', e.value)}
                        />
                        {errors.dob && <small className="p-error">{errors.dob.message}</small>}
                    </div>



                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label>Gender</label>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            {genderOptions.map((option) => (
                                <div key={option.value} className="p-field-radiobutton">
                                    <RadioButton
                                        inputId={option.value}
                                        name="gender"
                                        value={option.value}
                                        onChange={(e) => updateFormState('gender', e.value)}
                                        checked={formState.gender === option.value}
                                    />
                                    <label htmlFor={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-field">
                        <label>Age: {formState.age}</label>
                        <Slider
                            value={formState.age}
                            onChange={(e) => updateFormState('age', e.value)}
                            min={18}
                            max={100}
                            style={{ width: '100%' }}
                        />
                    </div>



                </div>
                <div className="form-row">

                    <div className="form-field">
                        <label>Hobbies</label>
                        <Chips value={formState.hobbies} onChange={(e) => updateFormState('hobbies', e.value)} />
                    </div>
                    <div className="form-field">
                        <label>Favorite Color</label>
                        <ColorPicker value={formState.favoriteColor} onChange={(e) => updateFormState('favoriteColor', e.value)} />
                    </div>

                    <div className="form-field">
                        <label>Location</label>
                        <CascadeSelect
                            value={formState.location}
                            options={countries}
                            optionLabel="name"
                            optionGroupLabel="name"
                            optionGroupChildren={['states']}
                            placeholder="Select Country, State"
                            onChange={(e) => updateFormState('location', e.value)}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label>University</label>
                        <AutoComplete
                            value={formState.selectedUniversity}
                            suggestions={filteredUniversities}
                            completeMethod={searchUniversities}
                            onChange={(e) => updateFormState('selectedUniversity', e.value)}
                            placeholder="Type your university"
                        />
                    </div>

                    <div className="form-field">
                        <label>Skills</label>
                        <MultiSelect
                            value={formState.skills}
                            options={skillOptions}
                            onChange={(e) => updateFormState('skills', e.value)}
                            placeholder="Select your skills"
                        />
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label>Mode of Study</label>
                        <SelectButton value={formState.modeOfStudy} options={studyModes} onChange={(e) => updateFormState('modeOfStudy', e.value)} />
                    </div>
                    <div className="form-field">
                        <label>Rate Your Experience</label>
                        <Rating value={formState.rating} onChange={(e) => updateFormState('rating', e.value)} stars={5} />
                    </div>
                </div>

                <div className="form-field">
                    <label>Address</label>
                    <InputTextarea
                        {...register('address', { required: 'Address is required' })}
                        rows={3}
                        autoResize
                    />
                    {errors.address && <small className="p-error">{errors.address.message}</small>}
                </div>


                <div className="form-field">
                    <Checkbox
                        inputId="agreement"
                        checked={formState.agreement}
                        onChange={(e) => updateFormState('agreement', e.checked)}
                    />
                    <label htmlFor="agreement">I agree to the terms and conditions</label>
                </div>


                <Button type="submit" label="Submit" className="p-mt-3" />
            </form>
        </div>
    );
};

export default RegistrationForm;
