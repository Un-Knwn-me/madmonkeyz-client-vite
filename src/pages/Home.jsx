import React from 'react'
import Base from '../components/Base'
import { Button, Carousel, Typography } from '@material-tailwind/react'

const Home = () => {
  return (
    <Base title={'Home'}>
        <div className="relative mb-40">
            <Carousel transition={{ duration: 1 }} prevArrow={false} style={{ height: "80vh" }} autoplayDelay={5000} nextArrow={false} navigation={false} autoplay={true} loop={true}>
            <div className="relative h-full w-full">
                <img
                src="https://images.pexels.com/photos/838413/pexels-photo-838413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="image 1"
                className="h-full w-full object-cover"
                />
                {/* <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                    The Beauty of Nature
                    </Typography>
                    <Typography
                    variant="lead"
                    color="white"
                    className="mb-12 opacity-80"
                    >
                    It is not so much for its beauty that the forest makes a claim
                    upon men&apos;s hearts, as for that subtle something, that quality
                    of air that emanation from old trees, that so wonderfully changes
                    and renews a weary spirit.
                    </Typography>
                    <div className="flex justify-center gap-2">
                    <Button size="lg" color="white">
                        Explore
                    </Button>
                    <Button size="lg" color="white" variant="text">
                        Gallery
                    </Button>
                    </div>
                </div>
                </div> */}
            </div>
            <div className="relative h-full w-full">
                <img
                src="https://images.pexels.com/photos/655806/pexels-photo-655806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="image 2"
                className="h-full w-full object-cover"
                />
            </div>

            </Carousel>
            <div className="absolute mx-10 md:mx-40 -bottom-10 left-0 right-0 text-center bg-teal-100 border-t border-cyan-400">
                <div className="w-1/2 mx-auto py-2 md:py-8">
                    <p className="text-lg">Hand Picked Products <span className='text-amber-500'> Only </span> For You</p>
                </div>
            </div>
        </div>

        <div className='mb-5'>knsudjs</div>
    </Base>
  )
}

export default Home