import {useState, useRef} from 'react';

/** React Hooks
 * useState: State기능을 낚아채오는 Hook 
 * useRef: Reference 기능을 낚아채오는 Hook
 * useEffect 등...
 */ 
const Register = () => {

    const [input, setInput] = useState({
        name:"",
        birth:"",
        country:"",
        bio:"",
    });
    const countRef = useRef(0);

    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        countRef.current++;

        setInput({
            ...input,
            [e.target.name] : e.target.value,       // [프로퍼티의 key는 name값으로 설정하겠다]
        })
    }

    return(
        <div>
            <div><input name="name" value={input.name} onChange={onChange} placeholder={'이름'}></input></div>
            <div><input name="birth" value={input.birth} type="date" onChange={onChange}></input></div>
            <div>
                <select name="country" value={input.country} onChange={onChange}>
                    <option></option>
                    <option value="kr">한국</option>
                    <option value="us">미국</option>
                    <option value="uk">영국</option>
                </select>
            </div>
            <div>
                <textarea name="bio" value={input.bio} onChange={onChange}/>
            </div>
        </div>
    );
}; 

export default Register;