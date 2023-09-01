import React, { useState } from 'react'
import { Divider, Form, DatePicker, Button, message } from 'antd'
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { firestore } from '../../../config/firebase';
import { useAuthContext } from '../../../context/AuthContext';
import Todo from '../../components/Todo';
// import Calendar from 'react-calendar'


export default function Calendar() {
    const initailState = { selectDate: "" }
    const { user } = useAuthContext()
    const [date, setDate] = useState(initailState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [documents, setDocuments] = useState([])
    const handleDate = (_, date) => {
        setDate(date)
    }
    const handleSubmit = async (values) => {

        if (date.selectDate === "") {
            return message.error("Please enter Date")
        } else {
            try {
                setIsProcessing(true)
                const q = query(collection(firestore, "todos"), where("date", "==", date), where("createdBy.uid", "==", user.createdBy.uid));
                const querySnapshot = await getDocs(q);
                let array = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    array.push(data)
                });
                setDocuments(array)
            }
            catch (err) {
                console.error(err);
            }
            setIsProcessing(false)
        }
    }
    return (
        <>
            <div className="container-fluid py-3" >
                <div className="row" >
                    <div className='mb-4 pt-2' style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} >
                        <h1 className='text-center'>Calender</h1>
                        <p className='text-center text-secondary'>Filter Todos by Date</p>
                    </div>
                    < div className="col" >
                        <Form className='mt-5' onFinish={handleSubmit} >
                            <Form.Item className='text-center' hasFeedback >
                                <DatePicker className='w-50 ' name='selectDate' style={{ height: "50px" }} placeholder='Select Date' onChange={handleDate} />
                            </Form.Item>
                            <Form.Item className='text-center' >
                                <Button style={{ backgroundColor: '#264653' }} className='' type='primary' htmlType='submit' loading={isProcessing} disabled={isProcessing} >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        {/* <Calendar /> */}
                        < Divider />
                        <Todo documents={documents} isProcessing={isProcessing} />
                    </div>
                </div>
            </div>
        </>
    )
}