import {useState} from 'react';

//useState는 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능하지만 
// function name 앞에 use를 붙여주면 사용 가능하다.
function useInput(){
    const [input, setInput] = useState("");

    const onChange = (e) =>{
        setInput(e.target.value);
    };

    return [input, onChange];
}

export default useInput;