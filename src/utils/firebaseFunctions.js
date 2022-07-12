import { async } from "@firebase/util";
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

//save new item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'clothingItems', `${Date.now()}`), data, {
        merge: true
    }
    );
};

export const fetchItems = async () => {
    const items = await getDocs(
        query(collection(firestore, 'clothingItems'), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
};