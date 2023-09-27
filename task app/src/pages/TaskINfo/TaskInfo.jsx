/* eslint-disable react/jsx-key */
import { BiSolidLock } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { MdDescription } from 'react-icons/md'
import { GoKebabHorizontal } from 'react-icons/go'
import Navbar from '../../companents/navbar/Navbar'
import './taskInfo.css'
import { useEffect, useRef, useState } from 'react'
import ava from './../../assets/vod.png';
import { ImEarth } from 'react-icons/im';
import { HiPencil } from 'react-icons/hi';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chat from '../../companents/chat/Chat'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'
import List from './List'



export default function TaskInfo() {

    const { id } = useParams()
    const [tasksChil, setTasksChil] = useState([])

    const getTask = async () => {
        const response = await axios.get(`http://manager.zafarr.uz/routers/lists/${id}`)
        setTasksChil(response.data)
    }

    useEffect(() => {
        getTask()
    }, [])

    const top100Films = [
        { label: 'Muhammad Komilov', year: 1994 },
        { label: 'Lionel Ranaldo', year: 1972 },
    ]

    const inputRef = useRef()
    const taskNameRef = useRef()
    const closeRef = useRef()
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const setRef = useRef()
    const [editingTaskName, setEditingTaskName] = useState(""); // Yangi o'zgaruvchi
    const changeRef = useRef()


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setSelectedFile(file);
                setImageSrc(imageUrl);
            }
        }
    };


    // list add

    const tokenw = localStorage.getItem('accessToken');

    const addList = async () => {
        try {
            const response = await axios.post(
                `http://manager.zafarr.uz/routers/list/`,
                {
                    title: taskNameRef.current.value,
                    board: id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Token ${tokenw}`,
                    },
                }
            );
            console.log(response.data);
            window.location.reload()
        } catch (error) {
            console.error("Error:", error);
        }
    };



    // add card

    return (
        <>
            <Navbar />
            <div className="ProfileNav">
                <div className="profilNavLeft">
                    <div className="taskStatusSelect">
                        <button className='statusTaskBtn'>
                            <Dropdown className='hello'>
                                <MenuButton className='GlavBtn'><button className='dropOnBtn'><BiSolidLock /> <span>Private</span></button></MenuButton>
                                <Menu className='dropMenu1'>
                                    <div className="tskSelectorTitle">
                                        <h3>Visibility</h3>
                                        <p>Choose who can see this board</p>
                                    </div>
                                    <MenuItem className='dropBtn'>
                                        <ImEarth color='#61BD4F' />
                                        <span>Public</span>
                                        <p>Anyone can see this board. Only board members can edit</p>
                                    </MenuItem>
                                    <MenuItem className='dropBtn'>
                                        <BiSolidLock color='#EB5A46' />
                                        <span>Private</span>
                                        <p>Only board members can see and edit this board</p>
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </button>
                    </div>
                    <div className="userAdd">
                        <div className="userAdd__users">
                            <img src="https://img.a.transfermarkt.technology/portrait/big/8198-1685035469.png?lm=1" alt="" />
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                        </div>
                        <div className="userAdd__userAdd">
                            <Dropdown>
                                <MenuButton><button><BsPlusLg /></button></MenuButton>
                                <Menu>
                                    <MenuItem>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={top100Films}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Users" />}
                                        />
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className="profilNavRight">
                    <button>2 user</button>
                </div>
            </div>
            <div className="tasks">
                {
                    tasksChil.map((taskItem, index) => (
                        <List
                            key={taskItem.id} 
                            inputRef={inputRef}
                            editingTaskName={editingTaskName}
                            closeRef={closeRef}
                            setEditingTaskName={setEditingTaskName}
                            taskItem={taskItem}
                            id={id}
                            changeRef={changeRef}
                           
                        />
                    ))

                }
                <div className="taskAddBtn">
                    <div className="addMiniDesc" style={{ backgroundColor: "#F1F3F2" }}>
                        <input ref={taskNameRef} type="text" placeholder='Add another list' />
                        <button onClick={addList}><BsPlusLg /></button>
                    </div>
                </div>
            </div >
        </>
    )
}