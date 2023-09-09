import { BiSolidLock } from 'react-icons/bi'
import './mainNav.css'
import { useRef } from 'react'

export default function MainNav({setTaskData , taskData }) {

    const closeRef = useRef()
    const inputRef = useRef()


    function Addtack() {
        const newTask = {
            id: taskData.length + 1 ,
            name: inputRef.current.value ,
            users: [
                {
                    image: "https://img.a.transfermarkt.technology/portrait/big/8198-1685035469.png?lm=1"
                }
            ]
        };
        setTaskData([...taskData , newTask])
    };

    return (
        <>
            <div className="mainNav">
                <h5>All Boards</h5>
                <button onClick={() => closeRef.current.classList.remove('none')}>+ Add</button>
            </div>
            <div ref={closeRef} className="mainNavModel none">
                <div className="mainNavModelCard">
                    <button className='close' onClick={() => closeRef.current.classList.add('none')}>X</button>
                    <input ref={inputRef} type="text" placeholder="Add board title" />
                    <button id='type'><BiSolidLock /><h5>Private</h5></button>
                    <div className="btns">
                        <button className='btns1'>Canel</button>
                        <button className='btns2' onClick={() => Addtack() + closeRef.current.classList.add('none')}>+ Create</button>
                    </div>
                </div>
            </div>
        </>
    )
}