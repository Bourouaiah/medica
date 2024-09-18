import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchCars = () => {
  const { cars, setCars, setLoading } = useUserContext();


  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting fetchData');
      if (cars.length > 0) {
        console.log('Cars already fetched, skipping fetch');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Loading set to true');

        const carsSnapshot = await getDocs(collection(db, "cars"));
        const fetchedCars = carsSnapshot.docs.map((doc) => doc.data());

        console.log('Fetched cars:', fetchedCars);
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
        console.log("Finally block executed. Loading set to false.");
      }
    };

    fetchData();
  }, [setLoading, setCars, cars.length]);

  return { cars };
};

export default useFetchCars;
