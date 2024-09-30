import React, { useEffect, useState } from "react";
import { ProjectDataTable } from "../DataTable/ProjectDataTable";
import DefaultLayout from "../Layouts/DefaultLayout";
import { fetchAllData } from "@/services/fetchData";
import { Project } from "@/interfaces/Project";

export const Projects : React.FC= () => {
    const [ProjectData, setProjectData] = useState<Project[]>([]);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchAllData('projects');
                setProjectData(data);
                setLoading(false);
                console.log(ProjectData)
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        }

        loadProjects();
    }, [])
    return(
        <>
        <DefaultLayout>
            <ProjectDataTable data={ProjectData} table_name="projects"/>
        </DefaultLayout>
        </>
    )
}