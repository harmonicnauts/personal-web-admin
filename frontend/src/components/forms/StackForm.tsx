import React, { useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import SelectGroup from "./SelectGroup";
import { fetchSingleRecord } from "@/services/dataOperations";
import { useNavigate, useParams } from "react-router-dom";

interface StackFormProp {
  method: string;
}

export const StackForm: React.FC<StackFormProp> = ({ method }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = method === "update";
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const apiUrl = isUpdate
    ? `http://localhost:3000/api/stack/${id}`
    : "http://localhost:3000/api/stack/";
    const payload = Object.fromEntries(
      Object.entries(stackData).filter(([key, value]) => value)
    );
    try {
      const response = await fetch(apiUrl, {
        method: isUpdate ? 'PATCH' : 'POST',
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert(isUpdate ? "Stack updated successfully" : "Stack added successfully");
        navigate("/stacks");
      } else {
        alert(`Failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the request.");
    } finally {
      setIsLoading(false);
    }

  }

  const [stackData, setStackData] = useState({
    name: "",
    logo: "",
    href: "",
    hoverColor: "",
    category: "",
  });

  const handleCategoryChange = (value: string) => {
    setStackData({
      ...stackData,
      category: value,
    });
  };

  useEffect(() => {
    if (isUpdate && id) {
      fetchSingleRecord(Number(id), "stack").then((data) => {
        if (data) {
          setStackData(data);
          console.log(data)
        }
      });
    }
  }, [id, isUpdate]);

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Stack {method} form
          </h3>
        </div>
        <form 
          onSubmit={handleSubmit}
        >
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Stack Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the stack name"
                value={stackData.name}
                onChange={(e) =>
                  setStackData({ ...stackData, name: e.target.value })
                }
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Href
              </label>
              <input
                type="text"
                placeholder="Where would you want the element to redirect?"
                value={stackData.href}
                onChange={(e) =>
                  setStackData({ ...stackData, href: e.target.value })
                }
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                HoverColor
              </label>
              <input
                type="text"
                placeholder="The color of the element when you hover over it"
                value={stackData.hoverColor}
                onChange={(e) =>
                  setStackData({ ...stackData, hoverColor: e.target.value })
                }
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Category
              </label>
              <SelectGroup table_name="stack" onChange={handleCategoryChange}/>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Logo
              </label>
              <input
                type="file"
                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
              />
              {!stackData.logo ? <img src={stackData.logo}/> : ''}
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              {isUpdate ? 'Update':'Add'}
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
