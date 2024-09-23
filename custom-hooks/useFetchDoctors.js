import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchDoctors = () => {
  const { doctors, setDoctors, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (doctors.length > 0) {
        setLoading(false);
        return;
      }

      const doctorsSnapshot = await getDocs(collection(db, "doctors"));
      const fetchedDoctors = doctorsSnapshot.docs.map((doc) => doc.data());

      setDoctors(fetchedDoctors);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setDoctors, doctors.length]);

  return { doctors };
};

export default useFetchDoctors;