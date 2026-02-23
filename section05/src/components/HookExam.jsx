import useInput from './../hooks/useInput';

/** React Hooks
 * useState: State기능을 낚아채오는 Hook 
 * useRef: Reference 기능을 낚아채오는 Hook
 * useEffect 등...
 * 
 *  3가지 Hook 관련 팁
 *  1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
    2. 조건부로 호출될 수는 없다.
    3. custom Hook을 직접 만들 수 있다.
*/ 

const HookExam = () => {
    const [input, onChange] = useInput();
    const [input2, onChange2] = useInput();


    return <div>
        <input value={input} onChange={onChange}></input>
        <input value={input2} onChange={onChange2}></input>
    </div>
}

export default HookExam;