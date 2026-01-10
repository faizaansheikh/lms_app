import Courses from '@/app/components/ui/Courses';
import ProductCard from '@/app/components/ui/ProductCard';
import { Col, Input, Row } from 'antd'
import { CiSearch } from "react-icons/ci";

function page() {
  const arr = [
    {
      img: '',
      title: 'Online 2 Hour Med Tech Class Renewal',
      desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
      author: 'Brandum Marcom',
      price: '$60',
    },
    {
      img: '',
      title: 'Online 2 Hour Med Tech Class Renewal',
      desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
      author: 'Brandum Marcom',
      price: '$60',
    },
    {
      img: '',
      title: 'Online 2 Hour Med Tech Class Renewal',
      desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
      author: 'Brandum Marcom',
      price: '$60',
    },
    {
      img: '',
      title: 'Online 2 Hour Med Tech Class Renewal',
      desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
      author: 'Brandum Marcom',
      price: '$60',
    },
    {
      img: '',
      title: 'Online 2 Hour Med Tech Class Renewal',
      desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
      author: 'Brandum Marcom',
      price: '$60',
    }
  ]
  return (
    <div className='bg-blude-400 w-full  mt-6'>
      <div className='w-full mt-4 px-8 lg:px-32'>
        <p className='text-2xl font-medium mb-2'>Browse Products</p>
        <Input size="large" placeholder="Search Product names" prefix={<CiSearch />} />
      </div>
      <Courses allProd={true} />
      {/* <Row justify="center" gutter="2rem" className='my-5'>
        {
          arr.map((x, i) => (
            <Col className="gutter-row my-4" xs={24} md={12} lg={8} key={i}>
              <ProductCard product={x} />
            </Col>
          ))
        }
      </Row> */}
    </div>
  )
}

export default page