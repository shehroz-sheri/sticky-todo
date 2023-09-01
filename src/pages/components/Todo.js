import React, { useContext, useState } from 'react'
import { Card, Divider, message } from "antd";
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { AuthContext } from 'context/AuthContext';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import { firestore } from 'config/firebase';

export default function Todo({ documents, title, isProcessing }) {
    const { user } = useContext(AuthContext)

    // const [date, setDate] = useState('')
    const [todo, setTodo] = useState({})
    const [files, setFiles] = useState([])
    const [isProcessingDelete, setIsProcessingDelete] = useState(false);

    // const handleDate = (_, date) => {
    //     setDate(date);
    // };

    const handleChange = e => {
        setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleUpdate = async () => {
        let formData = { ...todo };
        formData.date = formData.date;
        formData.dateModified = serverTimestamp();

        formData.modifiedBy = {
            email: user.createdBy.email,
            uid: user.createdBy.uid
        };
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
            message.success("Todo has been updated successfully. Please refresh the page to see the changes.");

            let newFiles = documents.map((doc) => {
                if (doc.id === todo.id)
                    return todo;
                return doc;
            })

            setFiles(newFiles)
        }
        catch (err) {
            console.error(err);
            message.error("Something went wrong while updating Todo");
        }
        setTimeout(() => {
            window.location.reload();
        }, 3300)

    };

    const handleDelete = async (todo) => {
        setIsProcessingDelete(true);

        try {
            await deleteDoc(doc(firestore, "todos", todo.id));

            message.success("Todo has been deleted successfully. Please refresh the page to see the changes.");
            let newFiles = documents.filter((doc) => {
                return doc.id !== todo.id;
            })
            setFiles(newFiles)
        }
        catch (err) {
            console.error(err)
            message.error("Something went wrong while deleting Todo");
        }

        setIsProcessingDelete(false);
        setTimeout(() => {
            window.location.reload();
        }, 3300)
    };


    let colors = ['#bde0fe', '#adb5bd', '#87bba2', '#eac4d5', '#9ad1d4', '#a9bcd0', '#759eb8', '#a0c4e2', '#85c7de', '#a0c4e2', '#85c7de', '#93b1a7']

    return (
        <>
            {isProcessing
                ? <div className='loader' >
                    <div className="spinner-grow" style={{ width: '50px', height: '50px', color: '#264653' }} >
                    </div>
                </div>
                : <div className="container-fluid m-0 p-0" >
                    <div className="row d-flex flex-direction-row m-0 p-0" >
                        <h1 className='my-2' > {title} </h1>
                        {documents.map((todo, index) => {
                            return <Card className='p-0'
                                key={
                                    index
                                }
                                style={
                                    {
                                        maxWidth: 300,
                                        minHeight: 250,
                                        margin: "10px 5px 10px 5px",
                                        cursor: "pointer",
                                        backgroundColor: colors[(Math.floor(Math.random() * colors.length))],
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: 'space-between'
                                    }
                                }
                                hoverable={
                                    true
                                } >
                                <h5 className='text-center ' > {
                                    todo.todoType
                                } </h5>

                                <Divider className='mt-0' />
                                <strong className='m-0 p-0'>Title</strong>
                                <p className='title' > {
                                    todo.title
                                } </p>
                                <Divider className='mt-0 mb-1' />
                                <strong>Description</strong>
                                <p className='desc' > {
                                    todo.description
                                } </p>

                                <p><span className='fw-bold'>Date:</span> <span>{todo.date ? dayjs(todo.date).format("DD-MMM-YYYY") : ""}</span></p>

                                <button style={{ paddingLeft: '7px', paddingReft: '7px', paddingBottom: '6px', paddingTop: '0' }} className='btn btn-primary btn-sm me-1' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo) }}>
                                    {!isProcessing
                                        ? <EditOutlined />
                                        : <div className="spinner-border spinner-border-sm"></div>
                                    }
                                </button>

                                <button style={{ paddingLeft: '7px', paddingReft: '7px', paddingBottom: '6px', paddingTop: '0' }} className='btn btn-danger btn-sm' onClick={() => { handleDelete(todo) }}>
                                    {!isProcessingDelete
                                        ? <DeleteOutlined />
                                        : <div className="spinner-border spinner-border-sm"></div>
                                    }
                                </button>

                            </Card>
                        })
                        }
                    </div>
                </div>
            }


            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Update Todo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="col mb-3">
                                    <input type="text" className='form-control' name="title" value={todo.title} placeholder='Enter Title' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <textarea name="description" className='form-control' value={todo.description} rows='5' placeholder='Enter Description' onChange={handleChange}></textarea>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-12">
                                <input type="date" className='w-100 border-0' onChange={handleDate} name="" id="" />
                                </div>
                            </div> */}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}