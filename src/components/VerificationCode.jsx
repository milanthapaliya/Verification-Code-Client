import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const VerificationCode = (props) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [serverError, setServerError] = useState(false);
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const handleChange = (e, index) => {
        setServerError(false);
        const value = e.target.value;

        setOtp((prevOtp) => {
            const newOtp = [...prevOtp];
            newOtp[index] = value.slice(-1);
            return newOtp;
        });

        if (value !== '' && index < 5) {
            refs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            refs[index - 1]?.current.focus();
        }
    };
    const validateCode = () => {
        return otp.some(value => isNaN(parseInt(value)));
    }

    const handleSubmit = async() => {
        if(!validateCode()){
            const data = parseInt(otp.join(''), 10);
            try{
                const response = await fetch(apiUrl + "/code", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code: data })
                });
                if(response.status === 200){
                    navigate("/success");
                }
                if(response.status === 400){
                    setServerError(true);
                }
            }catch(e){
                console.log(e,"error");
            }
        }
    }

    return (
        <>
            <div className={"container-verification-code"}>
                <div>
                    <p className={"text-verification-code"}>Verification code:</p>
                </div>
            <div className="otp-input">
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={refs[index]}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-digit"
                    maxLength="1"
                    style={{border: (otp[index] === '' || isNaN(otp[index])) ? "1px solid red" : "1px solid #ccc"}}
                />
            ))}
        </div>
            <div className={"container-submit"}>
                <button disabled={validateCode()} onClick={handleSubmit} className={"button-submit"}>Submit</button>
                {serverError && <span className={"text-error"}>Verification Error</span>}
            </div>
        </div>
        </>
    );
}
export default VerificationCode;