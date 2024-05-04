import React, { useState, useRef, useEffect } from 'react'

type Props = {
    length: number;
    handleOtpSubmit: (value: string) => void;
}

const OtpInput = ({ length, handleOtpSubmit }: Props) => {

    const [otp, setOtp] = useState<string[]>(Array.from({ length }).fill("") as string[]);
    const inputRefs = Array.from({ length }, () => useRef<HTMLInputElement>(null));

    useEffect(() => {
        if (inputRefs[0]?.current) {
            inputRefs[0].current?.focus();
        }
    }, []);
    // console.log(typeof inputRefs[0]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const combinedOtp = otp.join('');
        if (combinedOtp.length === length) handleOtpSubmit(combinedOtp);

    }

    const handleClick = (index: number) => {
        // console.log('click fired');

        if (inputRefs[index].current) {
            inputRefs[index]?.current?.setSelectionRange(1, 1);  // To make sure cursor is on right side of input ele
        }
    }



    const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('index: ', index)
        const value = e.target.value;
        // console.log('value: ', value);
        if (value && isNaN(parseFloat(value))) return;      //if anything else num is entered return;

        const newOtp = [...otp];
        // if(currentValue)
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // To take focus to first index which is empty
        if (index > 0 && newOtp.indexOf('') !== -1) {
            inputRefs[newOtp.indexOf('')].current?.focus();
            return;
        }
        // Takes focus on next input ele
        if (index < length - 1 && inputRefs[index + 1].current && value) {
            inputRefs[index + 1].current?.focus();
            return;
        }
        // Takes focus on prev input ele
        else if (index > 0 && inputRefs[index - 1].current && !value) {
            inputRefs[index - 1].current?.focus();
            return;
        }
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                {otp.map((value, index) => (
                    <input
                        className="otp-input"
                        onChange={(e) => handleOtpChange(index, e)}
                        onClick={() => handleClick(index)}
                        key={index}
                        value={value}
                        type="text"
                        ref={inputRefs[index]}
                    />
                )
                )}
                </div>
                <button className='btn' disabled={otp.join('').length !== length} type='submit'>Continue</button>

            </form>
        </div>
    )
}

export default OtpInput;