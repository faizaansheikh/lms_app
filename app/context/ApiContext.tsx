"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { GeneralCoreService } from "../config/GeneralCoreService";
import { getUser } from "../utility";

const ApiContext = createContext<any>(null);

export const ApiProvider = ({ children }: any) => {
    const [data, setData] = useState<any>([]);
    
    const [error, setError] = useState<any>(null);

    // const getUserCourses = () => {
    //     const user = getUser();

    //     if (!user) {
    //         setError("User not found");
    //         setLoading(false);
    //         return;
    //     }

    //     setLoading(true);
    //     const savedData = localStorage.getItem("apiData");
    //     if (savedData) {
    //         setData(JSON.parse(savedData));
    //     }

    //     GeneralCoreService("enrollment/courses")
    //         .GetAll(null, user.id)
    //         .then((res) => {
    //             if (res?.data) {
    //                 setData(res.data);
    //                 localStorage.setItem("apiData", JSON.stringify(res.data));
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("API error:", err);
    //             if (!data.length && savedData) {
    //                 setData(JSON.parse(savedData));
    //             } else {
    //                 setError("Failed to fetch courses");
    //             }
    //         })
    //         .finally(() => setLoading(false));

    // }
    // useEffect(() => {
    //     getUserCourses();
    // }, []);


    return (
        <ApiContext.Provider
            value={{ data, error,setData}}
        >
            {children}
        </ApiContext.Provider>
    );
};

// custom hook (BEST PRACTICE)
export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used inside ApiProvider");
    }
    return context;
};
