import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

interface HomeProps {
  scrollToAbout: () => void;
}

const Home: React.FC<HomeProps> = ({ scrollToAbout }) => {
  const [roleText] = useTypewriter({
    words: ['Front End', 'UI/UX'],
    loop: 0,
    typeSpeed: 50,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  const [jobText] = useTypewriter({
    words: ['Developer', 'Designer'],
    loop: 0,
    typeSpeed: 50,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <div className="bg-gray-900 flex flex-row text-white min-h-screen">
      <section id="home" className="container flex mx-auto min-h-screen">
        <div className="container mx-auto flex flex-col items-center sm:items-start justify-center px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tracking-widest text-4xl sm:text-6xl lg:text-8xl -ml-1 text-center sm:text-left"
          >
            HELLO!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold italic ml-1 -mb-"
          >
            I'm
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center sm:items-start"
          >
            <p className="text-4xl sm:text-5xl lg:text-6xl">Rayndra</p>
            <div className="flex flex-col ml-0 sm:ml-4 mt-2 sm:mt-3">
              <p className="tracking-widest text-xl sm:text-2xl lg:text-3xl -mt-3">
                {roleText}
                <Cursor cursorStyle='' />
              </p>
              <p className="tracking-widest text-xl sm:text-2xl lg:text-3xl -mt-3">
                {jobText}
                <Cursor cursorStyle='_' />
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-teal-700 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
              onClick={scrollToAbout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
