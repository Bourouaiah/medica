import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchCars = () => {
  const { cars, setCars, setLoading } = useUserContext();


  useEffect(() => {
    const fetchData = async () => {
      if (cars.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const carsSnapshot = await getDocs(collection(db, "cars"));
        const fetchedCars = carsSnapshot.docs.map((doc) => doc.data());

        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading, setCars, cars.length]);

  return { cars };
};

export default useFetchCars;
