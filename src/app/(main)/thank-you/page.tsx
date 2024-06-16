import SvgComponent from '@/app/components/Svg'
import Link from 'next/link'

const page = () => {
  return (
    <section className='min-h-dvh grid'>
      <div className='max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden grid m-auto'>
        <div className='max-w-md mx-auto pt-12 pb-14 px-5 text-center'>
          <div className='inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full'>
            <SvgComponent.MainCard />
          </div>
          <h2 className='text-xl text-gray-100 font-semibold mb-5'>¡GRACIAS!</h2>
          <p className='text-gray-300 font-medium'>Tu donacion ha sido recibida exitosamente</p>
        </div>
        <div className='pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2'>
          <Link
            href='/'
            className=' w-full sm:w-auto py-3 px-5  text-center font-semibold leading-6 block text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200'
          >
            Volver
          </Link>
        </div>
      </div>
    </section>
  )
}

export default page
