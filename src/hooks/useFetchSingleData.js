import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function useFetchSingleData(id, collectionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dataRef = doc(db, collectionName, id);
        const dataDoc = await getDoc(dataRef);

        if (dataDoc.exists()) {
          setData({ id: dataDoc.id, ...dataDoc.data() });
        } else {
          setError(new Error(`${collectionName} not found`));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id && collectionName) {
      fetchData();
    }
  }, [id, collectionName]);

  return { data, loading, error };
}
