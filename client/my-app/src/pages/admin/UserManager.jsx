import React, { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../../apis/userApi'
import moment from 'moment'
import { useDebounce } from '@uidotdev/usehooks'
import Paginate from '../../components/Pagination/Paginate'

function UserManager() {
  const [data, setData] = useState({})
  const [key, setKey] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)

  const fetchUsers = async (params) => {
    const response = await getUsers(params)
    if (response.success) {
      setData(response)
    }
  }

  const handlePageChange = useCallback((e) => {
    setPage(e)
  }, [])

  const keyDebounce = useDebounce(key, 500)

  useEffect(() => {
    let params = {}
    params.page = page
    params.limit = limit
    if (!keyDebounce.startsWith(' ') && keyDebounce.length !== 0) {
      params.q = keyDebounce
    }
    fetchUsers(params)
  }, [keyDebounce, page])

  return (
    <div>
      <span className="font-medium">User Manager</span>
      <div className="flex justify-end">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          type="text"
          placeholder="Search..."
          className="border outline-none py-2 px-4 w-[350px]"
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th scope="col" className="py-4 px-6">
                #
              </th>
              <th scope="col" className="py-4 px-6">
                Email Address
              </th>
              <th scope="col" className="py-4 px-6">
                Fullname
              </th>
              <th scope="col" className="py-4 px-6">
                Role
              </th>
              <th scope="col" className="py-4 px-6">
                Phone
              </th>
              <th scope="col" className="py-4 px-6">
                Status
              </th>
              <th scope="col" className="py-4 px-6">
                Created At
              </th>
              <th scope="col" className="py-4 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.users &&
              data?.users?.map((el, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{el.email}</td>
                  <td className="px-6 py-4">{`${el.first_name} ${el.last_name}`}</td>
                  <td className="px-6 py-4">{el.role}</td>
                  <td className="px-6 py-4">{el.mobile}</td>
                  <td className="px-6 py-4">
                    {el.isBlocked ? 'Blocked' : 'Active'}
                  </td>
                  <td className="px-6 py-4">
                    {moment(el.createdAt).format('DD-MM-YYYY')}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <span className="cursor-pointer hover:underline">Edit</span>
                    <span className="cursor-pointer hover:underline">
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!data && data?.users.length === 0 && (
        <p className="text-center py-4">No data found...</p>
      )}
      <div className='mt-[20px] flex justify-start'>
        {/* <Paginate
          page={page}
          total={data?.total}
          limit={limit}
          PageChange={handlePageChange}
        /> */}
      </div>
    </div>
  )
}

export default UserManager
