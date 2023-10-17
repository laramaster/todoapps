"use client"

import Image from 'next/image'
import { UilPlus, UilTrashAlt, UilCopy } from '@iconscout/react-unicons'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {

  const [inputData, setInputData] = useState('');
  const [ListItems, setListItems] = useState([]);
  const [nextId, setNextId] = useState(1); // Initialize with 1

  useEffect(() => {
    // Retrieve the stored ListItems and nextId from localStorage when the component mounts.
    const storedListItems = JSON.parse(localStorage.getItem('todoListItems'));
    const storedNextId = Number(localStorage.getItem('nextId'));
    if (storedListItems) {
      setListItems(storedListItems);
    }
    if (storedNextId) {
      setNextId(storedNextId);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!inputData) return;

    const newItem = {
      id: nextId,
      text: inputData,
      is_mark: false,
    };

    // Add the new item at the beginning of the list
    const updatedListItems = [newItem, ...ListItems];

    setListItems(updatedListItems);
    setNextId(nextId + 1);
    localStorage.setItem('todoListItems', JSON.stringify(updatedListItems));
    localStorage.setItem('nextId', nextId + 1);
    setInputData('');
    toast.success('Added Successfully.')
  }

  const handleCheckboxChange = (itemId) => {
    const updatedListItems = ListItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, is_mark: !item.is_mark };
      }
      return item;
    });

    setListItems(updatedListItems);
    localStorage.setItem('todoListItems', JSON.stringify(updatedListItems));
  }

  const handleCopyTodos = () => {
    const todosText = ListItems
      .map((item) => `- [${item.is_done ? 'x' : ' '}] ${item.text}`)
      .join('\n');
    const markdownText = `# Todo Lists Items\n${todosText}`;
    navigator.clipboard.writeText(markdownText).then(() => {
      toast.success('Content Copy To Clipboard.');
    });
  }

  const handleDelete = (itemId) => {
    const updatedListItems = ListItems.filter((item) => item.id !== itemId);
    setListItems(updatedListItems);
    localStorage.setItem('todoListItems', JSON.stringify(updatedListItems));
    toast.success('Delete Successfully.')
  }

  return (
    <>
      <div className=' w-2/5 2xl:w-2/5 xl:w-1/2 lg:w-3/5 md:w-4/5 sm:w-11/12 xs:w-97p mx-auto h-full'>
        <div className='w-full flex items-center justify-center'>
          <div className='bg-gradient-to-r w-full h-full my-28 p-[1px] from-[#8B5CF6] to-[#7ef3e5f7] rounded-2xl'>
            <div className="bg-white rounded-2xl px-12 sm:px-12 xs:px-5 py-8">
              <div className='text-center mb-7'>
                <h2 className='font-medium text-slate-600 text-2xl'>Todo Lists Items</h2>
              </div>
              <div className=''>
                <form onSubmit={handleSubmit}>
                  <div className='flex items-center justify-center space-x-3'>
                    <input type="text" onChange={(e) => setInputData(e.target.value)} value={inputData} className='w-full border-b input-focus-none border-slate-100 py-1.5 placeholder:text-sm placeholder:text-slate-300 text-base' placeholder='Enter Your Task here...' required />
                    <button type='submit' className='bg-gradient px-5 py-2.5 rounded-lg text-sm text-white flex items-center space-x-1'><UilPlus size={18} className='inline-block'/> <span>Add</span></button>
                    <div className='bg-gradient-to-r p-[1px] from-[#8B5CF6] to-[#7ef3e5f7] rounded-lg'>
                      <button onClick={handleCopyTodos} type='button' className=' bg-white text-base px-3.5 py-2 rounded-lg'><UilCopy className='inline-block text-slate-500' size={20} /></button>
                    </div>
                  </div>
                </form>
                <div className='mt-5'>
                  {ListItems.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between mb-3 custom-checkbox border-b last:border-none last:p-0  border-slate-50 pb-3`}>
                      <div>
                        <input
                          id={`checkbox-${item.id}`}
                          type="checkbox"
                          checked={item.is_mark}
                          className="w-5 h-5"
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <label htmlFor={`checkbox-${item.id}`} className={`text-base text-slate-700 cursor-pointer`}>
                          <span className={`${item.is_mark ? 'line-through text-slate-300' : ''}`}>{item.text}</span>
                        </label>
                      </div>
                      <button onClick={() => handleDelete(item.id)}>
                        <UilTrashAlt className='bg-red-50 border border-red-300 text-red-500 p-1.5 rounded-md' size={30} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
    </>
  )
}
