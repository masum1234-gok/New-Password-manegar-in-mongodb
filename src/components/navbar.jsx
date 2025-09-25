import React from 'react'

function navbar() {
  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 h-14'>
      <div className='logo font-bold'>
        <a className='hover:font-bold text-2xl select-none' href="/">
        <span className='text-green-500 '>&lt;</span>
      Pass
      <span className='text-green-500 '>OP&gt;</span>
      </a></div>
      <ul>
        <li className='select-none flex gap-4'>
        <a className='hover:font-bold ' href="/">Home</a>
        <a className='hover:font-bold' href="#">About</a>
        <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default navbar
