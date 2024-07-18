import React from 'react';
import Profile from '../../public/profile.png'
const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  const educationData = [
    { year: '2022-Present', school: 'SMK Negeri 4 Bandung', degree: 'Rekayasa Perangkat Lunak' },
    { year: '2018-2022', school: 'SMP Negeri 3 Bandung', degree: '' },
    { year: '2012-2018', school: 'SD Negeri 033 Asmi Bandung', degree: '' },
  ];
  const experienceData = [
    { year: '2024-Present', company: 'PT. Curaweda Palagan Simbiotech', description: 'PKL' },
    { year: '2023-2024', company: 'PT. Curaweda Palagan Simbiotech', description: 'Teaching Factory (TEFA)' },
  ];
  return (
    <div className="bg-gray-800 text-white p-12 px-8 sm:px-6 lg:px-8 min-h-screen">
      <section id='about' className='max-w-4xl mx-auto'>
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">ABOUT ME</h1>
        <div className="flex flex-col lg:flex-row gap-1 mb-12">
          <div className="w-full lg:w-1/3">
            <img src={Profile} alt="Profile" className="w-48 sm:w-64 mx-auto lg:mx-0 bg-gray-700 rounded-lg border-t-2 border-teal-700" />
          </div>
          <div className="w-full lg:w-2/3">
            <p className="mb-2">
              Hello, my name is<br />
              <span className="text-xl sm:text-2xl font-semibold">Rayndra Sulaiman Fattaahillah.</span>
            </p>
            <p className="mb-6">I'm really into front-end development and UI/UX design. It's like I have this knack for spotting what looks better and more eye-catching in any design I see</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">EDUCATION</h2>
                <div className="bg-gray-900 p-4 rounded-lg border-t-2 border-teal-700 overflow-y-auto max-h-64">
                  {educationData.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="font-bold text-teal-700">{edu.year}</p>
                      <p>{edu.school}</p>
                      <p className="text-sm text-gray-400">{edu.degree}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">EXPERIENCE</h2>
                <div className="bg-gray-900 p-4 rounded-lg border-t-2 border-teal-700 overflow-y-auto max-h-64">
                  {experienceData.map((exp, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="font-bold text-teal-700">{exp.year}</p>
                      <p>{exp.company}</p>
                      <p className="text-sm text-gray-400">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
export default About;