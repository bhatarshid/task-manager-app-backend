import React, { useState } from 'react'
import Modal from "react-modal";
import { X } from 'lucide-react'
import { createTask, getTasks } from '../features/task/taskSlice';

const AddTaskModal = ({ modalIsOpen, setModalIsOpen, dispatch }) => {
  const priorities = [
    { label: 'Low', value: 'low', color: 'bg-green-900' },
    { label: 'Medium', value: 'medium', color: 'bg-yellow-900' },
    { label: 'High', value: 'high', color: 'bg-red-900' }
  ]

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: ''
  })
  const [priority, setPriority] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleForm = async () => {
    formData.priority = priority
    await dispatch(createTask(formData))
      .unwrap()
      .then(() => {
        setModalIsOpen(false)
        dispatch(getTasks())
      })
      .catch(() => {
        setFormData({
          title: '',
          description: '',
          priority: ''
        })
        setPriority('')
      })
  }

  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="bg-[#18181B] w-4/5 sm:w-1/2 flex flex-col justify-center m-auto rounded-2xl border-[1px]"
          overlayClassName="fixed inset-0 flex bg-white/20"
        >
          <div className='flex flex-row items-center justify-between w-full px-10 pt-3 pb-2'>
            <h2 className='font-bold'>Add New Task</h2>
            <button
              onClick={() => setModalIsOpen(false)}
              className='p-2 hover:bg-zinc-600 cursor-pointer rounded-xl'
            >
              <X />
            </button>
          </div>
          <hr className='pt-3 mx-9'/>
          <div className='pb-3 px-10 w-full items-center'>
            <form onSubmit={(e) => { e.preventDefault(); handleForm(); }}>
              <p className='mt-2 mb-0.5'>Title</p>
              <input
                type='text'
                name='title'
                placeholder='Enter task title'
                value={formData.title}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full bg-black'
              />
              <p className='mt-2 mb-0.5'>Description</p>
              <textarea
                name='description'
                placeholder='Enter task description'
                value={formData.description}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full h-26 bg-black resize-none'
              />
              <p className='mt-2 mb-0.5'>Priority</p>
              <div className='items-center grid sm:grid-cols-3 gap-4'>
                {priorities.map(({ label, value, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPriority(value)}
                    className={`${color} sm:px-8 py-1 rounded-md cursor-pointer hover:px-6 ${priority === value ? 'border-2' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button type='submit' className='w-full bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-md my-4 cursor-pointer'>Add Task</button>
            </form>
          </div>
        </Modal>
    </div>
  )
}

export default AddTaskModal