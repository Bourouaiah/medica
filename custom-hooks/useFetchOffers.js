import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchOffers = () => {
  const { offers, setOffers, setLoading } = useUserContext();


  useEffect(() => {
    const fetchData = async () => {
      if (offers.length > 0) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const offersSnapshot = await getDocs(collection(db, "offers"));
        const fetchedOffers = offersSnapshot.docs.map((doc) => doc.data());

        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading, setOffers, offers?.length]);

  return { offers };
};

export default useFetchOffers;
