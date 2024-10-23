import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function useFetchBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const bookingsQuery = query(
      collection(db, "book"),
      where("bookStatus", "==", "dropoff"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (querySnapshot) => {
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(fetchedData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { bookings, loading, error };
}
