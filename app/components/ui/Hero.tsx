



'use client'
import { Carousel } from "antd";
import XButton from "../XButton";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter()
  const images = [
    {
      img: '/home2.jpg',
      // title: 'Scientific Solutions'
    },
    {
      img: '/home3.jpg',
      // title: 'Scientific Solutions'
    },



  ];

  return (

    <div>

      {/* autoplay */}
      <Carousel autoplaySpeed={2000} effect="scrollx" dots draggable arrows   >
        {
          images.map((x, i) => (
            <div key={i} className="w-full h-[60vh] md:h-[90vh]  relative mt-8" >
              {/* Background image */}

              <img
                src={x.img}
                alt="Banner"
                className="w-full h-full object-contain md:object-cover  transition-opacity duration-1000 ease-in-out"
                data-aos='flip-up'
              />

              {/* Optional overlay for darkening the image */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

              {/* Content over the image */}
              <div className="absolute top-0 left-0  w-full h-full flex flex-col justify-center items-center text-white px-4 z-20" data-aos='fade-right'>

                <div className="md:mx-32">
                  <h1 className=" text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-wrap min-h-[60px] text-center md:mt-8">

                    Welcome to Chrissy Medical Academy
                  </h1>
                </div>
                <div className="md:mt-4">
                  <XButton label='Enroll Now' classname={'md:text-xl'} Click={()=>router.push('/auth/signup')}/>
                </div>
              </div>
            </div>
          ))
        }
      </Carousel >
    </div >

  );
};

export default Hero;
