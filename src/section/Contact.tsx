import React, { useState } from 'react';
import Alert from '../assets/component/Alert';

type AlertType = 'success' | 'error';

interface AlertState {
  show: boolean;
  message: string;
  type: AlertType;
}

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState<AlertState>({ show: false, message: '', type: 'success' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { email, message });
    setEmail('');
    setMessage('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setAlert({ show: true, message: 'Nomor telepon berhasil disalin!', type: 'success' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    }, (err) => {
      console.error('Gagal menyalin teks: ', err);
      setAlert({ show: true, message: 'Gagal menyalin nomor telepon.', type: 'error' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    });
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-20 px-4 sm:px-6 lg:px-8">
      <section id="contact" className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold sm:text-2xl mb-4">Contact Information</h2>
            <div className="space-y-4 mb-10">
              <a href="mailto:rayndrafattaahillah@gmail.com" className="flex items-center space-x-2 hover:text-teal-700">
                <i className="ph-envelope-simple text-2xl sm:text-3xl"></i>
                <p>rayndrafattaahillah@gmail.com</p>
              </a>
              <div 
                onClick={() => copyToClipboard('+62895701266701')} 
                className="flex items-center space-x-2 hover:text-teal-700 cursor-pointer"
              >
                <i className="ph-phone text-2xl sm:text-3xl"></i>
                <p>+62 895-7012-66701</p>
              </div>
              <a href="https://maps.app.goo.gl/76JANFwocB6ht8MKA" className="flex items-center space-x-2 hover:text-teal-700">
                <i className="ph-map-pin text-2xl sm:text-3xl"></i>
                <p>Gg. Ijan Dalam No.8</p>
              </a>
            </div>
            <h2 className="text-xl font-semibold sm:text-2xl mb-4">Connect With Me</h2>
            <div className="space-y-4">
              <a href="https://x.com/rushxland" className="flex items-center space-x-2 hover:text-teal-700">
                <i className="ph-twitter-logo text-2xl sm:text-3xl"></i>
                <p>@rushxland</p>
              </a>
              <a href="https://www.instagram.com/rayndftahllh/" className="flex items-center space-x-2 hover:text-teal-700">
                <i className="ph-instagram-logo text-2xl sm:text-3xl"></i>
                <p>@raynftahllh</p>
              </a>
              <a href="https://www.linkedin.com/in/rayndra-fattaahillah-0279292b0/" className="flex items-center space-x-2 hover:text-teal-700">
                <i className="ph-linkedin-logo text-2xl sm:text-3xl"></i>
                <p>Rayndra Fattaahillah</p>
              </a>
              <a href="https://github.com/raypunzle" className="flex items-center space-x-2 hover:text-teal-700">
                <i className="ph-github-logo text-2xl sm:text-3xl"></i>
                <p>raypunzle</p>
              </a>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold sm:text-2xl mb-4">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input placeholder='Name'
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border-t-2 border-teal-700 bg-gray-700 rounded"/>
              </div>
              <div>
                <input placeholder='Email'
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border-t-2 border-teal-700 bg-gray-700 rounded"/>
              </div>
              <div>
                <textarea placeholder='Message'
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-2 border-t-2 border-teal-700 bg-gray-700 rounded h-32"></textarea>
              </div>
              <button type="submit" className="bg-teal-700 text-white py-2 px-4 rounded hover:bg-gray-900">Send Message</button>
            </form>
          </div>
        </div>
      </section>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Rayndra Fattaahillah. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Contact;
