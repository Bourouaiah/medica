import { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from '../UserContext';

const useFetchUser = () => {
    const { userDoc, setUserDoc, setLoading } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userQuery = query(
                        collection(db, "doctors"),
                        where("email", "==", user.email)
                    );
                    const userSnapshot = await getDocs(userQuery);
                    
                    if (!userSnapshot.empty) {
                        userSnapshot.forEach((doc) => {
                            setUserDoc(doc.data());
                        });
                    } else {
                        // If not found, search in patients
                        const patientQuery = query(
                            collection(db, "patients"),
                            where("email", "==", user.email)
                        );
                        const patientSnapshot = await getDocs(patientQuery);
                        
                        if (!patientSnapshot.empty) {
                            patientSnapshot.forEach((doc) => {
                                setUserDoc(doc.data());
                            });
                        } else {
                            setUserDoc(null);
                        }
                    }
                    setLoading(false);
                } else {
                    setUserDoc(null);
                    setLoading(false);
                }
            });
        };

        fetchData();
    }, [setLoading, setUserDoc]);

    return { userDoc };
};

export default useFetchUser;
