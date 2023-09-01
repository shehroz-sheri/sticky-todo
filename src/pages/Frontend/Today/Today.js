import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import dayjs from "dayjs";
import Todo from "../../components/Todo";


export default function Upcoming() {
    const [documents, setDocuments] = useState([]);
    const { user } = useAuthContext();
    const [isProcessing, setIsProcessing] = useState(true);
    const date = new Date();
    const currentDate = dayjs(date).format("YYYY-MM-DD");
    const title = "Today Todos";
    const getData = async () => {
        try {
            setIsProcessing(true);
            const q = query(
                collection(firestore, "todos"),
                where("createdBy.uid", "==", user.createdBy.uid),
                where("date", "==", currentDate)
            );

            const querySnapshot = await getDocs(q);
            const array = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                array.push(data);
            });
            setDocuments(array);
        }
        catch (err) {
            console.error(err);
        }
        setIsProcessing(false);
    };
    useEffect(() => {
        getData();
    }, []);
    
    return (
        <>
            <Todo documents={documents} title={title} isProcessing={isProcessing} />
        </>
    );
}