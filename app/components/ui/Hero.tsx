// 'use client'
// import React, { useEffect, useState } from "react";
// import XButton from "../XButton";
// import { useRouter } from "next/navigation";

// function Hero() {
//   const [user, setUser] = useState('')
//   const [userrole, setUserRole] = useState('')
//   const [isLogged, setIsLogged] = useState(true)

//   useEffect(() => {
//     try {
//       const userInfo = localStorage.getItem('userInfo');
//       const token = localStorage.getItem('token');

//       if (token && userInfo) {
//         const user = JSON.parse(userInfo);
//         setUser(user?.name || '');
//         setUserRole(user?.role || '');
//         setIsLogged(true);
//       } else {
//         setIsLogged(false);
//       }
//     } catch (error) {
//       console.error('Invalid localStorage data', error);
//       setIsLogged(false);
//     }
//   }, []);
//   return (
//     <>

//         <section
//           className="relative h-125 w-full bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/hero.jpg')",
//           }}
//         >
//           {/* Dark overlay (ONLY affects image) */}
//           <div className="absolute inset-0 bg-black/60" />

//           {/* Centered content */}
//           <div className="relative z-10 flex h-full items-center justify-center text-center">
//             <div className="max-w-3xl px-6 text-white flex flex-col items-center">
//               <h1 className="text-4xl md:text-6xl font-bold leading-tight">

//                 <span className="block text-secondary"> Welcome to Chrissy Medical Academy</span>
//               </h1>

//               {/* <p className="mt-4 text-lg md:text-xl text-gray-200">
//             Premium artificial jewellery for everyday & bridal luxury.
//           </p> */}

//               <div className="mt-4">
//                 <XButton label='Enroll Now' />
//               </div>
//             </div>
//           </div>
//         </section>



//     </>
//   );
// }

// export default Hero;



'use client'
import { Carousel } from "antd";
import XButton from "../XButton";
import { useEffect, useState } from "react";
const Hero = () => {

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
                  <XButton label='Enroll Now' classname={'md:text-xl'} />
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
