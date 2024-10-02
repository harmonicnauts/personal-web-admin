import React, { useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Stack } from "@/interfaces/Stack";
import { fetchAllData } from "@/services/dataOperations";
import { StackDataTable } from "../DataTable/StackDataTable";

export const Stacks : React.FC= () => {
    const [StackData, setStackData] = useState<Stack[]>([]);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStacks = async () => {
            try {
                const data = await fetchAllData('stacks');
                setStackData(data);
                setLoading(false);
                console.log(StackData)
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        }

        loadStacks();
    }, [])

    return(
        <>
        <DefaultLayout>
            <StackDataTable table_name="stacks" data={StackData}/>
        </DefaultLayout>
        </>
    )
}