import { useState, useEffect } from "react";
import { collection, query, getDocs, limit, startAfter, where } from "firebase/firestore";
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
                        collection(db, "users"),
                        where("email", "==", user.email)
                    );
                    const userSnapshot = await getDocs(userQuery);
                    userSnapshot.forEach((doc) => {
                        setUserDoc(doc.data());
                    });
                    setLoading(false);
                }
            });
        };

        fetchData();
    }, [setLoading, setUserDoc]);

    return { userDoc };
};

export default useFetchUser;
