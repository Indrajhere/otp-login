import React, { useState } from 'react'
import OtpInput from './otp-input';

type Props = {}

const PhoneOtpForm = (props: Props) => {

    const [phone, setPhone] = useState<string>('');
    const [showOtpField, setShowOtpField] = useState<boolean>(false);


    const handlePhoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const regex = /^\d+$/;
        const isValidated = regex.test(phone) && phone.length >= 10;
        if (isValidated) {
            //BE API CALL
            setShowOtpField(true);
        }
        else {
            alert ('Invalid phn number')
        }
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleOtpSubmit = (value  :string) => {
        // API call
        console.log('Login Successful: ',value);
        alert('Logged in successfully');
    }


    return (
        <div>
            {!showOtpField ?
                (<form className='form' onSubmit={handlePhoneSubmit}>
                    <input className='phn-input'
                        type='text'
                        onChange={handlePhoneChange}
                        placeholder='Enter Phone Number'
                        value={phone} />
                    <button className='btn' type='submit'>Submit</button>
                </form>
                )
                :
                (
                    <>
                        <h3>Enter OTP sent to <span className='phone'>{phone}</span></h3>
                        <OtpInput length={4} handleOtpSubmit={handleOtpSubmit} />
                    </>

                )
            }
        </div>
    )
}

export default PhoneOtpForm