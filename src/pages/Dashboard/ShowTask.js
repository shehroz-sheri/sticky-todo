import React, { useEffect, useState } from 'react'
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import { firestore } from '../../config/firebase';
import { useAuthContext } from '../../context/AuthContext';
import Todo from '../components/Todo';

export default function ShowTask({ addTodo }) {
    const { user } = useAuthContext()
    const [documents, setDocuments] = useState([])

    const getData = async () => {
        try {
            const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.createdBy.uid));
            const querySnapshot = await getDocs(q);
            const array = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                array.push(data)

            });
            setDocuments(array)
        } catch (err) {
            console.error(err)
        }

    }
    useEffect(() => {
        getData()
    }, [addTodo])

    return (
        <>
            <Todo documents={documents} />
        </>
    )
}