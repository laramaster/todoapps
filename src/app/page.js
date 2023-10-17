import Image from 'next/image'
import { UilPlus } from '@iconscout/react-unicons'

export default function Home() {
  return (
    <>
      <div className=' w-2/5 mx-auto h-full'>
        <div className='w-full flex items-center justify-center'>
          <div className='bg-gradient-to-r w-full h-full my-28 p-[1px] from-[#8B5CF6] to-[#7ef3e5f7] rounded-2xl'>
            <div className="bg-white rounded-2xl px-12 py-8">
              <div className='text-center mb-5'>
                <h2 className='font-medium text-slate-600 text-2xl'>Todo Lists App</h2>
              </div>
              <div className=''>
                <div className='flex items-center justify-center space-x-3'>
                  <input type="text" className='w-full border-b input-focus-none border-slate-100 py-1.5 placeholder:text-sm placeholder:text-slate-300 text-base' placeholder='Enter Your Task here...' />
                  <button className='bg-gradient px-5 py-2.5 rounded-lg text-sm text-white flex items-center space-x-1'><UilPlus size={18} className='inline-block'/> <span>Add</span></button>
                </div>
                <div className='mt-5'>
                  <div>
                    <div class="flex items-center mb-4">
                      <input type="checkbox" class="w-5 h-5 text-gradient bg-gray-100 border-slate-100 rounded focus:ring-gradient focus:bg-gradient focus:ring-2" />
                      <label for="default-checkbox" class="ml-2 text-base text-slate-500">Default checkbox</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
