//lдва поля вводим данные выводим сумму
import {useState, useRef} from "react";

const Option = () => {
    let [a, SetA] = useState();
    let [b, SetB] = useState();
    let AA = useRef();
    let BB = useRef();
    let handle = (event) => {
        //a = event.target["aaa"].value;
        //a = AA.current.value;
        SetA(AA.current.value);
        SetB(BB.current.value);
    }
    return (
        <>
            <input ref = {AA} name = "aaa" type = "text"/>

            <input ref = {BB} type = "text"/>
            <p></p>
            <button onClick = {handle}>нажать</button>
            {Number(a)+Number(b)}
        </>
    )
}
export default Option;